import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Brain, LayoutDashboard, HeartPulse } from "lucide-react";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Mendeteksi posisi scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed z-50 transition-all duration-300 ease-in-out left-1/2 -translate-x-1/2 ${
                isScrolled
                    ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-surface/80 backdrop-blur-md border border-outline-variant/30 shadow-2xl px-6 py-3"
                    : "top-0 w-full rounded-none bg-surface border-b border-outline-variant/30 px-6 sm:px-8 py-4"
            }`}
        >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <NavLink 
                    to="/" 
                    className="flex items-center gap-2.5 group"
                >
                    <div className="bg-primary-container text-on-primary-container p-2 rounded-2xl shadow-md shadow-primary-container/10 group-hover:scale-105 transition duration-300">
                        <HeartPulse size={22} className="animate-pulse" />
                    </div>
                    <span className="font-bold text-xl text-on-surface tracking-tight">
                        StressCare <span className="text-primary">System</span>
                    </span>
                </NavLink>

                <nav className="flex items-center gap-2">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
                                isActive
                                    ? "bg-surface-container/60 text-on-surface"
                                    : "text-on-surface-variant hover:bg-surface-container/50 hover:text-on-surface"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/diagnosis"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-full text-sm font-medium transition duration-200 flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-primary text-on-primary shadow-md shadow-primary/10"
                                    : "text-on-surface-variant hover:bg-surface-container/50 hover:text-on-surface"
                            }`
                        }
                    >
                        <Brain size={16} />
                        Diagnosis
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-full text-sm font-medium transition duration-200 flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-surface-container-highest text-on-surface border border-outline-variant/20"
                                    : "text-on-surface-variant hover:bg-surface-container/50 hover:text-on-surface"
                            }`
                        }
                    >
                        <LayoutDashboard size={16} />
                        Dashboard
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;