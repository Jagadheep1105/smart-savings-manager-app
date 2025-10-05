 
const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (find user)
router.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const user = await User.findOne({ username, password, role });
    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ error: "Invalid credentials or role mismatch." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register new user
router.post("/register", async (req, res) => {
  const { username, password, type, salary } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists." });
    }
    const usersCount = await User.countDocuments({ role: "user" });
    const newUserId = `u${usersCount + 1}`;
    const defaultBudget = {
      Food: 20,
      Education: 30,
      Miscellaneous: 20,
      Savings: 30,
    };
    const newUser = new User({
      id: newUserId,
      username,
      password,
      role: "user",
      type,
      salary,
      budget: defaultBudget,
      profile: `New ${type} user registered.`,
      unreadMsgs: 0,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user (e.g., profile or budget)
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;