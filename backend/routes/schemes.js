 
const express = require("express");
const Scheme = require("../models/Scheme");
const router = express.Router();

// Get all schemes
router.get("/", async (req, res) => {
  try {
    const schemes = await Scheme.find({});
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new scheme
router.post("/", async (req, res) => {
  const { type, title, description, details, chartUrl } = req.body;
  try {
    const schemesCount = await Scheme.countDocuments();
    const newScheme = new Scheme({
      id: schemesCount + 1,
      type,
      title,
      description,
      details,
      chartUrl,
    });
    await newScheme.save();
    res.json(newScheme);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete scheme
router.delete("/:id", async (req, res) => {
  try {
    await Scheme.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Scheme deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;