const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const startProcessor = require("./utils/jobProcessor");
const ingestionRoutes = require("./routes/ingest");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api", ingestionRoutes);
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Ingestion API" });
});

let server;
const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
  
  const PORT = process.env.PORT || 5000;
  server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  
  if (process.env.NODE_ENV !== 'test') {
    startProcessor();
  }
  
  return server;
};

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer().catch(console.error);
}

module.exports = { app, startServer };
