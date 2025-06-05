const express = require("express");
const router = express.Router();
const { ingestData, getStatus } = require("../controlllers/ingestionController");




router.post("/ingest", ingestData);
router.get("/status/:id", getStatus);

module.exports = router;
