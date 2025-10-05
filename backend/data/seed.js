const mongoose = require("mongoose");
const User = require("../models/User");
const Scheme = require("../models/Scheme");
const Message = require("../models/Message");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Seeding data...");

    // Clear existing data
    await User.deleteMany({});
    await Scheme.deleteMany({});
    await Message.deleteMany({});

    // Seed users
    const initialUsers = [
      {
        id: "u1",
        username: "john_doe",
        password: "user",
        role: "user",
        type: "family-man",
        salary: 6000,
        budget: { Food: 20, Education: 30, Miscellaneous: 20, Savings: 30 },
        profile: "Family man focusing on long-term wealth.",
        unreadMsgs: 0,
      },
      {
        id: "f1",
        username: "finan1",
        password: "fin1",
        role: "financier",
        unreadAdvice: 0,
        profile: "Senior Investment Advisor.",
      },
      {
        id: "f2",
        username: "finan2",
        password: "fin2",
        role: "financier",
        unreadAdvice: 0,
        profile: "Junior Wealth Planner.",
      },
      {
        id: "a1",
        username: "admin_root",
        password: "admin",
        role: "admin",
        unreadTickets: 0,
        profile: "System Administrator.",
      },
    ];
    await User.insertMany(initialUsers);

    // Seed schemes
    const initialSchemes = [
      {
        id: 1,
        type: "post",
        title: "Post Office NSC",
        description:
          "National Savings Certificate (NSC) with fixed 6.8% returns. Ideal for tax savings and low-risk stability.",
        details:
          "The NSC scheme offers guaranteed returns and capital protection. Minimum investment of $100.",
        chartUrl:
          "https://placehold.co/400x300/4f46e5/ffffff?text=NSC+Performance",
      },
      {
        id: 2,
        type: "lic",
        title: "LIC Jeevan Anand",
        description:
          "Traditional participating endowment plan offering a blend of protection and savings.",
        details:
          "This plan provides financial protection against death throughout the lifetime of the policyholder.",
        chartUrl: "https://placehold.co/400x300/10b981/ffffff?text=LIC+Growth",
      },
      {
        id: 3,
        type: "new",
        title: "Green Tech Growth Fund",
        description:
          "Invest in innovative renewable energy startups with high growth potential.",
        details:
          "A high-risk, high-reward fund focusing on sustainable future technologies.",
        chartUrl:
          "https://placehold.co/400x300/ef4444/ffffff?text=Green+Tech+Fund",
      },
    ];
    await Scheme.insertMany(initialSchemes);

    // Seed messages
    const initialMessages = [
      {
        id: 1,
        senderId: "u1",
        receiverId: "a1",
        senderRole: "user",
        text: "I need help understanding tax implications for new schemes.",
        timestamp: new Date(Date.now() - 60000),
        isRead: false,
      },
      {
        id: 2,
        senderId: "f1",
        receiverId: "u1",
        senderRole: "financier",
        text: "Hello John, welcome to the platform!",
        timestamp: new Date(Date.now() - 50000),
        isRead: true,
      },
      {
        id: 3,
        senderId: "u1",
        receiverId: "f1",
        senderRole: "user",
        text: "I have a question about my budget.",
        timestamp: new Date(Date.now() - 40000),
        isRead: false,
      },
      {
        id: 4,
        senderId: "u1",
        receiverId: "f2",
        senderRole: "user",
        text: "How do I start investing?",
        timestamp: new Date(Date.now() - 30000),
        isRead: false,
      },
    ];
    await Message.insertMany(initialMessages);

    console.log("Data seeded successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    process.exit(1);
  });



