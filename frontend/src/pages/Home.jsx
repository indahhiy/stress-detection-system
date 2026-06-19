import { useNavigate } from "react-router-dom";
import { Brain, MessageCircleHeart, ShieldCheck } from "lucide-react";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-full text-sm mb-6">
                            <ShieldCheck size={16} />
                            Kuesioner anonim
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            Deteksi Tingkat Stres Mahasiswa dalam Proyek Kelompok
                        </h1>

                        <p className="mt-5 text-slate-600 text-lg leading-relaxed">
                            Sistem berbasis pengetahuan yang membantu mengidentifikasi tingkat
                            stres mahasiswa melalui kuesioner sederhana dengan metode Forward
                            Chaining.
                        </p>

                        <button
                            onClick={() => navigate("/diagnosis")}
                            className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-medium transition"
                        >
                            <MessageCircleHeart size={20} />
                            Mulai Diagnosis
                        </button>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
                        <div className="bg-emerald-50 text-emerald-700 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
                            <Brain size={34} />
                        </div>

                        <h2 className="text-2xl font-bold mb-4">Bagaimana sistem bekerja?</h2>

                        <div className="space-y-4 text-slate-600">
                            <p>1. Mahasiswa menjawab 18 pertanyaan secara anonim.</p>
                            <p>2. Jawaban diubah menjadi fakta awal.</p>
                            <p>3. Forward Chaining mencocokkan fakta dengan rule.</p>
                            <p>4. Sistem menampilkan tingkat stres dan rekomendasi.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;