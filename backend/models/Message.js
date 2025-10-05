 
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    senderRole: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);