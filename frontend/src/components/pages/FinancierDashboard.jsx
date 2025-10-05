 
import React, { useState, useMemo } from "react";

const FinancierDashboard = ({
  currentUser,
  users,
  messages,
  setMessages,
  setError,
  replyToUser,
}) => {
  const [activeThreadUserId, setActiveThreadUserId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Filter messages sent *to* this Financier (f1 or f2 etc.) that are unread
  const unreadMessages = messages.filter(
    (msg) =>
      msg.receiverId === currentUser.id &&
      !msg.isRead &&
      msg.senderRole === "user"
  );

  // Group unread messages by the user who sent them
  const userThreads = useMemo(() => {
    return Array.from(new Set(unreadMessages.map((msg) => msg.senderId)))
      .map((userId) => {
        const user = users.find((u) => u.id === userId);
        const unreadCount = unreadMessages.filter(
          (msg) => msg.senderId === userId
        ).length;
        const lastMsg = unreadMessages
          .filter((msg) => msg.senderId === userId)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
        return {
          userId,
          username: user?.username || "Unknown User",
          lastMsgText: lastMsg?.text || "",
          unreadCount,
        };
      })
      .sort((a, b) => b.unreadCount - a.unreadCount);
  }, [unreadMessages, users]);

  // Active thread logic: all messages involving the selected user and the current financier
  const activeThreadMessages = messages
    .filter(
      (msg) =>
        (msg.senderId === activeThreadUserId &&
          msg.receiverId === currentUser.id) ||
        (msg.receiverId === activeThreadUserId &&
          msg.senderId === currentUser.id)
    )
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const handleReply = (e) => {
    e.preventDefault();
    if (replyText.trim() && activeThreadUserId) {
      replyToUser(activeThreadUserId, replyText);
      setReplyText("");
      // Mark thread as read after replying
      setMessages((prev) =>
        prev.map((msg) =>
          msg.senderId === activeThreadUserId &&
          msg.receiverId === currentUser.id &&
          !msg.isRead
            ? { ...msg, isRead: true }
            : msg
        )
      );
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">
        Financier Dashboard: User Chat
      </h2>

      {/* Chat Management */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-blue-500">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          User Message Threads ({userThreads.length} Unread)
        </h3>
        <div className="grid md:grid-cols-2 gap-6 h-96">
          {/* Threads List */}
          <div className="border p-4 rounded-lg overflow-y-auto">
            <p className="font-semibold text-sm mb-2">Active Threads:</p>
            {userThreads.map((thread) => (
              <button
                key={thread.userId}
                onClick={() => setActiveThreadUserId(thread.userId)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition duration-150 flex justify-between items-center ${
                  activeThreadUserId === thread.userId
                    ? "bg-blue-100 border-l-4 border-blue-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div>
                  <span className="font-bold">{thread.username}</span>
                  <p className="text-xs truncate text-gray-500">
                    Latest: {thread.lastMsgText}
                  </p>
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {thread.unreadCount}
                </span>
              </button>
            ))}
            {userThreads.length === 0 && (
              <p className="text-center text-gray-400 mt-10">
                No new messages targeted to you.
              </p>
            )}
          </div>

          {/* Reply Section */}
          <div className="border p-4 rounded-lg flex flex-col">
            {activeThreadUserId ? (
              <>
                <div className="flex-grow overflow-y-auto space-y-3 mb-4 p-2 bg-gray-50 rounded-lg">
                  {activeThreadMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-2 rounded-lg text-sm ${
                        msg.senderId === currentUser.id
                          ? "bg-blue-100 text-right"
                          : "bg-white border text-left"
                      }`}
                    >
                      <span className="font-bold mr-2 text-xs opacity-70">
                        {msg.senderId === currentUser.id
                          ? "You"
                          : users.find((u) => u.id === msg.senderId)
                              ?.username || "User"}
                        :
                      </span>
                      {msg.text}
                      <span className="text-xs ml-2 text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleReply} className="flex space-x-2 mt-auto">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${
                      users.find((u) => u.id === activeThreadUserId)?.username
                    }...`}
                    className="flex-grow p-2 border rounded-lg"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Send
                  </button>
                </form>
              </>
            ) : (
              <p className="text-center text-gray-400 mt-20">
                Select a thread to view and reply.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancierDashboard;