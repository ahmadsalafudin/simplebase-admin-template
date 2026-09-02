"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { shipments } from "@/lib/data";
import {
  Search,
  SlidersHorizontal,
  Plane,
  Truck,
  Ship,
  CheckCircle2,
  AlertTriangle,
  PauseCircle,
  Copy,
  Star,
  PhoneCall,
  FileText,
  Download,
  type LucideIcon,
} from "lucide-react";

type Shipment = (typeof shipments)[number];

const statusConfig: Record<string, { icon: LucideIcon; text: string; bg: string }> = {
  "In Transit": { icon: Plane, text: "text-sky-400", bg: "bg-sky-500/10" },
  Delivered: { icon: CheckCircle2, text: "text-phosphor-green", bg: "bg-phosphor-green/10" },
  Delayed: { icon: AlertTriangle, text: "text-red-400", bg: "bg-red-500/10" },
  "On Hold": { icon: PauseCircle, text: "text-amber-400", bg: "bg-amber-500/10" },
};

const modeIcon: Record<string, LucideIcon> = { air: Plane, road: Truck, sea: Ship };
const modeLabel: Record<string, string> = { air: "Air · Flight", road: "Road · Truck", sea: "Sea · Vessel" };

const filterTabs = ["All", "In Transit", "Delivered", "Delayed"];
const detailTabs = ["Overview", "Route", "Cargo", "Documents", "Activity"];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function ShipmentsPage() {
  const [query, setQuery] = useState("");
  const [filterTab, setFilterTab] = useState("All");
  const [selectedId, setSelectedId] = useState(shipments[0].id);
  const [detailTab, setDetailTab] = useState("Overview");
  const [copied, setCopied] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      All: shipments.length,
      "In Transit": shipments.filter((s) => s.status === "In Transit").length,
      Delivered: shipments.filter((s) => s.status === "Delivered").length,
      Delayed: shipments.filter((s) => s.status === "Delayed").length,
    }),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shipments.filter((s) => {
      if (filterTab !== "All" && s.status !== filterTab) return false;
      if (!q) return true;
      return (
        s.id.toLowerCase().includes(q) ||
        s.cargo.toLowerCase().includes(q) ||
        s.company.toLowerCase().includes(q)
      );
    });
  }, [query, filterTab]);

  const selected: Shipment = shipments.find((s) => s.id === selectedId) ?? shipments[0];
  const selectedCfg = statusConfig[selected.status];
  const SelectedStatusIcon = selectedCfg.icon;

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(text);
    setTimeout(() => setCopied((c) => (c === text ? null : c)), 1500);
  };

  const routeSteps = [
    { label: `Picked up · ${selected.origin.location}`, time: "—", done: true },
    { label: `Departed ${selected.origin.country}`, time: "—", done: selected.progress > 10 },
    {
      label: selected.status === "Delayed" ? "Delay reported en route" : "In transit",
      time: "—",
      done: selected.progress > 20 && selected.progress < 100,
    },
    {
      label: selected.mode === "sea" ? "Port clearance" : "Customs cleared",
      time: "—",
      done: selected.progress > 50,
    },
    {
      label: `Arrived · ${selected.destination.location}`,
      time: `${selected.eta} ${selected.etaNote}`,
      done: selected.progress === 100,
    },
  ];

  return (
    <PageShell title="Shipments" subtitle="Track cargo across every leg of the journey">
      <div className="card p-0 overflow-hidden grid grid-cols-1 lg:grid-cols-[360px_1fr] h-[calc(100vh-176px)] min-h-[640px]">
        {/* Shipment list */}
        <div className="border-r border-charcoal flex flex-col min-h-0">
          <div className="flex items-center justify-between px-16 py-16">
            <h2 className="text-subheading text-snow">Shipments</h2>
            <button className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
              <SlidersHorizontal size={14} className="text-silver-mist" />
            </button>
          </div>

          <div className="flex items-center gap-8 px-12 border-b border-charcoal overflow-x-auto">
            {filterTabs.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTab(t)}
                className={`shrink-0 pb-8 px-4 text-body-sm border-b-2 -mb-[1px] transition-colors whitespace-nowrap ${
                  filterTab === t
                    ? "text-snow border-phosphor-green"
                    : "text-smoke border-transparent hover:text-silver-mist"
                }`}
              >
                {t} <span className="text-caption text-smoke">({counts[t as keyof typeof counts]})</span>
              </button>
            ))}
          </div>

          <div className="p-16 border-b border-charcoal">
            <div className="flex items-center gap-8 rounded-input border border-slate bg-obsidian px-16 py-8">
              <Search size={14} className="text-smoke shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search shipments..."
                className="bg-transparent outline-none text-body-sm text-snow placeholder-smoke w-full"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((s) => {
              const cfg = statusConfig[s.status];
              const StatusIcon = cfg.icon;
              const ModeIcon = modeIcon[s.mode];
              const isActive = s.id === selectedId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedId(s.id);
                    setDetailTab("Overview");
                  }}
                  className={`w-full text-left px-16 py-16 border-b border-charcoal transition-colors ${
                    isActive ? "bg-ash" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-8 mb-12">
                    <span className="text-body-sm text-snow font-mono">#{s.id}</span>
                    <span className={`flex items-center gap-4 text-caption ${cfg.text}`}>
                      <StatusIcon size={12} /> {s.status}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-8">
                    <div className="flex items-center gap-8 min-w-0">
                      <span className="text-body shrink-0 leading-none">{s.origin.flag}</span>
                      <div className="min-w-0">
                        <p className="text-body-sm text-snow font-medium truncate">{s.origin.country},</p>
                        <p className="text-caption text-smoke truncate">{s.origin.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 min-w-0 text-right">
                      <div className="min-w-0">
                        <p className="text-body-sm text-snow font-medium truncate">{s.destination.country},</p>
                        <p className="text-caption text-smoke truncate">{s.destination.location}</p>
                      </div>
                      <span className="text-body shrink-0 leading-none">{s.destination.flag}</span>
                    </div>
                  </div>

                  <div className="flex items-center my-12">
                    <span className="flex-1 border-t border-dashed border-slate" />
                    <ModeIcon size={14} className="text-smoke mx-8 shrink-0" />
                    <span className="flex-1 border-t border-dashed border-slate" />
                  </div>

                  <div className="flex items-center justify-between gap-8">
                    <div>
                      <p className="text-caption text-smoke">Cargo</p>
                      <p className="text-body-sm text-snow truncate">{s.cargo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-caption text-smoke">ETA</p>
                      <p className="text-body-sm text-snow">
                        {s.eta} <span className="text-caption text-smoke">{s.etaNote}</span>
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 ? (
              <p className="text-body-sm text-smoke text-center py-40">No shipments match your search.</p>
            ) : null}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex flex-col min-h-0">
          {/* Decorative route map */}
          <div className="relative h-[220px] sm:h-[260px] shrink-0 bg-ash border-b border-charcoal overflow-hidden">
            <svg className="absolute inset-0 h-full w-full px-8 py-8" viewBox="0 0 260 82" preserveAspectRatio="xMidYMid meet">
              <path
                d="M124.786,30.3l1.038-8.14l5.332-0.26l-0.519-2.383l-4.861-3.138l1.133-2.076l-5.12-6.914l-0.236-4.011l-8.376,1.463 l-0.637,6.135l-4.695,8.801l-4.53,1.321L99.87,19.66l-4.507,0.707L93.57,22.82l-8.352,0.496l-5.215-4.766l-2.312,6.04l1.321,5.686 l5.592,5.285l1.746,9.084l3.681-0.826l9.06,2.407l2.926-2.006l6.134,1.581l1.888,3.846l7.055-3.35l2.925-6.819l-1.51-3.445 L124.786,30.3z M101.002,68.098l-1.014-3.303l-5.026-0.661l-5.403-0.944l-0.92,2.431l-8.471-0.213l-3.893-2.902l-6.535-0.401 l-1.392-0.024l-3.705-0.707l-1.227,3.468l3.516,2.359l0.778,2.195l10.429,1.533l1.793-0.943l6.701,0.802l4.365,1.415l0.543,0.118 l11.986-0.377l4.247,1.628l2.383-4.341l-6.229,0.094L101.002,68.098z M160.177,79.494l3.634,0.566l3.421-3.751l-0.802-2.855 L160.177,79.494z M140.924,70.458l-1.463,3.186l10.051-0.236l5.427-1.628l0.873-2.548l-3.657,2.76L140.924,70.458z M164.306,19.163 l-2.052-2.005l-3.776,3.114l-8.966-0.566l-7.101-1.369l-1.676,3.162l-2.737,0.377l-2.241,8.612l-0.944,6.159l-2.926,4.483 l1.109,4.199l3.044-0.566l0.92,4.412l-1.25,5.663l2.524,1.722l2.761-1.109l0.448-4.766l-0.637-7.597l3.728-1.817l-0.897,3.445 l3.634,3.586l5.804,0.661l-1.651-6.229l-4.672-6.158l4.389-3.28l2.265-3.209h-7.15l-2.17,3.162l-5.545-3.846l1.227-6.205 l5.214-0.189l8.943-0.59l2.666,0.779l4.719-0.732L164.306,19.163z M185.282,14.658l-7.22,2.312l4.152,10.547l0.795-0.636 l-1.62-5.947l3.94-3.492L185.282,14.658z M175.679,45.188l1.817-3.705l-6.088,0.496l-0.896,2.581L175.679,45.188z M184.463,40.77 l-0.283,2.761l7.205-0.526l7.204,1.475l-1.628-4.129l-5.577-0.813L184.463,40.77z M122.945,72.298l1.038,3.161l9.249-1.981 l1.133-2.69l-6.205,0.472L122.945,72.298z M257.74,35.421l-6.771-1.18l-12.6-4.837l-8.069,4.625l-5.238,6.818l-2.831-0.118 l-1.911-2.784l-2.855-2.524l0.283-5.946l-1.935-3.516l-3.374,0.165l-4.011-1.887l-8.235,3.02l-1.439,3.586l5.356,0.661l5.073,6.654 l0.118,4.978l3.138,2.029l1.746-2.831l7.527,3.775l6.417,1.392l10.264,3.988l6.63,9.367l1.557,4.506l-1.242,2.728l-0.457-3.86 l-4.601,1.368l-2.359,4.554l4.742,0.023l2.582-1.879l-0.222,0.487l6.512-0.047l6.111,6.182L258,58.118L257.74,35.421z M63.888,47.288l-2.69-4.46l-4.034-0.377l-3.115-6.607l-5.19-1.25l1.462-5.427l-7.196-2.524l-2.053-3.233l-3.846-1.557l-2.099-2.69 l-4.224-1.652l-3.232-3.303l-8.14-4.624L14.859,3.26L7.238,3.285L2,1.939l1.392,3.988l5.757,5.403l2.572,0.708l5.073,7.573 l2.005,0.425l3.775,3.445l2.525,6.913l3.374,1.392l7.786,12.953l14.888,12.293l3.964,3.681l8.069,0.472l-0.306-8.99L63.888,47.288z M114.49,74.372l-4.333-2.917l6.083-0.667l1.417,2.167L114.49,74.372z"
                className="fill-charcoal opacity-40"
              />
              <line x1="80" y1="20" x2="160" y2="45" strokeDasharray="2 3" strokeWidth="1" className="stroke-graphite" />
              <circle cx="80" cy="20" r="3" fill="none" strokeWidth="1" className="stroke-snow" />
              <circle cx="80" cy="20" r="1.5" className="fill-snow" />
              <circle cx="160" cy="45" r="3" fill="none" strokeWidth="1" className="stroke-phosphor-green" />
              <circle cx="160" cy="45" r="1.5" className="fill-phosphor-green" />
            </svg>
            <div className="absolute left-1/2 top-[21%] -translate-x-1/2 -translate-y-full">
              <span className="text-caption text-silver-mist bg-obsidian/80 px-8 py-[2px] rounded-tag border border-charcoal whitespace-nowrap">
                {selected.origin.location}
              </span>
            </div>
            <div className="absolute left-[57.5%] top-[75%] -translate-x-1/2 translate-y-[10px]">
              <span className="text-caption text-silver-mist bg-obsidian/80 px-8 py-[2px] rounded-tag border border-charcoal whitespace-nowrap">
                {selected.destination.location}
              </span>
            </div>
            <button className="absolute top-16 right-16 h-32 w-32 rounded-input bg-obsidian/80 border border-charcoal flex items-center justify-center hover:border-graphite">
              <SlidersHorizontal size={14} className="text-silver-mist" />
            </button>
          </div>

          {/* Detail tabs */}
          <div className="flex items-center gap-24 px-24 border-b border-charcoal overflow-x-auto">
            {detailTabs.map((t) => (
              <button
                key={t}
                onClick={() => setDetailTab(t)}
                className={`shrink-0 py-16 text-body-sm border-b-2 -mb-[1px] transition-colors ${
                  detailTab === t
                    ? "text-snow border-phosphor-green"
                    : "text-smoke border-transparent hover:text-silver-mist"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-24">
            {detailTab === "Overview" ? (
              <div className="flex flex-col gap-24">
                <div className="flex flex-wrap items-center justify-between gap-16">
                  <div className="flex items-center gap-8">
                    <h3 className="text-heading-sm text-snow font-mono">#{selected.id}</h3>
                    <button
                      onClick={() => copy(selected.id)}
                      className="h-24 w-24 rounded-input hover:bg-white/[0.04] flex items-center justify-center"
                      title="Copy shipment ID"
                    >
                      <Copy size={12} className="text-smoke" />
                    </button>
                    {copied === selected.id ? <span className="text-caption text-phosphor-green">Copied</span> : null}
                  </div>
                  <div className="flex items-center gap-8 text-caption text-silver-mist flex-wrap">
                    <span className={`pill-tag !py-4 ${selectedCfg.bg} ${selectedCfg.text} !border-transparent`}>
                      <SelectedStatusIcon size={12} /> {selected.status}
                    </span>
                    <span>·</span>
                    <span>{selected.progress}% complete</span>
                    <span>·</span>
                    <span>
                      ETA: {selected.eta} {selected.etaNote}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-16 pb-24 border-b border-charcoal">
                  <div className="flex items-center gap-16">
                    <div className="h-40 w-40 rounded-input bg-ash border border-charcoal flex items-center justify-center text-caption text-snow font-medium shrink-0">
                      {initials(selected.company)}
                    </div>
                    <div>
                      <p className="text-body-sm text-snow font-medium">{selected.company}</p>
                      <div className="flex items-center gap-4">
                        <p className="text-caption text-smoke">{selected.companyCode}</p>
                        <button
                          onClick={() => copy(selected.companyCode)}
                          className="h-16 w-16 flex items-center justify-center"
                          title="Copy company code"
                        >
                          <Copy size={10} className="text-smoke" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {selected.priority ? (
                      <span className="pill-tag !py-4 inline-flex">
                        <Star size={12} className="text-phosphor-green" /> Priority
                      </span>
                    ) : null}
                    <p className="text-caption text-smoke mt-4">{selected.volumeNote}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-16 flex-wrap">
                  <h4 className="text-body-sm text-snow font-medium">Cargo details</h4>
                  <button className="btn-pill-ghost !px-16 !py-8">
                    <PhoneCall size={14} />
                    Contact carrier
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-16">
                  <div>
                    <p className="text-caption text-smoke mb-4">Total weight</p>
                    <p className="text-body-sm text-snow">{selected.weight}</p>
                  </div>
                  <div>
                    <p className="text-caption text-smoke mb-4">Transport mode</p>
                    <p className="text-body-sm text-snow">{modeLabel[selected.mode]}</p>
                  </div>
                  <div>
                    <p className="text-caption text-smoke mb-4">{selected.vehicleLabel}</p>
                    <p className="text-body-sm text-snow">{selected.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-caption text-smoke mb-4">Status</p>
                    <p className="text-body-sm text-snow">{selected.progress}% complete</p>
                  </div>
                </div>

                {selected.alert ? (
                  <div className="rounded-card border border-amber-500/30 bg-amber-500/10 p-16 flex flex-col gap-12">
                    <div className="flex items-start gap-8">
                      <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-[2px]" />
                      <div>
                        <p className="text-body-sm text-amber-300 font-medium">{selected.alert.title}</p>
                        <p className="text-caption text-amber-200/80">{selected.alert.note}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-8 pt-12 border-t border-amber-500/20">
                      {selected.alert.tags.map((tag) => (
                        <span key={tag} className="pill-tag !border-amber-500/30 !bg-transparent !text-amber-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {detailTab === "Route" ? (
              <div className="flex flex-col">
                {routeSteps.map((step, i) => (
                  <div key={i} className="flex gap-16">
                    <div className="flex flex-col items-center">
                      <span
                        className={`h-10 w-10 rounded-full shrink-0 ${
                          step.done ? "bg-phosphor-green" : "bg-charcoal border border-slate"
                        }`}
                      />
                      {i < routeSteps.length - 1 ? <span className="w-[1px] flex-1 bg-charcoal mt-4" /> : null}
                    </div>
                    <div className="pb-24">
                      <p className={`text-body-sm ${step.done ? "text-snow" : "text-smoke"}`}>{step.label}</p>
                      <p className="text-caption text-smoke">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {detailTab === "Cargo" ? (
              <div className="flex flex-col gap-24">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
                  <div>
                    <p className="text-caption text-smoke mb-4">Cargo type</p>
                    <p className="text-body-sm text-snow">{selected.cargo}</p>
                  </div>
                  <div>
                    <p className="text-caption text-smoke mb-4">Total weight</p>
                    <p className="text-body-sm text-snow">{selected.weight}</p>
                  </div>
                  <div>
                    <p className="text-caption text-smoke mb-4">Transport mode</p>
                    <p className="text-body-sm text-snow">{modeLabel[selected.mode]}</p>
                  </div>
                </div>
                <div>
                  <p className="text-body-sm text-snow font-medium mb-16">Handling requirements</p>
                  {selected.alert ? (
                    <div className="flex flex-wrap gap-8">
                      {selected.alert.tags.map((t) => (
                        <span key={t} className="pill-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-caption text-smoke">No special handling requirements for this shipment.</p>
                  )}
                </div>
              </div>
            ) : null}

            {detailTab === "Documents" ? (
              <div className="flex flex-col gap-8">
                {[
                  "Commercial Invoice.pdf",
                  "Packing List.pdf",
                  selected.mode === "sea" ? "Bill of Lading.pdf" : "Airway Bill.pdf",
                ].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between px-16 py-12 rounded-input border border-charcoal hover:border-slate transition-colors"
                  >
                    <div className="flex items-center gap-16 min-w-0">
                      <FileText size={16} className="text-smoke shrink-0" />
                      <span className="text-body-sm text-snow truncate">{doc}</span>
                    </div>
                    <button className="h-28 w-28 rounded-input hover:bg-white/[0.04] flex items-center justify-center shrink-0">
                      <Download size={14} className="text-smoke" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            {detailTab === "Activity" ? (
              <div className="flex flex-col gap-16">
                {[
                  { label: "Shipment created", time: "3 days ago" },
                  { label: `Assigned to ${selected.vehicleNumber}`, time: "2 days ago" },
                  { label: `Status changed to ${selected.status}`, time: "Today" },
                ].map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-charcoal pb-16 last:border-0 last:pb-0"
                  >
                    <span className="text-body-sm text-snow">{e.label}</span>
                    <span className="text-caption text-smoke">{e.time}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
