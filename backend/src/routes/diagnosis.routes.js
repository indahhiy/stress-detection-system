const express = require("express");
const router = express.Router();

const {
    createDiagnosis,
    getDiagnosisHistory,
    getDiagnosisDetail,
} = require("../controllers/diagnosis.controller");

router.get("/", getDiagnosisHistory);
router.get("/:id", getDiagnosisDetail);
router.post("/", createDiagnosis);

module.exports = router;