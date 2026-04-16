"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { http } from "@/services/http";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, PieChartIcon, TrendingUp } from "lucide-react";

export default function AdminAnalyticsPage() {
  const [trends, setTrends] = useState<any>(null);

  useEffect(() => {
    http.get("/api/admin/trends").then((r) => setTrends(r.data));
  }, []);

  const categoryData = useMemo(() => {
    return (trends?.byCategory || []).map((x: any, i: number) => ({
      category: String(x._id || "unknown").replaceAll("_", " ").toUpperCase(),
      count: x.count,
      color: ['#14B8A6', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'][i % 5]
    }));
  }, [trends]);

  const statusData = useMemo(() => {
    return (trends?.byStatus || []).map((x: any, i: number) => ({
      name: String(x._id || "unknown").replaceAll("_", " "),
      value: x.count,
      color: ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#64748b'][i % 6]
    }));
  }, [trends]);

  const monthData = useMemo(() => {
    return (trends?.byMonth || []).map((x: any) => {
      const d = new Date(x._id.y, x._id.m - 1);
      return { 
        name: d.toLocaleString('default', { month: 'short', year: '2-digit' }), 
        count: x.count 
      };
    });
  }, [trends]);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-brand-teal/15 to-brand-green/10">
            <BarChart3 className="size-4" />
          </span>
          Analytics
        </div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">Category trends and report distribution.</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400">
            <BarChart3 className="size-4" /> Category Breakdown
          </div>
          <div className="mt-4 h-80">
            {categoryData.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-slate-500">No data</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="category" width={110} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {categoryData.map((e: any, i: number) => (
                      <Cell key={`cell-${i}`} fill={e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400">
            <PieChartIcon className="size-4" /> Status Distribution
          </div>
          <div className="mt-4 h-80">
            {statusData.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-slate-500">No data</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} stroke="none" label>
                    {statusData.map((e: any, i: number) => (
                      <Cell key={`cell-${i}`} fill={e.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <TrendingUp className="size-4" /> Monthly Reporting Trends
          </div>
          <div className="mt-4 h-72">
            {monthData.length === 0 ? (
              <div className="grid h-full place-items-center text-sm text-slate-500">No data</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

