const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send new message
router.post("/", async (req, res) => {
  const { senderId, receiverId, senderRole, text } = req.body;
  try {
    const messagesCount = await Message.countDocuments();
    const newMessage = new Message({
      id: messagesCount + 1,
      senderId,
      receiverId,
      senderRole,
      text,
      timestamp: new Date(),
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update message (mark as read)
router.put("/:id", async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { id: req.params.id },
      { isRead: true },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found." });
    }
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
