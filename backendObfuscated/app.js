// app.js
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import your routes
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatbot");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
  'https://homelyhub-co.onrender.com',
  'http://localhost:3000' // useful for local dev, optional
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// API Routes
app.use("/api/v1/rent/listing", propertyRoutes); // Property routes
app.use("/api/v1/rent/user", userRoutes);        // User routes
app.use("/api/v1/rent/chat", chatRoutes);        // Chatbot route

// Root Route - for testing
app.get("/", (req, res) => {
  res.send("🎉 Welcome to the HomelyHub API — Backend is Live!");
});

module.exports = app;
