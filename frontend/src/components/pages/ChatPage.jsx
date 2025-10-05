 
import React, { useState, useCallback, useEffect } from "react";

const ChatPage = ({
  currentUser,
  userMessages,
  sendMessage,
  users,
  setMessages,
  targetRole,
}) => {
  const [messageText, setMessageText] = useState("");
  const getSenderName = (id) =>
    users.find((u) => u.id === id)?.username || "System";

  // Filter conversation relevant to the current user and the target role (Admin/Financier)
  const conversation = userMessages
    .filter((msg) => {
      let targetId = users.find((u) => u.role === targetRole)?.id;

      // If target role is financier, we need to consider all financiers (f1, f2, etc.)
      // This is simplified for the user's view to include any message with a financier
      if (targetRole === "financier") {
        return msg.receiverId.startsWith("f") || msg.senderId.startsWith("f");
      }

      return msg.receiverId === targetId || msg.senderId === targetId;
    })
    .filter(
      (msg) =>
        msg.senderId === currentUser.id || msg.receiverId === currentUser.id
    );

  const handleSend = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(messageText, targetRole);
      setMessageText("");
    }
  };

  const markAsRead = useCallback(() => {
    // Mark all messages from the other party as read
    setMessages((prev) =>
      prev.map((msg) =>
        msg.senderRole === targetRole &&
        msg.receiverId === currentUser.id &&
        !msg.isRead
          ? { ...msg, isRead: true }
          : msg
      )
    );
  }, [currentUser, targetRole, setMessages]);

  useEffect(() => {
    // Mark messages as read when the chat is opened
    markAsRead();
  }, [markAsRead]);

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-indigo-700 p-4 border-b">
        Chat with {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)}
      </h2>

      {/* Message History */}
      <div className="flex-grow p-6 overflow-y-auto space-y-4">
        {conversation.length === 0 ? (
          <p className="text-center text-gray-500 italic mt-10">
            Start a new conversation!
          </p>
        ) : (
          conversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-4 rounded-xl shadow-md ${
                  msg.senderId === currentUser.id
                    ? "bg-indigo-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                <p className="text-xs font-semibold mb-1 opacity-75">
                  {getSenderName(msg.senderId)}
                </p>
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-50">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 border-t flex space-x-3">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={`Type your message to the ${targetRole}...`}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;