const mongoose = require("mongoose");

const IngestionSchema = new mongoose.Schema({
  ingestion_id: String,
  priority: { type: String, enum: ["HIGH", "MEDIUM", "LOW"] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ingestion", IngestionSchema);
