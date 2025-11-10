import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import destinationRoutes from "./routes/destinationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Travel India API is running ✅");
});

app.use("/api/destinations", destinationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log("❌ Mongo Error:", err));
