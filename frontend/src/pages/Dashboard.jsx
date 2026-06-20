import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Users, 
    AlertTriangle, 
    AlertCircle, 
    CheckCircle2, 
    Calendar, 
    FileText, 
    ArrowRight,
    Search
} from "lucide-react";
import api from "../api/api";

function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/dashboard");
            setStats(response.data.data);
            setError("");
        } catch (err) {
            setError("Gagal mengambil data dashboard. Pastikan backend berjalan.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium">Memuat data dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Terjadi Kesalahan</h2>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={fetchDashboardData}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-2xl transition duration-200 shadow-md shadow-emerald-600/10"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    const {
        totalDiagnosis,
        stressRingan,
        stressSedang,
        stressBerat,
        tidakTerdeteksi,
        recentDiagnosis
    } = stats;

    // Hitung persentase untuk bar visualisasi
    const getPercent = (value) => {
        if (!totalDiagnosis) return 0;
        return Math.round((value / totalDiagnosis) * 100);
    };

    const filteredDiagnosis = recentDiagnosis.filter((item) => {
        const studentName = item.student?.name?.toLowerCase() || "";
        const stressLevel = item.stressLevel?.toLowerCase() || "";
        const query = searchTerm.toLowerCase();
        return studentName.includes(query) || stressLevel.includes(query);
    });

    return (
        <div className="min-h-screen bg-background text-on-background pt-28 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-on-surface tracking-tight">Analisis Tingkat Stres</h1>
                        <p className="text-on-surface-variant text-sm mt-1">
                            Statistik hasil deteksi stres mahasiswa dalam proyek kelompok.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/diagnosis")}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-5 py-3 rounded-2xl transition duration-200 shadow-md shadow-emerald-500/10 text-sm"
                    >
                        Mulai Diagnosis Baru
                        <ArrowRight size={16} />
                    </button>
                </div>

                {/* Grid Kartu Statistik */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Total */}
                    <div className="bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Data</span>
                            <div className="p-2 bg-surface-container text-on-surface-variant rounded-xl">
                                <Users size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-on-surface">{totalDiagnosis}</h3>
                            <p className="text-xs text-on-surface-variant mt-1">Diagnosis dilakukan</p>
                        </div>
                    </div>

                    {/* Stres Berat */}
                    <div className="bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-red-300 uppercase tracking-wider">Stres Berat</span>
                            <div className="p-2 bg-red-900/20 text-red-300 rounded-xl">
                                <AlertTriangle size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-on-surface">{stressBerat}</h3>
                            <p className="text-xs text-on-surface-variant mt-1">{getPercent(stressBerat)}% dari total</p>
                        </div>
                    </div>

                    {/* Stres Sedang */}
                    <div className="bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Stres Sedang</span>
                            <div className="p-2 bg-amber-900/20 text-amber-300 rounded-xl">
                                <AlertCircle size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-on-surface">{stressSedang}</h3>
                            <p className="text-xs text-on-surface-variant mt-1">{getPercent(stressSedang)}% dari total</p>
                        </div>
                    </div>

                    {/* Stres Ringan */}
                    <div className="bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Stres Ringan</span>
                            <div className="p-2 bg-emerald-900/20 text-emerald-300 rounded-xl">
                                <CheckCircle2 size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-on-surface">{stressRingan}</h3>
                            <p className="text-xs text-on-surface-variant mt-1">{getPercent(stressRingan)}% dari total</p>
                        </div>
                    </div>

                    {/* Tidak Terdeteksi */}
                    <div className="bg-surface-container-highest border border-outline-variant/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Tidak Stres</span>
                            <div className="p-2 bg-blue-900/20 text-blue-300 rounded-xl">
                                <CheckCircle2 size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-on-surface">{tidakTerdeteksi}</h3>
                            <p className="text-xs text-on-surface-variant mt-1">{getPercent(tidakTerdeteksi)}% dari total</p>
                        </div>
                    </div>
                </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Visualisasi Distribusi */}
                    <div className="bg-surface-container rounded-3xl p-6 shadow-sm flex flex-col justify-between border border-outline-variant/20">
                        <div>
                            <h2 className="text-lg font-bold text-on-surface mb-1">Distribusi Tingkat Stres</h2>
                            <p className="text-xs text-on-surface-variant mb-6">Persentase tingkat stres keseluruhan mahasiswa.</p>
                            
                                <div className="space-y-4">
                                {/* Stres Berat */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-red-600">Stres Berat</span>
                                        <span className="text-slate-600">{stressBerat} Mhs ({getPercent(stressBerat)}%)</span>
                                    </div>
                                    <div className="h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-red-500 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercent(stressBerat)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Stres Sedang */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-amber-600">Stres Sedang</span>
                                        <span className="text-slate-600">{stressSedang} Mhs ({getPercent(stressSedang)}%)</span>
                                    </div>
                                    <div className="h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-amber-500 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercent(stressSedang)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Stres Ringan */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-emerald-600">Stres Ringan</span>
                                        <span className="text-slate-600">{stressRingan} Mhs ({getPercent(stressRingan)}%)</span>
                                    </div>
                                    <div className="h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercent(stressRingan)}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Tidak Terdeteksi */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-blue-600">Tidak Terdeteksi</span>
                                        <span className="text-slate-600">{tidakTerdeteksi} Mhs ({getPercent(tidakTerdeteksi)}%)</span>
                                    </div>
                                    <div className="h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercent(tidakTerdeteksi)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-outline-variant/10 pt-6 mt-6 bg-surface-container/60 -mx-6 -mb-6 p-6 rounded-b-3xl">
                            <p className="text-xs text-on-surface-variant leading-relaxed text-center">
                                Metode Forward Chaining mencocokkan gejala klinis/fokus/sosial untuk menghasilkan klasifikasi tingkat stres.
                            </p>
                        </div>
                    </div>

                    {/* Tabel Riwayat Diagnosis */}
                    <div className="lg:col-span-2 bg-surface-container border border-outline-variant/20 rounded-3xl p-6 shadow-sm flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-on-surface mb-1">Riwayat Aktivitas</h2>
                                <p className="text-xs text-on-surface-variant">Diagnosis stres mahasiswa terbaru.</p>
                            </div>
                            <div className="relative">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                                <input
                                    type="text"
                                    placeholder="Cari nama/tingkat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-surface-container-highest border border-outline-variant/20 focus:border-primary focus:outline-none rounded-xl text-xs w-full sm:w-48 transition text-on-surface"
                                />
                            </div>
                        </div>

                        <div className="flex-grow overflow-x-auto">
                            {filteredDiagnosis.length === 0 ? (
                                <div className="text-center py-12 text-on-surface-variant">
                                    <FileText size={40} className="mx-auto mb-2 opacity-40 text-on-surface-variant" />
                                    <p className="text-sm">Tidak ada riwayat aktivitas ditemukan.</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-outline-variant text-sm">
                                    <thead>
                                        <tr className="text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                                            <th className="pb-3 pr-2">Mahasiswa</th>
                                            <th className="pb-3 px-2">Tanggal</th>
                                            <th className="pb-3 px-2">Tingkat Stres</th>
                                            <th className="pb-3 pl-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant text-sm">
                                        {filteredDiagnosis.map((item) => {
                                            let badgeStyle = "bg-surface-container text-on-surface-variant border-outline-variant/10";
                                            if (item.stressLevel === "Stres Berat") {
                                                badgeStyle = "bg-red-900/20 text-red-300 border-red-800/20";
                                            } else if (item.stressLevel === "Stres Sedang") {
                                                badgeStyle = "bg-amber-900/20 text-amber-300 border-amber-800/20";
                                            } else if (item.stressLevel === "Stres Ringan") {
                                                badgeStyle = "bg-emerald-900/20 text-emerald-300 border-emerald-800/20";
                                            } else if (item.stressLevel === "Tidak Terdeteksi Stres Signifikan") {
                                                badgeStyle = "bg-blue-900/20 text-blue-300 border-blue-800/20";
                                            }

                                            return (
                                                <tr key={item.id} className="hover:bg-surface-container/40 transition">
                                                    <td className="py-3 pr-2">
                                                        <div className="font-semibold text-on-surface">
                                                            {item.student?.name || "Anonim"}
                                                        </div>
                                                        <div className="text-xs text-on-surface-variant">
                                                            Proyek: {item.student?.project || "-"}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-2 text-xs text-on-surface-variant whitespace-nowrap">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={12} />
                                                            {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric"
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-2 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-0.5 border text-xs font-semibold rounded-full ${badgeStyle}`}>
                                                            {item.stressLevel === "Tidak Terdeteksi Stres Signifikan" 
                                                                ? "Tidak Stres" 
                                                                : item.stressLevel}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 pl-2 text-right">
                                                        <button
                                                            onClick={() => navigate(`/result/${item.id}`)}
                                                            className="text-primary hover:text-primary/80 font-semibold text-xs inline-flex items-center gap-0.5 hover:underline"
                                                        >
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
