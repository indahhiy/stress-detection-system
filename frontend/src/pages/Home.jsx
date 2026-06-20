import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import asset1 from "../assets/asset1.png";

function Home() {
    const navigate = useNavigate();

    // Animasi saat di-scroll (Intersection Observer)
    useEffect(() => {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("opacity-100", "translate-y-0");
                    entry.target.classList.remove("opacity-0", "translate-y-8");
                }
            });
        }, observerOptions);

        const cards = document.querySelectorAll(".glass-card");
        cards.forEach((card) => {
            card.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-8");
            observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    // Efek klik (Ripple Effect)
    const handleRipple = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.width = "1px";
        ripple.style.height = "1px";
        ripple.style.background = "rgba(255, 255, 255, 0.3)";
        ripple.style.borderRadius = "50%";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.transform = "scale(0)";
        ripple.style.pointerEvents = "none";
        ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out";

        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.transform = "scale(400)";
            ripple.style.opacity = "0";
        });

        setTimeout(() => ripple.remove(), 600);
    };

    return (
        <div className="dark bg-background text-on-background font-body-md antialiased overflow-x-hidden min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-28 px-4 md:px-16">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"></div>
                <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm text-label-sm">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            TEKNOLOGI FORWARD CHAINING
                        </div>
                        <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[1.1] text-on-surface">
                            Deteksi Tingkat <span className="text-primary mint-glow-text">Stres Mahasiswa</span> dalam Proyek Kelompok
                        </h1>
                        <p className="text-on-surface-variant text-lg max-w-xl">
                            Sistem pakar presisi yang dirancang untuk mengidentifikasi beban kognitif dan stres emosional selama kolaborasi akademik menggunakan ekstraksi fakta medis yang akurat.
                        </p>
                        <div className="flex flex-wrap gap-6 pt-4">
                            <button
                                onMouseDown={handleRipple}
                                onClick={() => navigate("/diagnosis")}
                                className="px-8 py-4 bg-primary text-on-primary font-bold rounded-lg mint-glow flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 border-t border-white/20"
                            >
                                Mulai Diagnosis
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                            <button
                                onMouseDown={handleRipple}
                                className="px-8 py-4 bg-white/5 border border-primary/30 text-primary font-bold rounded-lg hover:bg-primary/10 transition-all duration-300 backdrop-blur-md"
                            >
                                Lihat Dashboard
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-5 relative hidden lg:block">
                        <div className="glass-card relative overflow-hidden rounded-[32px] border border-white/10 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.65)]">
                            <img alt="Sistem Monitoring StressCare" className="w-full h-[520px] min-h-[380px] object-cover" src={asset1} />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/95 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="inline-flex items-center gap-3 rounded-full bg-surface-container-highest/90 border border-white/10 px-4 py-3 shadow-xl backdrop-blur-sm">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined text-xl">bolt</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-on-surface-variant">Real-time Analysis</p>
                                        <p className="font-semibold text-on-surface">Precision extraction & insight</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary-container/20 rounded-full blur-[80px]"></div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 px-4 md:px-16 bg-surface-container-lowest/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="text-center space-y-md max-w-2xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">Bagaimana Sistem Bekerja?</h2>
                        <p className="text-on-surface-variant">Alur metodologi sistem pakar kami untuk menjamin keakuratan diagnosa stres Anda.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Step 1 */}
                        <div className="glass-card p-6 rounded-xl flex flex-col gap-4 hover:border-primary transition-all duration-500 group">
                            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                                <span className="material-symbols-outlined">lock</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-primary tracking-widest">01. STEP</span>
                            <h3 className="text-xl font-bold">Anonymous Questions</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Sesi tanya jawab tertutup untuk mengumpulkan data gejala fisik dan psikis tanpa mengungkap identitas personal.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="glass-card p-8 rounded-xl flex flex-col gap-sm hover:border-primary transition-all duration-500 group">
                            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                                <span className="material-symbols-outlined">data_exploration</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-primary tracking-widest">02. STEP</span>
                            <h3 className="text-xl font-bold">Facts Extraction</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Ekstraksi poin-poin krusial dari jawaban Anda ke dalam basis pengetahuan sistem pakar kami secara terstruktur.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="glass-card p-8 rounded-xl flex flex-col gap-sm hover:border-primary transition-all duration-500 group">
                            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                                <span className="material-symbols-outlined">account_tree</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-primary tracking-widest">03. STEP</span>
                            <h3 className="text-xl font-bold">Forward Chaining</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Mesin inferensi memproses fakta yang ada untuk mencapai kesimpulan tingkat stres berdasarkan basis aturan klinis.</p>
                        </div>
                        {/* Step 4 */}
                        <div className="glass-card p-8 rounded-xl flex flex-col gap-sm hover:border-primary transition-all duration-500 group">
                            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                                <span className="material-symbols-outlined">clinical_notes</span>
                            </div>
                            <span className="font-label-sm text-label-sm text-primary tracking-widest">04. STEP</span>
                            <h3 className="text-xl font-bold">Results & Advice</h3>
                            <p className="text-on-surface-variant text-sm leading-relaxed">Laporan komprehensif tingkat stres Anda disertai rekomendasi tindakan medis dan manajemen stres mandiri.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Visualization Section */}
            <section className="py-20 px-4 md:px-16 bg-surface relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12 order-2 lg:order-1">
                        <div className="glass-card p-6 rounded-2xl space-y-6 border-l-4 border-l-primary">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="font-headline-lg text-headline-lg font-bold text-primary">85%</h4>
                                    <p className="text-on-surface-variant">Akurasi Diagnosis</p>
                                </div>
                                <div className="flex gap-1 h-12 items-end">
                                    <div className="w-2 bg-primary/20 h-4 rounded-t"></div>
                                    <div className="w-2 bg-primary/40 h-8 rounded-t"></div>
                                    <div className="w-2 bg-primary h-12 rounded-t pulse-mint"></div>
                                    <div className="w-2 bg-primary/60 h-6 rounded-t"></div>
                                </div>
                            </div>
                            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[85%] mint-glow"></div>
                            </div>
                            <p className="text-sm italic text-on-surface-variant">"Sistem ini membantu saya mengenali burnout sebelum proyek kelompok saya berantakan." - Mahasiswa TI</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-surface-container rounded-xl border border-outline-variant/30">
                                <span className="material-symbols-outlined text-secondary">groups</span>
                                <div className="mt-xs">
                                    <p className="text-xs text-on-surface-variant">Total Diagnosa</p>
                                    <p className="text-xl font-bold">1,240+</p>
                                </div>
                            </div>
                            <div className="p-sm bg-surface-container rounded-xl border border-outline-variant/30">
                                <span className="material-symbols-outlined text-tertiary">verified_user</span>
                                <div className="mt-xs">
                                    <p className="text-xs text-on-surface-variant">Privasi Terjamin</p>
                                    <p className="text-xl font-bold">100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-md">Analisis Berbasis Bukti</h2>
                        <p className="text-on-surface-variant mb-lg">Kami tidak hanya memberikan tebakan. Mesin StressCare memetakan gejala fisik seperti insomnia dan kecemasan ke dalam rule-set pakar yang telah divalidasi oleh praktisi kesehatan mental.</p>
                        <ul className="space-y-sm">
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                <div>
                                    <span className="font-bold block">Integrasi Basis Pengetahuan</span>
                                    <span className="text-sm text-on-surface-variant">Koleksi aturan 'IF-THEN' yang luas mencakup berbagai spektrum stres akademik.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-primary mt-1">check_circle</span>
                                <div>
                                    <span className="font-bold block">Rekomendasi Terpersonalisasi</span>
                                    <span className="text-sm text-on-surface-variant">Saran aktivitas relaksasi yang disesuaikan dengan tingkat keparahan stres Anda.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Team / Footer Section */}
            <section className="py-20 px-4 md:px-16 bg-surface relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-xl">
                    <div className="text-center space-y-md max-w-2xl mx-auto">
                        <h2 className="font-headline-lg text-headline-lg text-on-surface">Tim Pengembang StressCare</h2>
                        <p className="text-on-surface-variant">Mahasiswa berdedikasi di balik pengembangan sistem pakar kesehatan mental ini.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { name: "Andi Pratama", nim: "2100012345", role: "Lead AI Developer", initials: "AP" },
                            { name: "Siti Aminah", nim: "2100012346", role: "UX Researcher", initials: "SA" },
                            { name: "Budi Santoso", nim: "2100012347", role: "Data Analyst", initials: "BS" },
                            { name: "Larasati Putri", nim: "2100012348", role: "Frontend Engineer", initials: "LP" },
                        ].map((member, idx) => (
                            <div key={idx} className="bg-surface-container-low p-6 rounded-[28px] border border-outline-variant/20 hover:border-primary transition-all duration-300 group">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary font-bold text-base shadow-sm">
                                        {member.initials}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.24em] text-primary/70">{member.role}</p>
                                        <h3 className="text-lg font-semibold text-on-surface mt-1">{member.name}</h3>
                                    </div>
                                </div>
                                <p className="text-sm text-on-surface-variant">NIM: {member.nim}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-surface-container-lowest pt-20 pb-24 md:pb-20 px-4 md:px-16 border-t border-outline-variant/20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
                    <div className="col-span-1 md:col-span-2 space-y-md">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
                            <span className="font-headline-lg text-headline-lg font-bold text-primary">StressCare System</span>
                        </div>
                        <p className="text-on-surface-variant max-w-sm">Solusi cerdas untuk kesehatan mental mahasiswa di era kolaborasi digital yang intens. Membantu Anda tetap seimbang di tengah tekanan akademik.</p>
                    </div>
                    <div>
                        <h5 className="font-bold mb-md">Tautan Cepat</h5>
                        <ul className="space-y-xs text-on-surface-variant text-sm">
                            <li><a className="hover:text-primary transition-colors" href="#">Tentang Kami</a></li>
                            <li><button onClick={() => navigate("/diagnosis")} className="hover:text-primary transition-colors">Mulai Diagnosis</button></li>
                            <li><a className="hover:text-primary transition-colors" href="#">Basis Pengetahuan</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold mb-md">Kontak</h5>
                        <ul className="space-y-xs text-on-surface-variant text-sm">
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">mail</span> support@stresscare.edu
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-xs">location_on</span> Health-Tech Lab, University
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-20 pt-12 border-t border-outline-variant/10 text-center text-xs text-on-surface-variant">
                    © 2024 StressCare System. Precision Wellness for Students.
                </div>
            </footer>

            {/* Bottom Navigation Bar (Mobile Only) */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container/80 backdrop-blur-lg border-t border-outline-variant/30 shadow-lg rounded-t-xl">
                <a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-all duration-200" href="#">
                    <span className="material-symbols-outlined">home</span>
                    <span className="font-label-sm text-label-sm">Home</span>
                </a>
                <button onClick={() => navigate("/diagnosis")} className="flex flex-col items-center justify-center text-on-surface-variant transition-all duration-200">
                    <span className="material-symbols-outlined">psychology</span>
                    <span className="font-label-sm text-label-sm">Diagnosis</span>
                </button>
                <a className="flex flex-col items-center justify-center text-on-surface-variant transition-all duration-200" href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="font-label-sm text-label-sm">Dashboard</span>
                </a>
            </nav>
        </div>
    );
}

export default Home;