import express from "express";
import Destination from "../models/Destination.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { state, tag, search } = req.query;
    const filter = {};
    if(state) filter.state = state;
    if(tag) filter.tags = tag;
    if(search) filter.$text = { $search: search }; 
    const dests = await Destination.find(filter).sort({ createdAt: -1 });
    res.json(dests);
  } catch (err) { res.status(500).json({ msg: err.message }); }
});


router.post("/", auth, async (req, res) => {
  try {
    const payload = req.body;
    payload.createdBy = req.user.id;
    const newDest = new Destination(payload);
    const saved = await newDest.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ msg: err.message }); }
});


router.patch("/:id", auth, async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if(!dest) return res.status(404).json({ msg: "Not found" });

    Object.assign(dest, req.body);
    const updated = await dest.save();
    res.json(updated);
  } catch (err) { res.status(400).json({ msg: err.message }); }
});


router.delete("/:id", auth, async (req, res) => {
  try {
    const dest = await Destination.findById(req.params.id);
    if(!dest) return res.status(404).json({ msg: "Not found" });
    await dest.remove();
    res.json({ msg: "Deleted" });
  } catch (err) { res.status(500).json({ msg: err.message }); }
});

export default router;
