"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  BarChart3, 
  Bell, 
  ChevronDown, 
  MapPin, 
  ShieldCheck, 
  ThumbsUp, 
  Sparkles, 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Users,
  AlertCircle,
  Lightbulb,
  Wrench
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const stats = [
  { label: "Total Complaints", value: "1,245", color: "text-amber-500", bg: "bg-amber-50", icon: AlertCircle, accent: "border-amber-100" },
  { label: "Issues Resolved", value: "980", color: "text-green-500", bg: "bg-green-50", icon: CheckCircle2, accent: "border-green-100" },
  { label: "In Progress", value: "215", color: "text-blue-500", bg: "bg-blue-50", icon: Clock, accent: "border-blue-100" },
  { label: "Active Users", value: "3,450", color: "text-indigo-600", bg: "bg-indigo-50", icon: Users, accent: "border-indigo-100" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="absolute top-0 w-full z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
              🌍
            </span>
            <div className="leading-tight">
              <div className="font-bold text-white shadow-sm">Smart Civic</div>
              <div className="text-[10px] text-white/80 uppercase tracking-wider font-medium">Issue Reporting Platform</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a className="text-white/90 hover:text-white transition-colors" href="#features">Features</a>
            <Link className="text-white/90 hover:text-white transition-colors" href="/how-it-works">How it works</Link>
            <a className="text-white/90 hover:text-white transition-colors" href="#contact">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle compact />
            <Link
              href="/auth/citizen/login"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md transition hover:bg-white/20"
            >
              Citizen Login
            </Link>
            <Link
              href="/auth/admin/login"
              className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-lg transition hover:bg-slate-100"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
          {/* Background with blurred city effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920&blur=10")',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/20 to-slate-50 dark:to-slate-950" />
          
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
              Report Civic Issues Easily
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto drop-shadow-sm">
              Help us improve your city by reporting problems quickly
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Explore Features Button (Purple/Indigo) */}
              <Link href="/features" className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)] transition-all hover:scale-105 active:scale-100">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Sparkles className="size-6 text-white" />
                </div>
                <span>Explore Features</span>
              </Link>

              {/* Report Issue Button (Blue) */}
              <Link href="/report" className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full text-white font-bold text-lg shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all hover:scale-105 active:scale-100">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <ClipboardList className="size-6 text-white" />
                </div>
                <span>Report an Issue</span>
              </Link>
            </div>
          </div>
        </section>

        {/* STATISTICS DASHBOARD SECTION */}
        <section className="relative z-20 -mt-20 mx-auto max-w-6xl px-4">
          <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-200/60 dark:border-slate-800/60">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Map Illustration (Left) */}
              <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 h-64 lg:h-auto min-h-[320px] bg-slate-50">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-90 scale-105"
                  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800")' }}
                />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
                
                {/* Decorative Map Pins with matching icons from image */}
                <div className="absolute top-[20%] left-[15%] group">
                  <div className="relative flex flex-col items-center">
                    <div className="p-2 bg-orange-500 rounded-full shadow-lg border-2 border-white text-white z-10 transition-transform group-hover:scale-110">
                      <Lightbulb className="size-5 fill-current" />
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-orange-500 -mt-1 shadow-md" />
                  </div>
                </div>

                <div className="absolute top-[15%] right-[25%] group">
                  <div className="relative flex flex-col items-center">
                    <div className="p-2 bg-red-600 rounded-full shadow-lg border-2 border-white text-white z-10 transition-transform group-hover:scale-110">
                      <AlertCircle className="size-5 fill-current" />
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-red-600 -mt-1 shadow-md" />
                  </div>
                </div>

                <div className="absolute top-[45%] left-[30%] group">
                  <div className="relative flex flex-col items-center">
                    <div className="p-2 bg-emerald-700 rounded-full shadow-lg border-2 border-white text-white z-10 transition-transform group-hover:scale-110">
                      <Wrench className="size-5" />
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-emerald-700 -mt-1 shadow-md" />
                  </div>
                </div>

                <div className="absolute bottom-[20%] right-[15%] group">
                   <div className="relative flex flex-col items-center">
                    <div className="p-2 bg-lime-500 rounded-full shadow-lg border-2 border-white text-white z-10 transition-transform group-hover:scale-110">
                      <CheckCircle2 className="size-5 fill-current" />
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-lime-500 -mt-1 shadow-md" />
                  </div>
                </div>

                <div className="absolute bottom-[15%] left-[10%] group">
                   <div className="relative flex flex-col items-center">
                    <div className="p-2 bg-teal-600 rounded-full shadow-lg border-2 border-white text-white z-10 transition-transform group-hover:scale-110">
                      <CheckCircle2 className="size-5 fill-current" />
                    </div>
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-teal-600 -mt-1 shadow-md" />
                  </div>
                </div>
              </div>

              {/* Stats Cards (Right) */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {stats.map((it) => (
                  <div key={it.label} className={`relative bg-white dark:bg-slate-800/50 p-6 rounded-2xl border-t-[6px] ${it.accent.replace('border-', 'border-t-')} shadow-sm transition-all hover:shadow-md overflow-hidden`}>
                    <div className="flex items-center gap-4">
                      <div className={`p-3.5 rounded-full ${it.bg} ${it.color} shadow-sm dark:bg-opacity-20`}>
                        <it.icon className="size-7" />
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {it.label}
                      </div>
                    </div>
                    <div className="mt-6 flex items-end justify-between">
                      <div className={`text-4xl font-black ${it.color} tracking-tighter`}>
                        {it.value}
                      </div>
                      {/* Bottom right accent checkmark icon */}
                      <div className={`absolute -bottom-2 -right-2 p-4 rounded-tl-[24px] ${it.bg} opacity-30 dark:opacity-10`}>
                        <CheckCircle2 className={`size-6 ${it.color}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">Platform Features</h2>
            <div className="mt-4 h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
            <p className="mt-6 text-slate-600 dark:text-slate-400 font-medium text-lg">
              Everything you need to report and resolve civic problems in real-time.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Smart Reporting", desc: "Upload photos, AI-detected descriptions, and GPS locations in seconds.", icon: ClipboardList, color: "blue" },
              { title: "Real-time Tracking", desc: "Monitor your report's status via a live dashboard from pending to resolved.", icon: Clock, color: "emerald" },
              { title: "Civic Priority", desc: "Community upvoting helps authorities prioritize the most urgent issues first.", icon: ThumbsUp, color: "orange" },
            ].map((f) => (
              <div key={f.title} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                <div className={`size-14 rounded-2xl bg-${f.color}-50 dark:bg-${f.color}-900/20 flex items-center justify-center text-${f.color}-600 dark:text-${f.color}-400 mb-6`}>
                  <f.icon className="size-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section id="contact" className="mx-auto max-w-6xl px-4 pb-24">
          <div className="relative overflow-hidden rounded-[40px] bg-slate-900 p-12 text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-black text-white sm:text-4xl">Make a difference in your community</h2>
              <p className="mt-4 text-slate-400 text-lg">Join thousands of citizens using Smart Civic to build a better future together.</p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/auth/citizen/signup" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg transition hover:bg-slate-100">
                  Join as Citizen
                </Link>
                <Link href="/auth/admin/login" className="px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl border border-white/10 transition hover:bg-slate-750">
                  Authority Access
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-900">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white font-bold text-sm">S</span>
            <span className="font-bold text-slate-900 dark:text-white">Smart Civic</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link href="/how-it-works" className="hover:text-blue-600">Documentation</Link>
            <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
          </div>
          <div className="text-xs text-slate-400">
            © {new Date().getFullYear()} Smart Civic Platform.
          </div>
        </div>
      </footer>
    </div>
  );
}

