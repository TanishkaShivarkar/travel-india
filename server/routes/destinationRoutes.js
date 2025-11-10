import express from "express";
import Destination from "../models/Destination.js";

const router = express.Router();

// Get all destinations
router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new destination
router.post("/", async (req, res) => {
  try {
    const newDestination = new Destination(req.body);
    await newDestination.save();
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(400).json({ error: "Failed to add destination" });
  }
});

export default router;
