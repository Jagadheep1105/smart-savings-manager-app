 
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { USER_TYPES, BUDGET_CATEGORIES } from "../utils/constants";
import { api } from "../utils/api";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserHomePage from "./pages/UserHomePage";
import InvestmentPage from "./pages/InvestmentPage";
import ChatPage from "./pages/ChatPage";
import AdminDashboard from "./pages/AdminDashboard";
import FinancierDashboard from "./pages/FinancierDashboard";
import { generatePieChart } from "../utils/pieChart";

const App = () => {
  const [users, setUsers] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentPage, setCurrentPage] = useState("landing");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, schemesRes, messagesRes] = await Promise.all([
          api.users.getAll(),
          api.schemes.getAll(),
          api.messages.getAll(),
        ]);
        setUsers(usersRes.data);
        setSchemes(schemesRes.data);
        setMessages(messagesRes.data);
      } catch (err) {
        setError("Failed to load data from server.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter chat messages based on the current user
  const userMessages = useMemo(() => {
    if (!currentUser) return [];
    return messages
      .filter(
        (msg) =>
          msg.senderId === currentUser.id || msg.receiverId === currentUser.id
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [messages, currentUser]);

  // Check unread messages for admin/financier
  const unreadCount = useMemo(() => {
    if (!currentUser) return 0;
    return messages.filter(
      (msg) => msg.receiverId === currentUser.id && !msg.isRead
    ).length;
  }, [messages, currentUser]);

  // --- Authentication Logic (Login/Register) ---

  const handleLogin = async (username, password, role) => {
    try {
      const res = await api.users.login({ username, password, role });
      const user = res.data;
      setCurrentUser(user);
      setCurrentRole(user.role);
      setCurrentPage("home");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    }
  };

  const handleRegister = async (username, password, type, salary) => {
    try {
      const res = await api.users.register({
        username,
        password,
        type,
        salary,
      });
      const newUser = res.data;
      await loadUsers(); // Reload users to include new one
      setCurrentUser(newUser);
      setCurrentRole("user");
      setCurrentPage("home");
      setError("Registration successful! Welcome.");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed.");
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.users.getAll();
      setUsers(res.data);
    } catch (err) {
      setError("Failed to reload users.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    setCurrentPage("landing");
    setError("");
  };

  // --- Message/Chat Logic ---

  // This is used by the User role to send a message to a fixed role (admin/financier)
  const sendMessage = async (text, receiverRole) => {
    if (!currentUser) return;

    let receiverId;
    if (receiverRole === "admin") {
      receiverId = users.find((u) => u.role === "admin")?.id;
    } else if (receiverRole === "financier") {
      // Simple logic: send to the first available financier (f1)
      receiverId = users.find((u) => u.role === "financier")?.id;
    }

    if (!receiverId) {
      setError(
        `Could not find a valid ${receiverRole} to send the message to.`
      );
      return;
    }

    try {
      await api.messages.create({
        senderId: currentUser.id,
        receiverId,
        senderRole: currentUser.role,
        text,
      });
      await loadMessages(); // Reload messages
    } catch (err) {
      setError("Failed to send message.");
    }
  };

  // This is used by Admin/Financier to reply to a specific user (userId)
  const replyToUser = async (userId, text) => {
    if (!currentUser || currentUser.role === "user") return;

    try {
      await api.messages.create({
        senderId: currentUser.id,
        receiverId: userId,
        senderRole: currentUser.role,
        text,
      });
      await loadMessages(); // Reload messages
      setError(
        `Reply sent to user ${users.find((u) => u.id === userId)?.username}.`
      );
    } catch (err) {
      setError("Failed to send reply.");
    }
  };

  const loadMessages = async () => {
    try {
      const res = await api.messages.getAll();
      setMessages(res.data);
    } catch (err) {
      setError("Failed to reload messages.");
    }
  };

  // --- Budget Logic (User Home) ---

  const handleBudgetChange = async (category, value) => {
    if (!currentUser || currentUser.role !== "user") return;

    const newPercentage = Number(value);
    if (newPercentage < 0 || newPercentage > 100) return;

    const newBudget = { ...currentUser.budget, [category]: newPercentage };
    const totalAllocated = Object.values(newBudget).reduce(
      (sum, p) => sum + p,
      0
    );

    if (totalAllocated > 100) {
      setError("Total budget allocation cannot exceed 100%.");
      return;
    }

    try {
      const updatedUser = await api.users.update(currentUser.id, {
        budget: newBudget,
      });
      setCurrentUser(updatedUser.data);
      await loadUsers(); // Reload users
      setError("");
    } catch (err) {
      setError("Failed to update budget.");
    }
  };

  // --- Navigation Bar ---

  const renderNavbar = () => {
    const adminPage = currentRole === "admin" ? "admin-dashboard" : null;
    const financierPage =
      currentRole === "financier" ? "financier-dashboard" : null;

    const navItems = [
      { name: "Home", page: "home", role: ["user", "admin", "financier"] },
      {
        name: "Profile",
        page: "profile",
        role: ["user", "admin", "financier"],
      },
      {
        name: "Investment Schemes",
        page: "investments",
        role: ["user", "admin", "financier"],
      },
    ];

    if (currentRole === "user") {
      navItems.push(
        { name: "Chat with Admin", page: "chat-admin", role: ["user"] },
        { name: "Chat with Financier", page: "chat-financier", role: ["user"] }
      );
    }
    if (currentRole === "admin") {
      navItems.push({
        name: `Admin Dashboard`,
        page: adminPage,
        role: ["admin"],
        icon: true,
      });
    }
    if (currentRole === "financier") {
      navItems.push({
        name: `Financier Dashboard`,
        page: financierPage,
        role: ["financier"],
        icon: true,
      });
    }

    return (
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-extrabold text-indigo-600">
                SmartSavings
              </h1>
            </div>
            <div className="hidden md:flex md:space-x-4 items-center">
              {navItems
                .filter((item) => item.role.includes(currentRole))
                .map((item) => (
                  <button
                    key={item.page}
                    onClick={() => setCurrentPage(item.page)}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ${
                      currentPage === item.page
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                    {item.icon && unreadCount > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}

              <div className="ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  <span className="font-bold capitalize">
                    {currentUser.username}
                  </span>{" "}
                  ({currentRole})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  // --- Main Router (Conditional Rendering) ---

  const renderContent = () => {
    if (loading) return <div>Loading...</div>;

    // Unauthenticated Pages
    if (!currentUser) {
      switch (currentPage) {
        case "auth":
          return (
            <AuthPage
              handleLogin={handleLogin}
              handleRegister={handleRegister}
              setError={setError}
              setCurrentPage={setCurrentPage}
              error={error}
            />
          );
        case "contact":
          return <ContactPage setCurrentPage={setCurrentPage} />;
        case "landing":
        default:
          return <LandingPage setCurrentPage={setCurrentPage} />;
      }
    }

    // Authenticated Pages
    const commonProps = {
      currentUser,
      setUsers,
      setCurrentUser,
      users,
      setError,
      schemes,
      setSchemes,
      messages,
      setMessages,
      replyToUser,
      userMessages,
    };

    switch (currentPage) {
      case "home":
        if (currentRole === "user")
          return (
            <UserHomePage
              {...commonProps}
              handleBudgetChange={handleBudgetChange}
              error={error}
            />
          );
        if (currentRole === "admin") return <AdminDashboard {...commonProps} />;
        return <FinancierDashboard {...commonProps} />;
      case "profile":
        return <UserProfilePage {...commonProps} />;
      case "investments":
        return <InvestmentPage schemes={schemes} />;
      case "chat-admin":
        return (
          <ChatPage
            {...commonProps}
            sendMessage={sendMessage}
            targetRole="admin"
          />
        );
      case "chat-financier":
        return (
          <ChatPage
            {...commonProps}
            sendMessage={sendMessage}
            targetRole="financier"
          />
        );
      case "admin-dashboard":
        return currentRole === "admin" ? (
          <AdminDashboard {...commonProps} />
        ) : (
          <UserHomePage
            {...commonProps}
            handleBudgetChange={handleBudgetChange}
            error={error}
          />
        );
      case "financier-dashboard":
        // Use the updated dashboard for chat management
        return currentRole === "financier" ? (
          <FinancierDashboard {...commonProps} />
        ) : (
          <UserHomePage
            {...commonProps}
            handleBudgetChange={handleBudgetChange}
            error={error}
          />
        );
      default:
        // Default to home page for the authenticated user
        return currentRole === "user" ? (
          <UserHomePage
            {...commonProps}
            handleBudgetChange={handleBudgetChange}
            error={error}
          />
        ) : currentRole === "admin" ? (
          <AdminDashboard {...commonProps} />
        ) : (
          <FinancierDashboard {...commonProps} />
        );
    }
  };

  // Handle scheme additions/deletions (for admin)
  const handleAddScheme = async (schemeData) => {
    try {
      const res = await api.schemes.create(schemeData);
      setSchemes([...schemes, res.data]);
      setError(`Scheme "${schemeData.title}" added successfully!`);
    } catch (err) {
      setError("Failed to add scheme.");
    }
  };

  const handleDeleteScheme = async (id) => {
    try {
      await api.schemes.delete(id);
      setSchemes(schemes.filter((s) => s.id !== id));
      setError("Scheme deleted.");
    } catch (err) {
      setError("Failed to delete scheme.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body { font-family: 'Inter', sans-serif; }
          /* Custom range slider thumb styling for better aesthetics */
          input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: var(--webkit-slider-thumb-color, #4f46e5);
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0,0,0,0.5);
          }
          input[type=range]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: var(--webkit-slider-thumb-color, #4f46e5);
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0,0,0,0.5);
          }
        `}
      </style>
      {currentUser && renderNavbar()}
      <main className={currentUser ? "py-8 max-w-7xl mx-auto" : ""}>
        {error && (
          <div className="max-w-7xl mx-auto p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}
        {renderContent()}
      </main>
    </div>
  );
};

export default App;