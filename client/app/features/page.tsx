"use client";

import Link from "next/link";
import { 
  BarChart3, 
  Bell, 
  MapPin, 
  ShieldCheck, 
  ThumbsUp, 
  Wand2,
  ArrowLeft,
  Sparkles
} from "lucide-react";

const cards = [
  { 
    title: "Precision Reporting", 
    icon: MapPin, 
    desc: "Attach high-resolution photos and pinpoint issues with automatic GPS or manual manual verification.",
    color: "from-blue-600 to-indigo-600"
  },
  { 
    title: "Live Status Ecosystem", 
    icon: Bell, 
    desc: "A completely transparent lifecycle for every report: Pending → Verification → In-Progress → Resolved.",
    color: "from-teal-500 to-emerald-500"
  },
  { 
    title: "Community Intelligence", 
    icon: ThumbsUp, 
    desc: "Democratic upvoting system allows citizens to highlight the most critical neighborhod problems.",
    color: "from-orange-500 to-amber-500"
  },
  { 
    title: "Advanced Analytics", 
    icon: BarChart3, 
    desc: "Interactive dashboards reveal city-wide trends, response times, and resolve performance metrics.",
    color: "from-purple-600 to-fuchsia-600"
  },
  { 
    title: "Secure Operations", 
    icon: ShieldCheck, 
    desc: "Enterprise-grade JWT session management and Role-Based Access Control (RBAC) for all users.",
    color: "from-slate-700 to-slate-900"
  },
  { 
    title: "AI & Smart Logic", 
    icon: Wand2, 
    desc: "Optimized backend architecture ready for automated issue categorization and priority routing.",
    color: "from-pink-500 to-rose-500"
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-lg font-bold transition hover:rotate-6">
              🌍
            </span>
            <div className="leading-tight">
              <div className="font-bold text-slate-900 dark:text-white">Smart Civic</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Features Showcase</div>
            </div>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl transition hover:bg-blue-100">
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="bg-slate-900 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl mb-16">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-purple-600/10" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="size-16 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-8">
              <Sparkles className="size-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
              Modern Tech for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Better Governance</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              A high-performance platform designed to bridge the gap between citizens and city authorities.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="group relative bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className={`size-16 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-lg mb-8 transition-transform group-hover:scale-110`}>
                <c.icon className="size-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{c.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-20">
          <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[40px] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Scalable Architecture</h2>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                Built with a modern stack—Next.js, Node.js, and Prisma—our platform is designed to handle thousands of reports across multiple city wards without compromising on speed or security.
              </p>
            </div>
            <Link href="/auth/citizen/signup" className="flex-shrink-0 px-8 py-5 bg-blue-600 text-white font-bold rounded-2xl shadow-xl transition hover:bg-blue-700 hover:scale-105 active:scale-100">
              Start Using Today
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 mt-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="font-bold text-slate-400 uppercase tracking-widest">Smart Civic Tech Showcase</div>
          <div className="flex gap-8 font-bold text-slate-500">
            <Link href="/how-it-works" className="hover:text-blue-600 transition-colors">Documentation</Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

