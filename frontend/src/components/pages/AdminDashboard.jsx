 
import React, { useState, useMemo } from "react";

const AdminDashboard = ({
  currentUser,
  schemes,
  setSchemes,
  users,
  messages,
  setMessages,
  setError,
  replyToUser,
}) => {
  const [schemeTitle, setSchemeTitle] = useState("");
  const [schemeDesc, setSchemeDesc] = useState("");
  const [schemeType, setSchemeType] = useState("new");
  const [activeThreadUserId, setActiveThreadUserId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleAddScheme = (e) => {
    e.preventDefault();
    if (!schemeTitle || !schemeDesc) {
      setError("Title and description are required.");
      return;
    }
    const newScheme = {
      id: schemes.length + 1,
      type: schemeType,
      title: schemeTitle,
      description: schemeDesc,
      details: "Admin added this new scheme details.",
      chartUrl: `https://placehold.co/400x300/34d399/ffffff?text=${schemeTitle.replace(
        /\s/g,
        "+"
      )}`,
    };
    setSchemes([...schemes, newScheme]);
    setSchemeTitle("");
    setSchemeDesc("");
    setError(`Scheme "${schemeTitle}" added successfully!`);
  };

  const handleDeleteScheme = (id) => {
    setSchemes(schemes.filter((s) => s.id !== id));
    setError("Scheme deleted.");
  };

  // Filter messages sent *to* this Admin that are unread
  const unreadMessages = messages.filter(
    (msg) => msg.receiverId === currentUser.id && !msg.isRead
  );

  // Group unread messages by the user who sent them
  const userThreads = Array.from(
    new Set(unreadMessages.map((msg) => msg.senderId))
  )
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
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold text-red-700 mb-4">Admin Dashboard</h2>

      {/* Message Management */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-red-500">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          User Message Management ({userThreads.length} Unread)
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
                    ? "bg-red-100 border-l-4 border-red-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div>
                  <span className="font-bold">{thread.username}</span>
                  <p className="text-xs truncate text-gray-500">
                    Latest: {thread.lastMsgText}
                  </p>
                </div>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {thread.unreadCount}
                </span>
              </button>
            ))}
            {userThreads.length === 0 && (
              <p className="text-center text-gray-400 mt-10">
                No new messages.
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
                        msg.senderRole === "admin"
                          ? "bg-red-100 text-right"
                          : "bg-white border text-left"
                      }`}
                    >
                      <span className="font-bold mr-2 text-xs opacity-70">
                        {msg.senderRole === "admin"
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
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
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

      {/* Scheme Management */}
      <div className="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-yellow-500">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Investment Scheme Manager
        </h3>

        <form
          onSubmit={handleAddScheme}
          className="p-4 border rounded-lg mb-8 bg-yellow-50 space-y-4"
        >
          <h4 className="font-semibold text-lg">Add New Scheme Card</h4>
          <input
            type="text"
            placeholder="Scheme Title"
            value={schemeTitle}
            onChange={(e) => setSchemeTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          />
          <textarea
            placeholder="Scheme Description (Max 20 words)"
            value={schemeDesc}
            onChange={(e) => setSchemeDesc(e.target.value)}
            className="w-full p-2 border rounded-lg h-20"
            required
          />
          <select
            value={schemeType}
            onChange={(e) => setSchemeType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="new">New Scheme</option>
            <option value="post">Post Scheme</option>
            <option value="lic">LIC Scheme</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
          >
            Add Scheme
          </button>
        </form>

        <h4 className="font-semibold text-lg mt-8">Existing Schemes</h4>
        <ul className="divide-y divide-gray-200">
          {schemes.map((scheme) => (
            <li
              key={scheme.id}
              className="flex justify-between items-center p-3 hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-700">
                {scheme.title}{" "}
                <span className="text-xs text-gray-400">({scheme.type})</span>
              </span>
              <button
                onClick={() => handleDeleteScheme(scheme.id)}
                className="text-red-500 hover:text-red-700 font-semibold text-sm p-1 rounded-full border border-red-500 hover:border-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;