 
const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: String,
    chartUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);