"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { http } from "@/services/http";
import type { MeResponse } from "@/types/core";

export default function PortalIndexPage() {
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const res = await http.get<MeResponse>("/api/auth/me");
        if (cancelled) return;
        const role = res.data.user.role;
        router.replace(role === "admin" ? "/portal/admin" : "/portal/citizen");
      } catch {
        router.replace("/auth/citizen/login");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="glass rounded-3xl p-8 shadow-soft">
        <div className="text-sm font-medium text-slate-900">Loading your portal…</div>
        <div className="mt-2 text-sm text-slate-600">Checking session and role.</div>
      </div>
    </div>
  );
}

