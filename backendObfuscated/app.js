// app.js
const express = require("express");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const chatRoutes = require("./routes/chatbot"); // Chatbot routes
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:3000',
    'https://backend-h8f0.onrender.com' // Replace this when deployed
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

// Routes
app.use("/api/v1/rent/listing", propertyRoutes); // Property routes
app.use("/api/v1/rent/user", userRoutes); // User routes
app.use("/api/v1/rent/chat", chatRoutes); // Chatbot route

module.exports = app;
