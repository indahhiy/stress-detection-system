import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Bot,
    ClipboardList,
    RotateCcw,
    Home,
    Activity,
    BadgeCheck,
    AlertTriangle,
} from "lucide-react";
import api from "../api/api";

function Result() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchResult = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/diagnosis/${id}`);
                setData(response.data.data);
                setError("");
            } catch (err) {
                setError("Data diagnosis tidak ditemukan atau gagal dimuat.");
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Memuat hasil diagnosis...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Diagnosis Tidak Ditemukan</h2>
                    <p className="text-slate-600 mb-6">{error || "Data tidak valid."}</p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-2xl transition duration-200 shadow-md shadow-emerald-600/10"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        );
    }

    const { diagnosis, student } = data;

    return (
        <div className="min-h-screen bg-background text-on-background px-4 pb-16 pt-28">
            <div className="max-w-4xl mx-auto bg-surface-container border border-outline-variant/20 rounded-3xl shadow-sm overflow-hidden">
                <div className="bg-surface-container-highest/90 border-b border-outline-variant/20 px-6 py-5">
                    <h1 className="text-xl font-semibold text-on-surface">
                        Hasil Diagnosis: {student?.name || "Anonim"}
                    </h1>
                    <p className="text-sm text-on-surface-variant mt-1">
                        Proyek: {student?.project || "Proyek Kelompok"} | NIM: {student?.nim || "-"} | Kelas: {student?.className || "-"}
                    </p>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex gap-3 items-start">
                        <div className="bg-emerald-900/20 text-emerald-300 p-3 rounded-2xl">
                            <Bot size={22} />
                        </div>
                        <div className="bg-surface-container border border-outline-variant/20 rounded-2xl px-4 py-3 text-on-surface">
                            Diagnosis anonim telah selesai diproses.
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="border border-outline-variant/20 bg-surface-container-highest rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-emerald-300 mb-2">
                                <BadgeCheck size={18} />
                                <p className="text-sm">Hasil Akhir</p>
                            </div>
                            <h2 className="text-2xl font-bold text-on-surface">
                                {diagnosis.stressLevel}
                            </h2>
                        </div>

                        <div className="border border-outline-variant/20 bg-surface-container-highest rounded-2xl p-5">
                            <p className="text-sm text-on-surface-variant">Rule Based Level</p>
                            <h2 className="text-xl font-semibold text-on-surface mt-2">
                                {diagnosis.ruleBasedLevel}
                            </h2>
                        </div>

                        <div className="border border-outline-variant/20 bg-surface-container-highest rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                                <Activity size={18} />
                                <p className="text-sm">Stress Score</p>
                            </div>
                            <h2 className="text-xl font-semibold text-on-surface">
                                {diagnosis.score.totalScore}/{diagnosis.score.maxScore}
                            </h2>
                            <p className="text-sm text-on-surface-variant">
                                {diagnosis.score.percentage}% - {diagnosis.score.scoreCategory}
                            </p>
                        </div>
                    </div>

                    <div className="border border-outline-variant/20 bg-surface-container rounded-2xl p-5">
                        <h3 className="font-semibold text-on-surface mb-2">
                            Catatan Interpretasi
                        </h3>
                        <p className="text-on-surface-variant leading-relaxed">
                            {diagnosis.interpretationNote}
                        </p>
                    </div>

                    <div className="border border-outline-variant/20 bg-surface-container rounded-2xl p-5">
                        <h3 className="font-semibold text-on-surface mb-2">Rekomendasi</h3>
                        <p className="text-on-surface-variant leading-relaxed">
                            {diagnosis.recommendation}
                        </p>
                    </div>

                    <div className="border border-outline-variant/20 bg-surface-container rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4 text-on-surface">
                            <ClipboardList size={20} />
                            <h3 className="font-semibold">Rule yang Aktif</h3>
                        </div>

                        <div className="space-y-2">
                            {diagnosis.firedRules.length === 0 ? (
                                <p className="text-on-surface-variant text-sm">
                                    Tidak ada rule utama yang aktif.
                                </p>
                            ) : (
                                diagnosis.firedRules.map((rule) => (
                                    <div
                                        key={rule.code}
                                        className="bg-surface-container-low border border-outline-variant/10 rounded-xl px-4 py-3 text-sm text-on-surface"
                                    >
                                        <b>{rule.code}</b> - {rule.description}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                        <button
                            onClick={() => navigate("/diagnosis")}
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-on-primary rounded-xl py-3 font-medium"
                        >
                            <RotateCcw size={18} />
                            Diagnosis Lagi
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 border border-outline-variant/20 hover:bg-surface-container text-on-surface rounded-xl py-3 font-medium"
                        >
                            <Home size={18} />
                            Kembali ke Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;