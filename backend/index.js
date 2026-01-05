const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // ✅ env sabse upar load

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// Routes
app.use("/api", Routes);

// Health check (Railway ke liye helpful)
app.get("/", (req, res) => {
  res.send("Dikhsha ERP Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
