"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { http } from "@/services/http";
import { IdCard } from "lucide-react";

export default function CitizenProfilePage() {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    http.get("/api/users/me").then((r) => {
      setForm({
        name: r.data.user.name || "",
        phone: r.data.user.phone || "",
        address: r.data.user.address || ""
      });
      setLoading(false);
    });
  }, []);

  async function save() {
    setLoading(true);
    await http.patch("/api/users/me", form);
    setLoading(false);
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-green/15 to-brand-teal/10">
            <IdCard className="size-4" />
          </span>
          Profile
        </div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Update your details and contact info.</div>
      </div>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-200">Name</div>
            <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </div>
          <div>
            <div className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-200">Phone</div>
            <Input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <div className="mb-2 text-xs font-medium text-slate-700 dark:text-slate-200">Address</div>
            <Input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
          </div>
        </div>
        <div className="mt-6">
          <Button disabled={loading} onClick={save}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

