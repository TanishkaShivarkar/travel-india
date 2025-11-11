import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  state: { type: String },
  country: { type: String, default: "India" },
  description: { type: String, required: true },
  images: [String],           
  tags: [String],
  bestTimeToVisit: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Destination", destinationSchema);
