



const mongoose = require("mongoose");

const BatchSchema = new mongoose.Schema({
  ingestion_id: String,
  batch_id: String,
  ids: [Number],
  status: { type: String, enum: ["yet_to_start", "triggered", "completed"] }
});

module.exports = mongoose.model("Batch", BatchSchema);
