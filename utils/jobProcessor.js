const Batch = require("../models/batch");
const { getNextJob } = require("./jobQueue");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processJob(job) {
  const pendingBatches = await Batch.find({
    ingestion_id: job.ingestion_id,
    status: "yet_to_start"
  });

  for (const batch of pendingBatches) {
    batch.status = "triggered";
    await batch.save();

    await delay(5000); // simulate external API call
    batch.status = "completed";
    await batch.save();
  }
}

function startProcessor() {
  setInterval(async () => {
    const job = getNextJob();
    if (job) await processJob(job);
  }, 5000);
}

module.exports = startProcessor;
