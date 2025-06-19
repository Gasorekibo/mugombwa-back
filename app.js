import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes/index.js";
import connectDB from "./config/database.js"; // Assuming you have a database connection file

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://mugombwa.m-gasore.workers.dev",
    "https://mugombwa.m-gasore.workers.dev/",
  ],

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/", routes);

// 404 handler
app.use("/{*split}", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
