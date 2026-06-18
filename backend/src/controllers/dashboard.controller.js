const prisma = require("../config/prisma");

const getDashboardStats = async (req, res) => {
    try {
        const totalDiagnosis = await prisma.diagnosisResult.count();

        const stressRingan = await prisma.diagnosisResult.count({
            where: {
                stressLevel: "Stres Ringan",
            },
        });

        const stressSedang = await prisma.diagnosisResult.count({
            where: {
                stressLevel: "Stres Sedang",
            },
        });

        const stressBerat = await prisma.diagnosisResult.count({
            where: {
                stressLevel: "Stres Berat",
            },
        });

        const tidakTerdeteksi = await prisma.diagnosisResult.count({
            where: {
                stressLevel: "Tidak Terdeteksi Stres Signifikan",
            },
        });

        const recentDiagnosis = await prisma.diagnosisResult.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                student: true,
            },
        });

        res.json({
            success: true,
            data: {
                totalDiagnosis,
                stressRingan,
                stressSedang,
                stressBerat,
                tidakTerdeteksi,
                recentDiagnosis,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data dashboard.",
            error: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};