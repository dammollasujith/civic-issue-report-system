"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Card } from "@/components/ui/Card";
import { http } from "@/services/http";
import { env } from "@/lib/env";
import { Button } from "@/components/ui/Button";
import { BellRing } from "lucide-react";

type Notification = {
  _id?: string;
  id?: string;
  title: string;
  message: string;
  createdAt?: string;
  readAt?: string;
};

export default function CitizenNotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState<number>(0);

  useEffect(() => {
    http.get("/api/notifications?limit=50").then((r) => {
      setItems(r.data.items || []);
      setUnread(r.data.unread || 0);
    });
  }, []);

  useEffect(() => {
    let socket: Socket | null = null;
    let cancelled = false;

    async function start() {
      try {
        const me = await http.get("/api/auth/me");
        if (cancelled) return;
        socket = io(env.socketUrl, { withCredentials: true });
        socket.on("connect", () => socket?.emit("auth", { userId: me.data.user.id }));
        socket.on("notification", (n: Notification) => {
          setItems((prev) => [n, ...prev]);
          setUnread((u) => u + 1);
        });
      } catch {
        // ignore
      }
    }
    start();

    return () => {
      cancelled = true;
      socket?.disconnect();
    };
  }, []);

  async function markAll() {
    await http.post("/api/notifications/read-all");
    setUnread(0);
    setItems((prev) => prev.map((x) => ({ ...x, readAt: x.readAt || new Date().toISOString() })));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
            <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-orange/15 to-brand-purple/10">
              <BellRing className="size-4" />
            </span>
            Notifications
          </div>
          <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Realtime updates for your complaints.</div>
        </div>
        <Button onClick={markAll} variant="secondary" className="whitespace-nowrap">
          Mark all read {unread ? `(${unread})` : ""}
        </Button>
      </div>

      <Card className="p-0">
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {items.map((n, idx) => (
            <div
              key={(n._id || n.id || idx) as any}
              className="bg-white/80 p-5 transition hover:bg-slate-50/60 dark:bg-slate-950/25 dark:hover:bg-slate-900/35"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{n.title}</div>
                  <div className="mt-1 text-sm text-slate-700 dark:text-slate-200">{n.message}</div>
                  {n.createdAt && (
                    <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>
                {!n.readAt && <span className="mt-1 size-2 rounded-full bg-brand-orange" />}
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-600 dark:text-slate-300">No notifications yet.</div>
          )}
        </div>
      </Card>
    </div>
  );
}

