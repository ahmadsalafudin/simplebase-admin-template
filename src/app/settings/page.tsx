"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { useTheme } from "@/components/ThemeProvider";
import { useTableWidth } from "@/components/TableWidthProvider";
import { Trash2, Moon, Sun, Minimize2, Maximize2 } from "lucide-react";

const tabs = ["General", "Notifications", "API keys", "Billing", "Danger zone"];

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`h-24 w-40 rounded-tag border transition-colors relative shrink-0 ${
        on ? "bg-phosphor-green border-phosphor-green" : "bg-ash border-slate"
      }`}
    >
      <span
        className={`absolute top-1/2 -translate-y-1/2 h-18 w-18 rounded-full bg-obsidian transition-all ${
          on ? "left-[19px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [active, setActive] = useState("General");
  const { theme, setTheme } = useTheme();
  const { tableWidth, setTableWidth } = useTableWidth();

  return (
    <PageShell title="Settings" subtitle="Manage workspace preferences and configuration">
      <div className="flex flex-col gap-24">
        <div className="flex items-center gap-8 overflow-x-auto pb-8 border-b border-charcoal">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 rounded-button px-16 py-8 text-body-sm transition-colors ${
                active === tab
                  ? "bg-ash text-snow border border-charcoal"
                  : "text-smoke hover:text-silver-mist"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {active === "General" ? (
          <div className="flex flex-col gap-16 max-w-[640px]">
            <div className="card flex flex-col gap-24">
              <h2 className="text-subheading text-snow">Appearance</h2>
              <p className="text-caption text-smoke -mt-16">
                Choose how the simplebase looks on this device
              </p>
              <div className="grid grid-cols-2 gap-8 sm:gap-16">
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center gap-8 sm:gap-16 rounded-card border p-12 sm:p-24 transition-colors ${
                    theme === "dark"
                      ? "border-phosphor-green bg-obsidian"
                      : "border-charcoal bg-obsidian hover:border-graphite"
                  }`}
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-ash border border-charcoal flex items-center justify-center">
                    <Moon size={18} className="text-phosphor-green" />
                  </div>
                  <div className="hidden sm:flex flex-col items-center gap-4">
                    <span className="text-body-sm text-snow">Dark</span>
                    <span className="text-caption text-smoke text-center">Terminal-style, low glare</span>
                  </div>
                  <div
                    className={`hidden sm:block h-8 w-8 rounded-full border ${
                      theme === "dark" ? "bg-phosphor-green border-phosphor-green" : "border-slate"
                    }`}
                  />
                </button>

                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center gap-8 sm:gap-16 rounded-card border p-12 sm:p-24 transition-colors ${
                    theme === "light"
                      ? "border-phosphor-green bg-obsidian"
                      : "border-charcoal bg-obsidian hover:border-graphite"
                  }`}
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-ash border border-charcoal flex items-center justify-center">
                    <Sun size={18} className="text-phosphor-green" />
                  </div>
                  <div className="hidden sm:flex flex-col items-center gap-4">
                    <span className="text-body-sm text-snow">Light</span>
                    <span className="text-caption text-smoke text-center">Bright, high contrast</span>
                  </div>
                  <div
                    className={`hidden sm:block h-8 w-8 rounded-full border ${
                      theme === "light" ? "bg-phosphor-green border-phosphor-green" : "border-slate"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="card flex flex-col gap-24">
              <h2 className="text-subheading text-snow">Table layout</h2>
              <p className="text-caption text-smoke -mt-16">
                Choose how much horizontal space tables and page content use
              </p>
              <div className="grid grid-cols-2 gap-8 sm:gap-16">
                <button
                  onClick={() => setTableWidth("center")}
                  className={`flex flex-col items-center gap-8 sm:gap-16 rounded-card border p-12 sm:p-24 transition-colors ${
                    tableWidth === "center"
                      ? "border-phosphor-green bg-obsidian"
                      : "border-charcoal bg-obsidian hover:border-graphite"
                  }`}
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-ash border border-charcoal flex items-center justify-center">
                    <Minimize2 size={18} className="text-phosphor-green" />
                  </div>
                  <div className="hidden sm:flex flex-col items-center gap-4">
                    <span className="text-body-sm text-snow">Center</span>
                    <span className="text-caption text-smoke text-center">Boxed content, max 1200px</span>
                  </div>
                  <div
                    className={`hidden sm:block h-8 w-8 rounded-full border ${
                      tableWidth === "center" ? "bg-phosphor-green border-phosphor-green" : "border-slate"
                    }`}
                  />
                </button>

                <button
                  onClick={() => setTableWidth("wide")}
                  className={`flex flex-col items-center gap-8 sm:gap-16 rounded-card border p-12 sm:p-24 transition-colors ${
                    tableWidth === "wide"
                      ? "border-phosphor-green bg-obsidian"
                      : "border-charcoal bg-obsidian hover:border-graphite"
                  }`}
                >
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-ash border border-charcoal flex items-center justify-center">
                    <Maximize2 size={18} className="text-phosphor-green" />
                  </div>
                  <div className="hidden sm:flex flex-col items-center gap-4">
                    <span className="text-body-sm text-snow">Wide</span>
                    <span className="text-caption text-smoke text-center">Tables stretch to fill the screen</span>
                  </div>
                  <div
                    className={`hidden sm:block h-8 w-8 rounded-full border ${
                      tableWidth === "wide" ? "bg-phosphor-green border-phosphor-green" : "border-slate"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="card flex flex-col gap-24">
              <h2 className="text-subheading text-snow">Workspace</h2>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">Workspace name</label>
                <input className="input-field" defaultValue="Rukatek Mandiri" />
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">Workspace URL</label>
                <input className="input-field font-mono text-body-sm" defaultValue="simplebase.dev/rukatek" />
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">Default region</label>
                <select className="input-field">
                  <option>Singapore (ap-southeast-1)</option>
                  <option>Jakarta (ap-southeast-3)</option>
                  <option>Tokyo (ap-northeast-1)</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button className="btn-pill-primary">Save changes</button>
              </div>
            </div>
          </div>
        ) : null}

        {active === "Notifications" ? (
          <div className="card flex flex-col gap-16 max-w-[640px]">
            <h2 className="text-subheading text-snow mb-8">Email notifications</h2>
            {[
              { label: "Product updates", desc: "New features and release notes", on: true },
              { label: "Security alerts", desc: "Suspicious sign-ins and access changes", on: true },
              { label: "Billing reminders", desc: "Upcoming charges and failed payments", on: true },
              { label: "Weekly digest", desc: "A summary of workspace activity", on: false },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between py-8 border-b border-charcoal last:border-0">
                <div>
                  <p className="text-body-sm text-snow">{row.label}</p>
                  <p className="text-caption text-smoke">{row.desc}</p>
                </div>
                <Toggle defaultOn={row.on} />
              </div>
            ))}
          </div>
        ) : null}

        {active === "API keys" ? (
          <div className="card p-0 overflow-hidden max-w-[800px]">
            <div className="flex items-center justify-between px-24 py-16 border-b border-charcoal">
              <h2 className="text-subheading text-snow">API keys</h2>
              <button className="btn-pill-primary !px-16 !py-8">Generate new key</button>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-th">Name</th>
                  <th className="table-th">Key</th>
                  <th className="table-th">Created</th>
                  <th className="table-th"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Production", key: "sk_live_••••••••wf82", created: "Jun 12, 2026" },
                  { name: "Staging", key: "sk_test_••••••••ax19", created: "May 02, 2026" },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="table-td text-snow">{row.name}</td>
                    <td className="table-td font-mono text-caption">{row.key}</td>
                    <td className="table-td">{row.created}</td>
                    <td className="table-td text-right">
                      <button className="text-caption text-smoke hover:text-snow">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {active === "Billing" ? (
          <div className="card flex flex-col gap-16 max-w-[640px]">
            <h2 className="text-subheading text-snow">Current plan</h2>
            <div className="flex items-center justify-between rounded-input border border-charcoal bg-ash px-16 py-16">
              <div>
                <p className="text-body-sm text-snow">Pro — $25/month</p>
                <p className="text-caption text-smoke">Next billing date: Sep 24, 2026</p>
              </div>
              <a href="/purchase" className="btn-pill-ghost !px-16 !py-8">
                Change plan
              </a>
            </div>
            <a href="/receipt" className="text-caption text-mint-pulse hover:underline w-fit">
              View invoice history →
            </a>
          </div>
        ) : null}

        {active === "Danger zone" ? (
          <div className="rounded-card border border-charcoal bg-obsidian p-24 max-w-[640px] flex flex-col gap-16">
            <h2 className="text-subheading text-snow">Danger zone</h2>
            <div className="flex items-center justify-between rounded-input border border-charcoal bg-ash px-16 py-16">
              <div>
                <p className="text-body-sm text-snow">Transfer workspace</p>
                <p className="text-caption text-smoke">Move this workspace to another owner</p>
              </div>
              <button className="btn-pill-ghost !px-16 !py-8">Transfer</button>
            </div>
            <div className="flex items-center justify-between rounded-input border border-charcoal bg-ash px-16 py-16">
              <div>
                <p className="text-body-sm text-snow">Delete workspace</p>
                <p className="text-caption text-smoke">Permanently remove this workspace and all its data</p>
              </div>
              <button className="inline-flex items-center gap-8 rounded-button border border-charcoal px-16 py-8 text-body-sm text-snow hover:border-smoke">
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
