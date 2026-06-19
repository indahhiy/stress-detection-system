import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, UserRound, ArrowLeft } from "lucide-react";
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

            navigate(`/result/${response.data.data.result.id}`);
        } catch (error) {
            alert("Gagal memproses diagnosis.");
        } finally {
            setLoading(false);
        }
    };

    const currentQuestion = symptoms[currentIndex];

    const progress =
        symptoms.length > 0
            ? Math.round(((currentIndex + 1) / symptoms.length) * 100)
            : 0;

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <div className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-800">
                            StressCare Assistant
                        </h1>
                        <p className="text-sm text-slate-500">
                            Kuesioner anonim deteksi stres mahasiswa
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="text-slate-500 hover:text-slate-800"
                    >
                        <ArrowLeft size={22} />
                    </button>
                </div>

                {fetchError && (
                    <div className="p-6">
                        <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-2xl">
                            {fetchError}
                        </div>
                    </div>
                )}

                {!fetchError && symptoms.length === 0 && (
                    <div className="p-6 text-slate-500">Memuat pertanyaan...</div>
                )}

                {!fetchError && currentQuestion && (
                    <div className="p-6">
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-slate-500 mb-2">
                                <span>
                                    Pertanyaan {currentIndex + 1} dari {symptoms.length}
                                </span>
                                <span>{progress}%</span>
                            </div>

                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-3 items-start">
                                <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl">
                                    <Bot size={22} />
                                </div>

                                <div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-700 leading-relaxed">
                                        {currentQuestion.question}
                                    </div>

                                    <p className="text-xs text-slate-400 mt-2">
                                        Kategori: {currentQuestion.category}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="w-full sm:w-[430px] space-y-3">
                                    <div className="flex items-center gap-2 justify-between mb-1 text-sm text-slate-500">
                                        {currentIndex > 0 ? (
                                            <button
                                                onClick={handleBack}
                                                disabled={loading}
                                                className="text-xs text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition font-medium"
                                            >
                                                &larr; Sebelumnya
                                            </button>
                                        ) : (
                                            <div />
                                        )}
                                        <div className="flex items-center gap-2">
                                            <span>Pilih jawabanmu</span>
                                            <div className="bg-slate-100 text-slate-600 p-2 rounded-full">
                                                <UserRound size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {options.map((option) => (
                                            <button
                                                key={option.value}
                                                onClick={() => handleAnswer(option.value)}
                                                disabled={loading}
                                                className={`flex items-center justify-between border rounded-xl px-4 py-3 text-sm transition text-slate-700 disabled:opacity-60 ${
                                                    answers[currentQuestion.code] === option.value
                                                        ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-medium ring-1 ring-emerald-500"
                                                        : "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50"
                                                }`}
                                            >
                                                <span>{option.label}</span>
                                                <span className="text-slate-400">{option.value}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {loading && (
                                <div className="flex gap-3 items-start">
                                    <div className="bg-emerald-50 text-emerald-700 p-3 rounded-2xl">
                                        <Bot size={22} />
                                    </div>
                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-600">
                                        Sedang menganalisis jawaban...
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatDiagnosis;