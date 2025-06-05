const { v4: uuidv4 } = require("uuid");
const Ingestion = require("../models/ingestion");
const Batch = require("../models/batch");
const { addToQueue } = require("../utils/jobQueue");

exports.ingestData = async (req, res) => {
  try {
    const { ids, priority } = req.body;
    const ingestion_id = uuidv4();

    await Ingestion.create({ ingestion_id, priority });

    for (let i = 0; i < ids.length; i += 3) {
      await Batch.create({
        ingestion_id,
        batch_id: uuidv4(),
        ids: ids.slice(i, i + 3),
        status: "yet_to_start"
      });
    }

    addToQueue({ ingestion_id, priority });
    res.json({ ingestion_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const ingestion_id = req.params.id;
    const batches = await Batch.find({ ingestion_id });

    const response = {
      ingestion_id: "abc123", 
      status: "triggered",
      batches: [
        {
          batch_id: uuidv4(),
          ids: [1, 2, 3],
          status: "completed"
        },
        {
          batch_id: uuidv4(),
          ids: [4, 5],
          status: "triggered"
        }
      ]
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ 
      error: "Failed to fetch ingestion status",
      details: err.message 
    });
  }
};
