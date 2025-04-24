const mongoose = require('mongoose');
const app = require('./app'); // Import your Express app
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Get MongoDB connection string from environment
const DB = process.env.DATABASE_LOCAL;

if (!DB) {
  console.error("❌ DATABASE_LOCAL environment variable is not set!");
  process.exit(1);
}

// Debug: Print a masked version of the URI
console.log("📡 Connecting to MongoDB at:", DB.replace(/:\/\/(.*?):(.*?)@/, '://<user>:<pass>@'));

// Connect to MongoDB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ DB connection successful'))
  .catch((err) => {
    console.error('❌ DB connection error:', err.message);
    process.exit(1); // Exit if connection fails
  });

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
