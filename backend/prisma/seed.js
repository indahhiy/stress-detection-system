require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb({
    host: "127.0.0.1",
    port: 3307,
    user: "root",
    password: "root",
    database: "stress_detection_db",
    connectionLimit: 5,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    await prisma.symptom.deleteMany();

    await prisma.symptom.createMany({
        data: [
            {
                code: "kewalahan",
                question: "Saya merasa kewalahan dengan tugas proyek kelompok.",
                category: "Tekanan Deadline",
            },
            {
                code: "sulit_tidur",
                question: "Saya sulit tidur karena memikirkan proyek kelompok.",
                category: "Tekanan Deadline",
            },
            {
                code: "cemas_deadline",
                question: "Saya merasa cemas ketika deadline proyek semakin dekat.",
                category: "Tekanan Deadline",
            },
            {
                code: "khawatir_hasil",
                question: "Saya khawatir hasil proyek kelompok tidak memuaskan.",
                category: "Tekanan Deadline",
            },
            {
                code: "sulit_fokus",
                question: "Saya sulit fokus saat mengerjakan bagian tugas saya.",
                category: "Fokus dan Produktivitas",
            },
            {
                code: "menunda_pekerjaan",
                question: "Saya sering menunda pekerjaan karena merasa tertekan.",
                category: "Fokus dan Produktivitas",
            },
            {
                code: "sulit_atur_waktu",
                question: "Saya sulit mengatur waktu pengerjaan proyek kelompok.",
                category: "Fokus dan Produktivitas",
            },
            {
                code: "tidak_mampu_selesai",
                question: "Saya merasa tidak mampu menyelesaikan tugas tepat waktu.",
                category: "Fokus dan Produktivitas",
            },
            {
                code: "komunikasi_buruk",
                question: "Saya merasa komunikasi dalam kelompok tidak berjalan dengan baik.",
                category: "Hubungan Kelompok",
            },
            {
                code: "konflik_kelompok",
                question: "Saya sering mengalami konflik atau ketegangan dengan anggota kelompok.",
                category: "Hubungan Kelompok",
            },
            {
                code: "pendapat_tidak_dihargai",
                question: "Saya merasa pendapat saya tidak dihargai oleh anggota kelompok.",
                category: "Hubungan Kelompok",
            },
            {
                code: "beban_tidak_adil",
                question: "Saya merasa pembagian tugas dalam kelompok tidak adil.",
                category: "Hubungan Kelompok",
            },
            {
                code: "kehilangan_motivasi",
                question: "Saya kehilangan motivasi untuk mengerjakan proyek kelompok.",
                category: "Motivasi",
            },
            {
                code: "jenuh_proyek",
                question: "Saya merasa bosan atau jenuh terhadap pengerjaan proyek.",
                category: "Motivasi",
            },
            {
                code: "takut_mengecewakan",
                question: "Saya takut mengecewakan anggota kelompok.",
                category: "Motivasi",
            },
            {
                code: "mudah_marah",
                question: "Saya menjadi mudah marah selama pengerjaan proyek kelompok.",
                category: "Dampak Fisik dan Emosional",
            },
            {
                code: "lelah_fisik",
                question: "Saya sering merasa lelah, pusing, atau sakit kepala saat memikirkan proyek.",
                category: "Dampak Fisik dan Emosional",
            },
            {
                code: "sedih_frustrasi",
                question: "Saya merasa sedih atau frustrasi karena proyek kelompok.",
                category: "Dampak Fisik dan Emosional",
            },
        ],
    });

    console.log("Seed completed: 18 symptoms inserted");
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });