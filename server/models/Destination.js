import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  country: { type: String, default: "India" },
  description: { type: String, required: true },
  image: { type: String },
  tags: [String],
});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;