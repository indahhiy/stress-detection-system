const express = require("express");
const cors = require("cors");
require("dotenv").config();

const symptomRoutes = require("./routes/symptom.routes");
const diagnosisRoutes = require("./routes/diagnosis.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend Sistem Deteksi Stres Mahasiswa Berjalan",
    });
});

app.use("/api/symptoms", symptomRoutes);
app.use("/api/diagnosis", diagnosisRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});