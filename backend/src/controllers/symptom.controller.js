const prisma = require("../config/prisma");

const getSymptoms = async (req, res) => {
    try {
        const symptoms = await prisma.symptom.findMany({
            orderBy: {
                id: "asc",
            },
        });

        res.json({
            success: true,
            data: symptoms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data gejala",
            error: error.message,
        });
    }
};

module.exports = {
    getSymptoms,
};