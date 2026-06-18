const rules = [
    {
        code: "R1",
        conditions: ["kewalahan", "cemas_deadline"],
        result: "tekanan_deadline_tinggi",
        description: "Mahasiswa mengalami tekanan deadline tinggi.",
    },
    {
        code: "R2",
        conditions: ["sulit_fokus", "menunda_pekerjaan"],
        result: "gangguan_fokus",
        description: "Mahasiswa mengalami gangguan fokus dan produktivitas.",
    },
    {
        code: "R3",
        conditions: ["sulit_atur_waktu", "tidak_mampu_selesai"],
        result: "masalah_manajemen_waktu",
        description: "Mahasiswa mengalami masalah manajemen waktu.",
    },
    {
        code: "R4",
        conditions: ["komunikasi_buruk", "konflik_kelompok"],
        result: "konflik_kelompok_tinggi",
        description: "Mahasiswa mengalami konflik kelompok.",
    },
    {
        code: "R5",
        conditions: ["pendapat_tidak_dihargai", "beban_tidak_adil"],
        result: "ketidakpuasan_kelompok",
        description: "Mahasiswa merasa tidak puas dengan kondisi kelompok.",
    },
    {
        code: "R6",
        conditions: ["kehilangan_motivasi", "jenuh_proyek"],
        result: "penurunan_motivasi",
        description: "Mahasiswa mengalami penurunan motivasi.",
    },
    {
        code: "R7",
        conditions: ["takut_mengecewakan"],
        result: "tekanan_sosial",
        description: "Mahasiswa mengalami tekanan sosial dalam kelompok.",
    },
    {
        code: "R8",
        conditions: ["lelah_fisik"],
        result: "dampak_fisik",
        description: "Mahasiswa mengalami dampak fisik akibat proyek.",
    },
    {
        code: "R9",
        conditions: ["mudah_marah", "sedih_frustrasi"],
        result: "dampak_emosional",
        description: "Mahasiswa mengalami dampak emosional.",
    },

    // Rule tingkat stres
    {
        code: "R10",
        conditions: ["tekanan_deadline_tinggi"],
        result: "indikasi_stres_ringan",
        description: "Tekanan deadline menunjukkan indikasi stres ringan.",
    },
    {
        code: "R11",
        conditions: ["gangguan_fokus"],
        result: "indikasi_stres_ringan",
        description: "Gangguan fokus menunjukkan indikasi stres ringan.",
    },
    {
        code: "R12",
        conditions: ["tekanan_deadline_tinggi", "masalah_manajemen_waktu"],
        result: "indikasi_stres_sedang",
        description: "Tekanan deadline dan masalah waktu menunjukkan stres sedang.",
    },
    {
        code: "R13",
        conditions: ["konflik_kelompok_tinggi", "ketidakpuasan_kelompok"],
        result: "indikasi_stres_sedang",
        description: "Konflik dan ketidakpuasan kelompok menunjukkan stres sedang.",
    },
    {
        code: "R14",
        conditions: ["penurunan_motivasi", "tekanan_sosial"],
        result: "indikasi_stres_sedang",
        description: "Penurunan motivasi dan tekanan sosial menunjukkan stres sedang.",
    },
    {
        code: "R15",
        conditions: [
            "tekanan_deadline_tinggi",
            "konflik_kelompok_tinggi",
            "penurunan_motivasi",
        ],
        result: "indikasi_stres_berat",
        description: "Deadline, konflik, dan motivasi rendah menunjukkan stres berat.",
    },
    {
        code: "R16",
        conditions: ["konflik_kelompok_tinggi", "dampak_fisik", "dampak_emosional"],
        result: "indikasi_stres_berat",
        description:
            "Konflik disertai dampak fisik dan emosional menunjukkan stres berat.",
    },
    {
        code: "R17",
        conditions: [
            "masalah_manajemen_waktu",
            "penurunan_motivasi",
            "dampak_emosional",
        ],
        result: "indikasi_stres_berat",
        description:
            "Masalah waktu, motivasi rendah, dan emosi negatif menunjukkan stres berat.",
    },
];

function buildFacts(answers) {
    const facts = {};

    for (const key in answers) {
        facts[key] = Number(answers[key]) >= 3;
    }

    return facts;
}

