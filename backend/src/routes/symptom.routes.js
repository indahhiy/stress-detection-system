const express = require("express");
const router = express.Router();

const { getSymptoms } = require("../controllers/symptom.controller");

router.get("/", getSymptoms);

module.exports = router;