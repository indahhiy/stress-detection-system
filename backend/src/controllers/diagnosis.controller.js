const prisma = require("../config/prisma");
const { diagnoseStress } = require("../services/forwardChaining.service");

const createDiagnosis = async (req, res) => {
    try {
        const { answers } = req.body;

        if (!answers) {
            return res.status(400).json({
                success: false,
                message: "Jawaban kuesioner wajib diisi.",
            });
        }

        const diagnosis = diagnoseStress(answers);

        const student = await prisma.student.create({
            data: {
                name: "Anonim",
                nim: "-",
                className: "-",
                project: "Proyek Kelompok",
            },
        });

        const result = await prisma.diagnosisResult.create({
            data: {
                studentId: student.id,
                answers,
                facts: {
                    initialFacts: diagnosis.initialFacts,
                    finalFacts: diagnosis.finalFacts,
                    firedRules: diagnosis.firedRules,
                },
                stressLevel: diagnosis.stressLevel,
                recommendation: diagnosis.recommendation,
            },
        });

        res.status(201).json({
            success: true,
            message: "Diagnosis berhasil diproses.",
            data: {
                student,
                result,
                diagnosis,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal memproses diagnosis.",
            error: error.message,
        });
    }
};

const getDiagnosisHistory = async (req, res) => {
    try {
        const results = await prisma.diagnosisResult.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                student: true,
            },
        });

        res.json({
            success: true,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal mengambil riwayat diagnosis.",
            error: error.message,
        });
    }
};

const getDiagnosisDetail = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await prisma.diagnosisResult.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                student: true,
            },
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Data diagnosis tidak ditemukan.",
            });
        }

        const diagnosis = diagnoseStress(result.answers);

        res.json({
            success: true,
            data: {
                student: result.student,
                result,
                diagnosis,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal mengambil detail diagnosis.",
            error: error.message,
        });
    }
};

module.exports = {
    createDiagnosis,
    getDiagnosisHistory,
    getDiagnosisDetail,
};