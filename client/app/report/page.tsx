"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/services/http";

export default function ReportEntryPage() {
  const router = useRouter();

  useEffect(() => {
    async function run() {
      try {
        await http.get("/api/auth/me");
        router.replace("/portal/citizen/report");
      } catch {
        router.replace("/auth/citizen/login");
      }
    }
    run();
  }, [router]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="glass rounded-3xl p-8 shadow-soft">
        <div className="text-sm font-medium text-slate-900">Redirecting…</div>
        <div className="mt-2 text-sm text-slate-600">Taking you to the report form.</div>
      </div>
    </div>
  );
}

