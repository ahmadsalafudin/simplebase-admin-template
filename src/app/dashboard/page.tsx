"use client";

import PageShell from "@/components/PageShell";
import StatCard from "@/components/StatCard";
import { revenueSeries, requestsSeries, users } from "@/lib/data";
import { avatarUrl } from "@/lib/avatar";
import { DollarSign, Users2, Activity, Database, ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TooltipPayloadItem {
  dataKey: string;
  name: string;
  value: number | string;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-input border border-charcoal bg-ash px-16 py-8">
      <p className="text-caption text-smoke mb-8">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-body-sm text-snow">
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <PageShell title="Dashboard" subtitle="Overview of your workspace activity">
      <div className="flex flex-col gap-24">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
          <StatCard label="Revenue (MTD)" value="$27,100" delta="+14.2%" icon={DollarSign} />
          <StatCard label="Active users" value="1,622" delta="+8.4%" icon={Users2} />
          <StatCard label="API requests" value="34.7k" delta="+2.1%" icon={Activity} />
          <StatCard label="Storage used" value="182 GB" delta="72% of plan" positive={false} icon={Database} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="card lg:col-span-2 flex flex-col gap-24">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-subheading text-snow">Revenue</h2>
                <p className="text-caption text-smoke">Last 8 months</p>
              </div>
              <span className="pill-tag">
                <ArrowUpRight size={12} className="text-phosphor-green" />
                +14.2% vs prior period
              </span>
            </div>
            <div className="h-[260px] -ml-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueSeries} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3ecf8e" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#3ecf8e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#2e2e2e" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#898989", fontSize: 12 }}
                    axisLine={{ stroke: "#2e2e2e" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#898989", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#393939" }} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#3ecf8e"
                    strokeWidth={2}
                    fill="url(#revenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card flex flex-col gap-24">
            <div>
              <h2 className="text-subheading text-snow">Requests</h2>
              <p className="text-caption text-smoke">This week</p>
            </div>
            <div className="h-[260px] -ml-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={requestsSeries} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                  <CartesianGrid vertical={false} stroke="#2e2e2e" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#898989", fontSize: 12 }}
                    axisLine={{ stroke: "#2e2e2e" }}
                    tickLine={false}
                  />
                  <YAxis tick={{ fill: "#898989", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="requests" name="Requests" fill="#3ecf8e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom row: recent users + project health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="card lg:col-span-2 flex flex-col gap-24">
            <div className="flex items-center justify-between">
              <h2 className="text-subheading text-snow">Recent members</h2>
              <a href="/users" className="text-caption text-mint-pulse hover:underline">
                View all
              </a>
            </div>
            <div className="flex flex-col">
              {users.slice(0, 5).map((u, i) => (
                <div
                  key={u.id}
                  className={`flex items-center justify-between py-16 ${
                    i !== 4 ? "border-b border-charcoal" : ""
                  }`}
                >
                  <div className="flex items-center gap-16 min-w-0">
                    <div className="h-32 w-32 rounded-full shrink-0 overflow-hidden">
                      <img
                        src={avatarUrl(u.email)}
                        alt={u.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-body-sm text-snow truncate">{u.name}</p>
                      <p className="text-caption text-smoke truncate">{u.email}</p>
                    </div>
                  </div>
                  <span className="pill-tag shrink-0">{u.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card flex flex-col gap-24">
            <h2 className="text-subheading text-snow">Project health</h2>
            <div className="flex flex-col gap-16">
              {[
                { name: "Database", value: 92 },
                { name: "Auth", value: 100 },
                { name: "Storage", value: 72 },
                { name: "Edge functions", value: 84 },
              ].map((row) => (
                <div key={row.name} className="flex flex-col gap-8">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm text-silver-mist">{row.name}</span>
                    <span className="text-caption text-smoke">{row.value}%</span>
                  </div>
                  <div className="h-8 rounded-tag bg-ash overflow-hidden">
                    <div
                      className="h-full rounded-tag bg-phosphor-green"
                      style={{ width: `${row.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
