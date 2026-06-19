import { NavLink } from "react-router-dom";
import { Brain, LayoutDashboard, HeartPulse } from "lucide-react";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-slate-200/80 px-6 py-4">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <NavLink 
                    to="/" 
                    className="flex items-center gap-2.5 group"
                >
                    <div className="bg-emerald-500 text-white p-2 rounded-2xl shadow-md shadow-emerald-500/10 group-hover:scale-105 transition duration-300">
                        <HeartPulse size={22} className="animate-pulse" />
                    </div>
                    <span className="font-bold text-xl text-slate-800 tracking-tight">
                        StressCare <span className="text-emerald-500">System</span>
                    </span>
                </NavLink>

                <nav className="flex items-center gap-2">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-xl text-sm font-medium transition duration-200 ${
                                isActive
                                    ? "bg-slate-100 text-slate-800"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/diagnosis"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-xl text-sm font-medium transition duration-200 flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/10"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                            }`
                        }
                    >
                        <Brain size={16} />
                        Diagnosis
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `px-4 py-2 rounded-xl text-sm font-medium transition duration-200 flex items-center gap-1.5 ${
                                isActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
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
