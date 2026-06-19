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
        <div className="min-h-screen bg-slate-50/50 pb-16">
            <div className="max-w-6xl mx-auto px-6 pt-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Ringkasan</h1>
                        <p className="text-slate-500 text-sm mt-1">
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
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Data</span>
                            <div className="p-2 bg-slate-50 text-slate-600 rounded-xl">
                                <Users size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-800">{totalDiagnosis}</h3>
                            <p className="text-xs text-slate-400 mt-1">Diagnosis dilakukan</p>
                        </div>
                    </div>

                    {/* Stres Berat */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-red-100 transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">Stres Berat</span>
                            <div className="p-2 bg-red-50 text-red-500 rounded-xl">
                                <AlertTriangle size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-800">{stressBerat}</h3>
                            <p className="text-xs text-slate-400 mt-1">{getPercent(stressBerat)}% dari total</p>
                        </div>
                    </div>

                    {/* Stres Sedang */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-100 transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Stres Sedang</span>
                            <div className="p-2 bg-amber-50 text-amber-500 rounded-xl">
                                <AlertCircle size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-800">{stressSedang}</h3>
                            <p className="text-xs text-slate-400 mt-1">{getPercent(stressSedang)}% dari total</p>
                        </div>
                    </div>

                    {/* Stres Ringan */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-100 transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Stres Ringan</span>
                            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
                                <CheckCircle2 size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-800">{stressRingan}</h3>
                            <p className="text-xs text-slate-400 mt-1">{getPercent(stressRingan)}% dari total</p>
                        </div>
                    </div>

                    {/* Tidak Terdeteksi */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 transition duration-300">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Tidak Stres</span>
                            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl">
                                <CheckCircle2 size={18} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-3xl font-bold text-slate-800">{tidakTerdeteksi}</h3>
                            <p className="text-xs text-slate-400 mt-1">{getPercent(tidakTerdeteksi)}% dari total</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Visualisasi Distribusi */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 mb-1">Distribusi Tingkat Stres</h2>
                            <p className="text-xs text-slate-400 mb-6">Persentase tingkat stres keseluruhan mahasiswa.</p>
                            
                            <div className="space-y-4">
                                {/* Stres Berat */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-red-600">Stres Berat</span>
                                        <span className="text-slate-600">{stressBerat} Mhs ({getPercent(stressBerat)}%)</span>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
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
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
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
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
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
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                            style={{ width: `${getPercent(tidakTerdeteksi)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-6 mt-6 bg-emerald-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                            <p className="text-xs text-slate-500 leading-relaxed text-center">
                                Metode Forward Chaining mencocokkan gejala klinis/fokus/sosial untuk menghasilkan klasifikasi tingkat stres.
                            </p>
                        </div>
                    </div>

                    {/* Tabel Riwayat Diagnosis */}
                    <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800 mb-1">Riwayat Aktivitas</h2>
                                <p className="text-xs text-slate-400">Diagnosis stres mahasiswa terbaru.</p>
                            </div>
                            <div className="relative">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Cari nama/tingkat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:outline-none rounded-xl text-xs w-full sm:w-48 transition"
                                />
                            </div>
                        </div>

                        <div className="flex-grow overflow-x-auto">
                            {filteredDiagnosis.length === 0 ? (
                                <div className="text-center py-12 text-slate-400">
                                    <FileText size={40} className="mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Tidak ada riwayat aktivitas ditemukan.</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-slate-100">
                                    <thead>
                                        <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            <th className="pb-3 pr-2">Mahasiswa</th>
                                            <th className="pb-3 px-2">Tanggal</th>
                                            <th className="pb-3 px-2">Tingkat Stres</th>
                                            <th className="pb-3 pl-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm">
                                        {filteredDiagnosis.map((item) => {
                                            let badgeStyle = "bg-slate-50 text-slate-600 border-slate-100";
                                            if (item.stressLevel === "Stres Berat") {
                                                badgeStyle = "bg-red-50 text-red-700 border-red-100";
                                            } else if (item.stressLevel === "Stres Sedang") {
                                                badgeStyle = "bg-amber-50 text-amber-700 border-amber-100";
                                            } else if (item.stressLevel === "Stres Ringan") {
                                                badgeStyle = "bg-emerald-50 text-emerald-700 border-emerald-100";
                                            } else if (item.stressLevel === "Tidak Terdeteksi Stres Signifikan") {
                                                badgeStyle = "bg-blue-50 text-blue-700 border-blue-100";
                                            }

                                            return (
                                                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                                                    <td className="py-3 pr-2">
                                                        <div className="font-semibold text-slate-800">
                                                            {item.student?.name || "Anonim"}
                                                        </div>
                                                        <div className="text-xs text-slate-400">
                                                            Proyek: {item.student?.project || "-"}
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-2 text-xs text-slate-500 whitespace-nowrap">
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
                                                            className="text-emerald-600 hover:text-emerald-700 font-semibold text-xs inline-flex items-center gap-0.5 hover:underline"
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
