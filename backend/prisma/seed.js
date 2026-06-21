require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const databaseUrl = process.env.DATABASE_URL || "mysql://root:@localhost:3306/stress_detection";
const parsedUrl = new URL(databaseUrl);
const database = parsedUrl.pathname?.replace(/^\//, "") || "stress_detection";

const adapter = new PrismaMariaDb({
    host: parsedUrl.hostname,
    port: Number(parsedUrl.port || 3306),
    user: parsedUrl.username || "root",
    password: parsedUrl.password || "",
    database,
    connectionLimit: 5,
    allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({
    adapter,
});

const symptomsData = [
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
];

async function main() {
    await prisma.diagnosisResult.deleteMany();
    await prisma.student.deleteMany();
    await prisma.symptom.deleteMany();

    await prisma.symptom.createMany({
        data: symptomsData,
    });

    const student = await prisma.student.create({
        data: {
            name: "Mahasiswa Anonim",
            nim: "123456789",
            className: "Teknik Informatika 6A",
            project: "Sistem Deteksi Stres",
        },
    });

    await prisma.diagnosisResult.create({
        data: {
            studentId: student.id,
            answers: {
                kewalahan: 3,
                sulit_tidur: 2,
                cemas_deadline: 4,
                khawatir_hasil: 3,
                sulit_fokus: 3,
                menunda_pekerjaan: 2,
                sulit_atur_waktu: 3,
                tidak_mampu_selesai: 2,
                komunikasi_buruk: 2,
                konflik_kelompok: 1,
                pendapat_tidak_dihargai: 2,
                beban_tidak_adil: 1,
                kehilangan_motivasi: 3,
                jenuh_proyek: 2,
                takut_mengecewakan: 3,
                mudah_marah: 2,
                lelah_fisik: 2,
                sedih_frustrasi: 2,
            },
            facts: [
                "Skor stres menengah",
                "Cenderung mengalami kesulitan fokus dan kecemasan deadline",
            ],
            stressLevel: "Sedang",
            recommendation: "Istirahat cukup, atur waktu lebih baik, dan diskusikan pembagian tugas dalam kelompok.",
        },
    });

    console.log("Seed completed: 18 symptoms, 1 student, 1 diagnosis result inserted.");
}

main()
    .catch((error) => {
        console.error(error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
