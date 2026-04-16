"use client";

import Link from "next/link";
import { ArrowRight, Bell, ClipboardList, MapPinned, ShieldCheck, Sparkles, Wrench } from "lucide-react";

const steps = [
  {
    title: "Create an account / Login",
    desc: "Sign in as a citizen to report issues or as an authority to manage city operations.",
    icon: ShieldCheck,
    accent: "from-blue-500 to-indigo-500",
    lightAccent: "bg-blue-50 text-blue-600"
  },
  {
    title: "Report the issue",
    desc: "Fill in details, add photos, and manually enter location for accurate verification.",
    icon: ClipboardList,
    accent: "from-teal-500 to-emerald-500",
    lightAccent: "bg-teal-50 text-teal-600"
  },
  {
    title: "Track on the map",
    desc: "All issues appear on a live map with clear color coding per status.",
    icon: MapPinned,
    accent: "from-indigo-500 to-purple-500",
    lightAccent: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Authorities take action",
    desc: "Admins review, assign, update status, and close issues with transparent progress.",
    icon: Wrench,
    accent: "from-orange-500 to-amber-500",
    lightAccent: "bg-orange-50 text-orange-600"
  },
  {
    title: "Notifications & closure",
    desc: "Get updates when the status changes and confirm when the issue is solved.",
    icon: Bell,
    accent: "from-green-500 to-emerald-500",
    lightAccent: "bg-green-50 text-green-600"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-lg font-bold">
              🌍
            </span>
            <div className="leading-tight">
              <div className="font-bold text-slate-900 dark:text-white">Smart Civic</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">How It Works</div>
            </div>
          </Link>

          <div className="flex items-center gap-3">
             <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Back to Home</Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-blue-700"
            >
              Report Issue <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="bg-white dark:bg-slate-900 rounded-[40px] p-10 md:p-16 shadow-xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-6 uppercase tracking-wider">
            <Sparkles className="size-3.5" />
            Step‑by‑step Workflow
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white max-w-3xl mx-auto leading-[1.1]">
            How Smart Civic transforms city management
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            A transparent and efficient cycle for citizens and authorities to work together for a better city.
          </p>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <div key={s.title} className="group flex flex-col bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center justify-between mb-8">
                <div className={`size-14 rounded-2xl bg-gradient-to-br ${s.accent} flex items-center justify-center text-white shadow-lg`}>
                  <s.icon className="size-7" />
                </div>
                <div className="text-4xl font-black text-slate-100 dark:text-slate-800 group-hover:text-slate-200 dark:group-hover:text-slate-700 transition-colors">
                  0{idx + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">{s.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">{s.desc}</p>
            </div>
          ))}
          
          {/* Summary Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[32px] text-white flex flex-col justify-center items-center text-center shadow-2xl">
            <div className="size-16 rounded-full bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
              <CheckCircle2 className="size-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ready to contribute?</h3>
            <p className="text-slate-400 text-sm mb-6">Join your neighbors in creating a smarter, cleaner city.</p>
            <Link href="/auth/citizen/signup" className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl shadow-lg transition hover:bg-slate-100">
              Sign Up Now
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
           <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Citizen Portal</h2>
             <div className="space-y-4">
               {[
                 "Report issues with photos and automatic GPS coordinates.",
                 "Provide precise location details manually if needed.",
                 "Track real-time status from pending to verification to fix.",
                 "Receive notifications when authorities take action."
               ].map((text, i) => (
                 <div key={i} className="flex gap-4 items-start">
                   <div className="mt-1.5 size-2 rounded-full bg-blue-600 flex-shrink-0" />
                   <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{text}</p>
                 </div>
               ))}
             </div>
           </div>

           <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Admin Dashboard</h2>
             <div className="space-y-4">
               {[
                 "Review and verify citizen reports for authenticity.",
                 "Assign issues to departments and set priority levels.",
                 "Update report statuses as work progresses in the field.",
                 "Access city-wide heatmaps and performance analytics."
               ].map((text, i) => (
                 <div key={i} className="flex gap-4 items-start">
                   <div className="mt-1.5 size-2 rounded-full bg-emerald-500 flex-shrink-0" />
                   <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{text}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 mt-12 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-bold text-slate-400 text-sm">© Smart Civic Documentation.</div>
          <Link href="/" className="text-blue-600 font-bold text-sm hover:underline">Back to Main Platform</Link>
        </div>
      </footer>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react";

