import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, UserRound, ArrowLeft, ArrowRight, Activity } from "lucide-react";
import api from "../api/api";

const options = [
    { label: "Tidak Pernah", value: 0 },
    { label: "Jarang", value: 1 },
    { label: "Kadang-kadang", value: 2 },
    { label: "Sering", value: 3 },
    { label: "Sangat Sering", value: 4 },
];

function ChatDiagnosis() {
    const navigate = useNavigate();

    const [symptoms, setSymptoms] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [started, setStarted] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        fetchSymptoms();
    }, []);

    const fetchSymptoms = async () => {
        try {
            const response = await api.get("/symptoms");
            setSymptoms(response.data.data);
        } catch (error) {
            setFetchError(
                "Gagal mengambil data pertanyaan. Pastikan backend berjalan di http://localhost:5000."
            );
        }
    };

    const handleAnswer = (value) => {
        const currentSymptom = symptoms[currentIndex];

        const updatedAnswers = {
            ...answers,
            [currentSymptom.code]: value,
        };

        setAnswers(updatedAnswers);

        if (currentIndex < symptoms.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            submitDiagnosis(updatedAnswers);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const submitDiagnosis = async (finalAnswers) => {
        try {
            setLoading(true);

            const response = await api.post("/diagnosis", {
                answers: finalAnswers,
            });

            // stop timer when submitting
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            navigate(`/result/${response.data.data.result.id}`);
        } catch (error) {
            alert("Gagal memproses diagnosis.");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (s) => {
        const mm = String(Math.floor(s / 60)).padStart(2, "0");
        const ss = String(s % 60).padStart(2, "0");
        return `${mm}:${ss}`;
    };

    const startTest = () => {
        if (started) return;
        setStarted(true);
        setElapsed(0);
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const currentQuestion = symptoms[currentIndex];
    const selectedAnswer = currentQuestion ? answers[currentQuestion.code] : null;

    const progress =
        symptoms.length > 0
            ? Math.round(((currentIndex + 1) / symptoms.length) * 100)
            : 0;

    const estimatedSeconds = 8 * 60 + 30; // 08:30 minutes
    const remaining = Math.max(0, estimatedSeconds - elapsed);
    const timePercent = Math.min(100, Math.round((elapsed / estimatedSeconds) * 100));

    return (
        <div className="dark min-h-screen bg-background text-on-background px-4 pb-16 pt-28">
            <div className="max-w-7xl mx-auto grid gap-6 xl:grid-cols-[1.5fr_380px]">
                <div className="space-y-6">
                    <div className="overflow-hidden rounded-[32px] border border-surface-variant/40 bg-surface shadow-[0_40px_120px_-60px_rgba(15,23,42,0.6)]">
                        <div className="bg-surface-container-highest/90 border-b border-surface-variant/40 px-6 py-6 sm:px-8 sm:py-7">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        TEKANAN DEADLINE
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm uppercase tracking-[0.24em] text-surface-variant">Soal {currentIndex + 1} dari {symptoms.length || 0}</p>
                                        <h1 className="text-3xl font-semibold text-on-surface sm:text-4xl">Diagnosis Stress Berkala</h1>
                                    </div>
                                </div>

                                <div className="rounded-3xl bg-surface-container-low px-5 py-4 text-center shadow-sm border border-surface-variant/40">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.24em] text-surface-variant">Kemajuan Sesi</p>
                                        <p className="mt-2 text-xl font-semibold text-on-surface">{progress}%</p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-xs uppercase tracking-[0.24em] text-surface-variant">Waktu</p>
                                        <p className="text-sm font-medium text-on-surface">{started ? formatTime(elapsed) : "00:00"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {fetchError && (
                            <div className="p-6">
                                <div className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-red-200">
                                    {fetchError}
                                </div>
                            </div>
                        )}

                        {!fetchError && symptoms.length === 0 && (
                            <div className="p-6 text-surface-variant">Memuat pertanyaan...</div>
                        )}

                        {/* Require starting the session before showing questions */}
                        {!fetchError && symptoms.length > 0 && !started && (
                            <div className="px-6 py-8 sm:px-8">
                                <div className="flex flex-col items-center gap-6 text-center">
                                    <h3 className="text-2xl font-semibold text-on-surface">Siap mengisi kuesioner?</h3>
                                    <p className="text-on-surface-variant max-w-xl">Tekan tombol <strong>Mulai</strong> untuk memulai waktu dan melanjutkan ke pertanyaan. Estimasi durasi: 08:30 menit.</p>
                                    <div className="w-full max-w-md bg-surface-container-highest p-4 rounded-xl border border-surface-variant/40">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-on-surface-variant">Estimasi</div>
                                            <div className="text-sm font-semibold text-on-surface">08:30</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={() => navigate("/")} className="px-6 py-2 rounded-2xl border border-surface-variant/40 text-surface-variant">Batal</button>
                                        <button onClick={startTest} className="px-6 py-2 rounded-2xl bg-primary text-on-primary font-semibold">Mulai</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!fetchError && started && currentQuestion && (
                            <div className="px-6 py-8 sm:px-8">
                                <div className="h-3 rounded-full bg-surface-container-lowest overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <div className="mt-8 grid gap-6">
                                    <div className="rounded-[28px] border border-surface-variant/40 bg-surface-container-highest p-8 shadow-[0_30px_90px_-50px_rgba(15,23,42,0.55)]">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                                                <Bot size={22} />
                                            </div>
                                            <div>
                                                <p className="text-sm text-surface-variant mb-3">Kategori: {currentQuestion.category}</p>
                                                <div className="text-lg font-semibold leading-relaxed text-on-surface sm:text-xl">
                                                    {currentQuestion.question}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        {options.map((option) => {
                                            const selected = answers[currentQuestion.code] === option.value;
                                            return (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleAnswer(option.value)}
                                                    disabled={loading}
                                                    className={`group flex items-center justify-between rounded-3xl border px-5 py-4 text-left text-base font-medium transition duration-200 ${selected
                                                            ? "border-primary bg-primary/10 text-on-primary shadow-[0_0_0_1px_rgba(94,234,212,0.35)]"
                                                            : "border-surface-variant/60 bg-surface-container-lowest text-surface-variant hover:border-primary/70 hover:bg-primary/5"
                                                        } disabled:cursor-not-allowed disabled:opacity-70`}
                                                >
                                                    <span>{option.label}</span>
                                                    <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${selected
                                                            ? "border-primary bg-primary text-on-primary"
                                                            : "border-surface-variant/70 bg-transparent text-surface-variant"
                                                        }`}>
                                                        {selected ? "✓" : ""}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {loading && (
                                    <div className="mt-6 flex gap-3 items-start rounded-[28px] border border-surface-variant/40 bg-surface-container-lowest p-4">
                                        <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                                            <Bot size={22} />
                                        </div>
                                        <div className="text-sm text-surface-variant">Sedang menganalisis jawaban...</div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="bg-surface-container-highest/80 border-t border-surface-variant/40 px-6 py-5 sm:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <button
                                onClick={handleBack}
                                disabled={currentIndex === 0 || loading}
                                className="inline-flex items-center gap-2 rounded-3xl border border-surface-variant/70 bg-surface px-5 py-3 text-sm text-surface-variant transition hover:border-primary/70 hover:text-on-surface disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <ArrowLeft size={18} />
                                Sebelumnya
                            </button>

                            <button
                                onClick={() => {
                                    if (selectedAnswer !== null) {
                                        handleAnswer(selectedAnswer);
                                    }
                                }}
                                disabled={loading || selectedAnswer === null}
                                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Lanjut
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="space-y-6">
                    <div className="rounded-[32px] border border-surface-variant/40 bg-surface-container-highest p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.55)]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                                <Bot size={20} />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-surface-variant">Tips Cepat</p>
                                <h2 className="mt-2 text-lg font-semibold text-on-surface">Tenang dan fokus</h2>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-surface-variant">
                            Tarik napas dalam-dalam sebelum menjawab pertanyaan. Kejujuran pada diri sendiri adalah langkah pertama menuju manajemen stress yang efektif.
                        </p>
                    </div>

                    <div className="rounded-[32px] border border-surface-variant/40 bg-surface-container-highest p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.55)]">
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-surface-variant">Estimasi Selesai</p>
                                <p className="text-lg font-semibold text-on-surface mt-2">{!started ? "08:30 Menit" : `${formatTime(remaining)} Menit`}</p>
                            </div>
                            <div className="rounded-3xl bg-surface p-3 text-surface-variant">
                                <Activity size={20} />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-3 rounded-full bg-surface-container-lowest overflow-hidden">
                                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <div className="text-sm text-surface-variant">
                                Selesaikan sesi dengan tenang, jawab jujur sesuai kondisimu saat ini.
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default ChatDiagnosis;