function calculateScore(answers) {
    let totalScore = 0;

    for (const key in answers) {
        totalScore += Number(answers[key]);
    }

    const maxScore = Object.keys(answers).length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);

    let scoreCategory = "Rendah";

    if (totalScore >= 55) {
        scoreCategory = "Sangat Tinggi";
    } else if (totalScore >= 37) {
        scoreCategory = "Tinggi";
    } else if (totalScore >= 19) {
        scoreCategory = "Sedang";
    }

    return {
        totalScore,
        maxScore,
        percentage,
        scoreCategory,
    };
}

function runForwardChaining(initialFacts) {
    const facts = { ...initialFacts };
    const firedRules = [];

    let changed = true;

    while (changed) {
        changed = false;

        for (const rule of rules) {
            const isMatched = rule.conditions.every((condition) => facts[condition]);

            if (isMatched && !facts[rule.result]) {
                facts[rule.result] = true;

                firedRules.push({
                    code: rule.code,
                    conditions: rule.conditions,
                    result: rule.result,
                    description: rule.description,
                });

                changed = true;
            }
        }
    }

    return {
        facts,
        firedRules,
    };
}

function determineRuleBasedLevel(facts) {
    if (facts.indikasi_stres_berat) {
        return "Stres Berat";
    }

    if (facts.indikasi_stres_sedang) {
        return "Stres Sedang";
    }

    if (facts.indikasi_stres_ringan) {
        return "Stres Ringan";
    }

    return "Tidak Terdeteksi Stres Signifikan";
}

function determineScoreBasedLevel(scoreCategory) {
    if (scoreCategory === "Sangat Tinggi" || scoreCategory === "Tinggi") {
        return "Stres Berat";
    }

    if (scoreCategory === "Sedang") {
        return "Stres Sedang";
    }

    return "Stres Ringan";
}

function getInterpretationNote(ruleBasedLevel, scoreBasedLevel) {
    if (ruleBasedLevel === scoreBasedLevel) {
        return "Hasil forward chaining dan skor menunjukkan tingkat stres yang selaras.";
    }

    return `Hasil utama ditentukan berdasarkan forward chaining yaitu ${ruleBasedLevel}. Skor kuesioner menunjukkan ${scoreBasedLevel}, sehingga skor digunakan sebagai informasi pendukung untuk melihat intensitas jawaban mahasiswa.`;
}

function getRecommendation(stressLevel) {
    if (stressLevel === "Stres Berat") {
        return "Mahasiswa disarankan segera mengomunikasikan kondisi kepada anggota kelompok atau dosen pembimbing. Perlu dilakukan evaluasi pembagian tugas, pengurangan tekanan, penjadwalan ulang pekerjaan, serta istirahat yang cukup. Jika kondisi emosional dan fisik terus mengganggu aktivitas harian, mahasiswa disarankan mencari bantuan dari pihak yang lebih kompeten.";
    }

    if (stressLevel === "Stres Sedang") {
        return "Mahasiswa disarankan membuat daftar prioritas tugas, membagi pekerjaan menjadi bagian kecil, memperbaiki komunikasi kelompok, serta membuat jadwal pengerjaan yang realistis. Diskusi kelompok perlu dilakukan agar beban kerja lebih seimbang.";
    }

    if (stressLevel === "Stres Ringan") {
        return "Mahasiswa disarankan menjaga manajemen waktu, membuat to-do list, mengambil jeda istirahat, dan tetap menjaga komunikasi dengan anggota kelompok agar tekanan tidak meningkat.";
    }

    return "Mahasiswa tetap disarankan menjaga pola kerja, waktu istirahat, dan komunikasi kelompok selama proses pengerjaan proyek.";
}

function diagnoseStress(answers) {
    const initialFacts = buildFacts(answers);
    const inferenceResult = runForwardChaining(initialFacts);
    const scoreResult = calculateScore(answers);

    const ruleBasedLevel = determineRuleBasedLevel(inferenceResult.facts);
    const scoreBasedLevel = determineScoreBasedLevel(scoreResult.scoreCategory);

    // Keputusan utama tetap berdasarkan Forward Chaining
    const finalStressLevel = ruleBasedLevel;

    return {
        initialFacts,
        finalFacts: inferenceResult.facts,
        firedRules: inferenceResult.firedRules,

        score: scoreResult,

        ruleBasedLevel,
        scoreBasedLevel,

        stressLevel: finalStressLevel,
        interpretationNote: getInterpretationNote(ruleBasedLevel, scoreBasedLevel),

        recommendation: getRecommendation(finalStressLevel),
    };
}

module.exports = {
    diagnoseStress,
    rules,
};