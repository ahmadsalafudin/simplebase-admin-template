"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { events } from "@/lib/data";
import { ChevronLeft, ChevronRight, Plus, Search, X } from "lucide-react";

type ViewMode = "day" | "week" | "month";

const FIXED_TODAY = new Date(2026, 7, 3); // Aug 3, 2026 — matches the seed event data
const weekLabelsFull = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weekLabelsMini = ["S", "M", "T", "W", "T", "F", "S"];

const myCalendars = [
  { label: "Work", color: "bg-phosphor-green" },
  { label: "Personal", color: "bg-silver-mist" },
  { label: "Team", color: "bg-smoke" },
  { label: "Holidays", color: "bg-slate" },
];

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function getMonthMatrix(date: Date) {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(firstOfMonth);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function getWeekRow(date: Date) {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function getEventsForDate(d: Date) {
  if (d.getFullYear() !== 2026 || d.getMonth() !== 7) return [];
  return events.filter((e) => e.date === d.getDate());
}

function eventStyle(color: string) {
  return color === "phosphor-green"
    ? "bg-phosphor-green/10 text-phosphor-green border-l-2 border-phosphor-green"
    : "bg-ash text-silver-mist border-l-2 border-slate";
}

export default function CalendarPage() {
  const [view, setView] = useState<ViewMode>("month");
  const [currentDate, setCurrentDate] = useState(FIXED_TODAY);
  const [selectedDate, setSelectedDate] = useState(FIXED_TODAY);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const monthLabel = currentDate.toLocaleString("en-US", { month: "long", year: "numeric" });
  const miniMonthLabel = currentDate.toLocaleString("en-US", { month: "short", year: "numeric" });

  const monthMatrix = useMemo(() => getMonthMatrix(currentDate), [currentDate]);
  const weekRow = useMemo(() => getWeekRow(selectedDate), [selectedDate]);
  const dayEvents = useMemo(() => getEventsForDate(selectedDate), [selectedDate]);

  const goToday = () => {
    setCurrentDate(FIXED_TODAY);
    setSelectedDate(FIXED_TODAY);
  };

  const shiftMonth = (delta: number) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const shiftWeek = (delta: number) => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + delta * 7);
      return d;
    });
  };

  const shiftDay = (delta: number) => {
    setSelectedDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + delta);
      return d;
    });
  };

  const handlePrev = () => (view === "month" ? shiftMonth(-1) : view === "week" ? shiftWeek(-1) : shiftDay(-1));
  const handleNext = () => (view === "month" ? shiftMonth(1) : view === "week" ? shiftWeek(1) : shiftDay(1));

  const headerLabel =
    view === "day"
      ? selectedDate.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
      : view === "week"
      ? `${weekRow[0].toLocaleString("en-US", { month: "short", day: "numeric" })} – ${weekRow[6].toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`
      : monthLabel;

  return (
    <PageShell title="Calendar" subtitle={monthLabel}>
      <div className="flex flex-col lg:flex-row gap-16 h-[calc(100vh-176px)] min-h-[600px]">
        {/* Left mini-sidebar */}
        <div className="lg:w-[260px] shrink-0 flex flex-col gap-16 lg:overflow-y-auto">
          <button onClick={() => setIsCreateOpen(true)} className="btn-pill-primary w-full !justify-center">
            <Plus size={14} />
            Create
          </button>

          {/* Mini month calendar */}
          <div className="card flex flex-col gap-16">
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-snow">{miniMonthLabel}</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => shiftMonth(-1)}
                  className="h-24 w-24 rounded-input flex items-center justify-center hover:bg-white/[0.04]"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={12} className="text-smoke" />
                </button>
                <button
                  onClick={() => shiftMonth(1)}
                  className="h-24 w-24 rounded-input flex items-center justify-center hover:bg-white/[0.04]"
                  aria-label="Next month"
                >
                  <ChevronRight size={12} className="text-smoke" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-4">
              {weekLabelsMini.map((d, i) => (
                <div key={`${d}-${i}`} className="text-caption text-smoke text-center">
                  {d}
                </div>
              ))}
              {monthMatrix.map((d, i) => {
                const inMonth = isSameMonth(d, currentDate);
                const isToday = isSameDay(d, FIXED_TODAY);
                const isSelected = isSameDay(d, selectedDate);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDate(d);
                      if (!inMonth) setCurrentDate(new Date(d.getFullYear(), d.getMonth(), 1));
                    }}
                    className={`h-24 w-24 mx-auto rounded-full text-caption flex items-center justify-center transition-colors ${
                      isToday
                        ? "bg-phosphor-green text-ink"
                        : isSelected
                        ? "border border-phosphor-green text-snow"
                        : inMonth
                        ? "text-silver-mist hover:bg-white/[0.06]"
                        : "text-smoke/50 hover:bg-white/[0.04]"
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* My calendars */}
          <div className="card flex flex-col gap-16">
            <span className="text-body-sm text-snow">My calendars</span>
            <div className="flex flex-col gap-8">
              {myCalendars.map((c) => (
                <label key={c.label} className="flex items-center gap-16 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-phosphor-green shrink-0" />
                  <span className={`h-8 w-8 rounded-[2px] shrink-0 ${c.color}`} />
                  <span className="text-body-sm text-silver-mist">{c.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Main calendar */}
        <div className="card flex-1 flex flex-col gap-16 min-w-0 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-16">
            <div className="flex items-center gap-16">
              <button onClick={goToday} className="btn-pill-ghost !px-16 !py-8">
                Today
              </button>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite"
                  aria-label="Previous"
                >
                  <ChevronLeft size={14} className="text-silver-mist" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite"
                  aria-label="Next"
                >
                  <ChevronRight size={14} className="text-silver-mist" />
                </button>
              </div>
              <h2 className="text-subheading text-snow whitespace-nowrap">{headerLabel}</h2>
            </div>

            <div className="flex items-center gap-16">
              <div className="flex items-center gap-4 rounded-button border border-charcoal bg-ash p-4">
                {(["Day", "Week", "Month"] as const).map((label) => {
                  const key = label.toLowerCase() as ViewMode;
                  const active = view === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setView(key)}
                      className={`rounded-button px-16 py-8 text-body-sm transition-colors ${
                        active ? "bg-obsidian text-snow border border-charcoal" : "text-smoke hover:text-silver-mist"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <button
                className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite shrink-0"
                aria-label="Search events"
              >
                <Search size={14} className="text-silver-mist" />
              </button>
            </div>
          </div>

          {/* Month view */}
          {view === "month" ? (
            <div className="flex-1 flex flex-col min-h-0 border border-charcoal rounded-input overflow-hidden">
              <div className="grid grid-cols-7 border-b border-charcoal">
                {weekLabelsFull.map((d) => (
                  <div key={d} className="text-caption text-smoke text-center py-8 border-r border-charcoal last:border-r-0">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 grid-rows-6 flex-1 min-h-0">
                {monthMatrix.map((d, i) => {
                  const inMonth = isSameMonth(d, currentDate);
                  const isToday = isSameDay(d, FIXED_TODAY);
                  const isSelected = isSameDay(d, selectedDate);
                  const dEvents = getEventsForDate(d);
                  const visible = dEvents.slice(0, 3);
                  const extra = dEvents.length - visible.length;
                  const isRightEdge = (i + 1) % 7 === 0;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`text-left flex flex-col gap-4 p-8 border-b border-charcoal transition-colors overflow-hidden ${
                        isRightEdge ? "" : "border-r"
                      } ${inMonth ? "bg-obsidian hover:bg-white/[0.02]" : "bg-canvas/40 hover:bg-white/[0.02]"} ${
                        isSelected ? "ring-1 ring-inset ring-phosphor-green" : ""
                      }`}
                    >
                      <span
                        className={`h-24 w-24 rounded-full text-caption flex items-center justify-center shrink-0 ${
                          isToday ? "bg-phosphor-green text-ink" : inMonth ? "text-silver-mist" : "text-smoke/50"
                        }`}
                      >
                        {d.getDate()}
                      </span>
                      <div className="flex flex-col gap-2 overflow-hidden">
                        {visible.map((e) => (
                          <span
                            key={e.id}
                            className={`truncate text-[11px] leading-tight rounded-[4px] px-4 py-2 ${eventStyle(e.color)}`}
                          >
                            {e.title}
                          </span>
                        ))}
                        {extra > 0 ? <span className="text-[11px] text-smoke px-4">+{extra} more</span> : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Week view */}
          {view === "week" ? (
            <div className="flex-1 flex flex-col min-h-0 border border-charcoal rounded-input overflow-hidden">
              <div className="grid grid-cols-7 border-b border-charcoal">
                {weekRow.map((d) => {
                  const isToday = isSameDay(d, FIXED_TODAY);
                  return (
                    <div key={d.toISOString()} className="flex flex-col items-center gap-4 py-8 border-r border-charcoal last:border-r-0">
                      <span className="text-caption text-smoke">
                        {d.toLocaleString("en-US", { weekday: "short" })}
                      </span>
                      <span
                        className={`h-24 w-24 rounded-full text-caption flex items-center justify-center ${
                          isToday ? "bg-phosphor-green text-ink" : "text-snow"
                        }`}
                      >
                        {d.getDate()}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-7 flex-1 min-h-0 overflow-y-auto">
                {weekRow.map((d) => {
                  const dEvents = getEventsForDate(d);
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setSelectedDate(d)}
                      className={`text-left flex flex-col gap-4 p-8 border-r border-charcoal last:border-r-0 hover:bg-white/[0.02] transition-colors ${
                        isSameDay(d, selectedDate) ? "ring-1 ring-inset ring-phosphor-green" : ""
                      }`}
                    >
                      {dEvents.length > 0 ? (
                        dEvents.map((e) => (
                          <span
                            key={e.id}
                            className={`text-[11px] leading-tight rounded-[4px] px-4 py-4 flex flex-col gap-2 ${eventStyle(e.color)}`}
                          >
                            <span className="truncate font-medium">{e.title}</span>
                            <span className="truncate opacity-80">{e.time}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-caption text-smoke/60 px-4 pt-8">No events</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Day view */}
          {view === "day" ? (
            <div className="flex-1 flex flex-col min-h-0 border border-charcoal rounded-input overflow-hidden">
              <div className="flex items-center gap-16 px-16 py-16 border-b border-charcoal">
                <div
                  className={`h-40 w-40 rounded-full text-body-sm flex items-center justify-center shrink-0 ${
                    isSameDay(selectedDate, FIXED_TODAY) ? "bg-phosphor-green text-ink" : "bg-ash text-snow border border-charcoal"
                  }`}
                >
                  {selectedDate.getDate()}
                </div>
                <div>
                  <p className="text-body-sm text-snow">
                    {selectedDate.toLocaleString("en-US", { weekday: "long" })}
                  </p>
                  <p className="text-caption text-smoke">
                    {selectedDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-16 flex flex-col gap-8">
                {dayEvents.length > 0 ? (
                  dayEvents.map((e) => (
                    <div key={e.id} className={`rounded-input px-16 py-16 flex items-center justify-between gap-16 ${eventStyle(e.color)}`}>
                      <span className="text-body-sm truncate">{e.title}</span>
                      <span className="text-caption shrink-0 opacity-80">{e.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-body-sm text-smoke">No events scheduled for this day.</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      
      {/* Create Agenda Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-16 lg:p-32">
          <div className="bg-obsidian border border-charcoal rounded-input w-full max-w-3xl max-h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-24 border-b border-charcoal">
              <h2 className="text-subheading text-snow">Create New Agenda</h2>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="h-32 w-32 rounded-input flex items-center justify-center hover:bg-white/[0.04] transition-colors"
                aria-label="Close"
              >
                <X size={16} className="text-smoke" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-24 flex flex-col gap-24">
              <div className="flex flex-col gap-8">
                <label className="text-body-sm text-silver-mist">Title</label>
                <input
                  type="text"
                  placeholder="E.g., Team Sync"
                  className="bg-ash border border-charcoal rounded-input px-12 py-12 text-snow placeholder:text-smoke focus:outline-none focus:border-phosphor-green transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-24">
                <div className="flex flex-col gap-8">
                  <label className="text-body-sm text-silver-mist">Date</label>
                  <input
                    type="date"
                    className="bg-ash border border-charcoal rounded-input px-12 py-12 text-snow focus:outline-none focus:border-phosphor-green transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <label className="text-body-sm text-silver-mist">Time</label>
                  <input
                    type="time"
                    className="bg-ash border border-charcoal rounded-input px-12 py-12 text-snow focus:outline-none focus:border-phosphor-green transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <label className="text-body-sm text-silver-mist">Calendar</label>
                <div className="relative">
                  <select className="bg-ash border border-charcoal rounded-input px-12 py-12 w-full text-snow focus:outline-none focus:border-phosphor-green transition-colors appearance-none">
                    {myCalendars.map((c) => (
                      <option key={c.label} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none text-smoke">
                    <ChevronRight size={14} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <label className="text-body-sm text-silver-mist">Description</label>
                <textarea
                  placeholder="Add description..."
                  rows={4}
                  className="bg-ash border border-charcoal rounded-input px-12 py-12 text-snow placeholder:text-smoke focus:outline-none focus:border-phosphor-green transition-colors resize-none"
                />
              </div>
            </div>

            <div className="p-24 border-t border-charcoal flex items-center justify-end gap-16">
              <button onClick={() => setIsCreateOpen(false)} className="btn-pill-ghost">
                Cancel
              </button>
              <button onClick={() => setIsCreateOpen(false)} className="btn-pill-primary">
                Save Agenda
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
