"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { projectTasks } from "@/lib/data";
import { avatarUrl } from "@/lib/avatar";
import {
  List,
  KanbanSquare,
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
} from "lucide-react";

type Status = "Todo" | "In Progress" | "In Review" | "Done";
type ViewMode = "list" | "kanban";

const columns: Status[] = ["Todo", "In Progress", "In Review", "Done"];

const statusDot: Record<Status, string> = {
  Todo: "text-smoke",
  "In Progress": "text-silver-mist",
  "In Review": "text-phosphor-green",
  Done: "text-phosphor-green",
};

const priorityStyle: Record<string, string> = {
  High: "text-snow border-charcoal bg-ash",
  Medium: "text-silver-mist border-charcoal bg-ash",
  Low: "text-smoke border-charcoal bg-ash",
};

export default function TimelinePage() {
  const [view, setView] = useState<ViewMode>("kanban");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projectTasks.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.project.toLowerCase().includes(query.toLowerCase()) ||
        t.assignee.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map: Record<Status, typeof projectTasks> = {
      Todo: [],
      "In Progress": [],
      "In Review": [],
      Done: [],
    };
    filtered.forEach((t) => map[t.status as Status].push(t));
    return map;
  }, [filtered]);

  return (
    <PageShell title="Project Timeline" subtitle="Track work across every active project">
      <div className="flex flex-col gap-24">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16">
          <div className="flex items-center gap-8 rounded-input border border-slate bg-obsidian px-16 py-8 w-full sm:w-[280px]">
            <Search size={14} className="text-smoke shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks, projects, people..."
              className="bg-transparent outline-none text-body-sm text-snow placeholder-smoke w-full"
            />
          </div>

          <div className="flex items-center gap-16">
            <div className="flex items-center gap-4 rounded-button border border-charcoal bg-ash p-4">
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-8 rounded-button px-16 py-8 text-body-sm transition-colors ${
                  view === "list" ? "bg-obsidian text-snow border border-charcoal" : "text-smoke hover:text-silver-mist"
                }`}
              >
                <List size={14} />
                List
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`flex items-center gap-8 rounded-button px-16 py-8 text-body-sm transition-colors ${
                  view === "kanban" ? "bg-obsidian text-snow border border-charcoal" : "text-smoke hover:text-silver-mist"
                }`}
              >
                <KanbanSquare size={14} />
                Kanban
              </button>
            </div>

            <button className="btn-pill-primary shrink-0">
              <Plus size={14} />
              New task
            </button>
          </div>
        </div>

        {/* List view */}
        {view === "list" ? (
          <div className="card p-0 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Task</th>
                    <th className="table-th">Project</th>
                    <th className="table-th">Assignee</th>
                    <th className="table-th">Priority</th>
                    <th className="table-th">Status</th>
                    <th className="table-th">Due</th>
                    <th className="table-th">Progress</th>
                    <th className="table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-ash/50 transition-colors">
                      <td className="table-td text-snow">{t.title}</td>
                      <td className="table-td font-mono text-caption">{t.project}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-8">
                          <div className="h-24 w-24 rounded-full shrink-0 overflow-hidden">
                            <img
                              src={avatarUrl(t.assignee)}
                              alt={t.assignee}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {t.assignee}
                        </div>
                      </td>
                      <td className="table-td">
                        <span className={`inline-flex rounded-tag border px-16 py-[2px] text-caption ${priorityStyle[t.priority]}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="table-td">
                        <span className={statusDot[t.status as Status]}>● {t.status}</span>
                      </td>
                      <td className="table-td">{t.due}</td>
                      <td className="table-td">
                        <div className="flex items-center gap-8 w-[120px]">
                          <div className="h-6 flex-1 rounded-full bg-charcoal overflow-hidden">
                            <div
                              className="h-full bg-phosphor-green"
                              style={{ width: `${t.progress}%` }}
                            />
                          </div>
                          <span className="text-caption text-smoke shrink-0">{t.progress}%</span>
                        </div>
                      </td>
                      <td className="table-td text-right">
                        <button className="h-32 w-32 rounded-input hover:bg-white/[0.04] flex items-center justify-center ml-auto">
                          <MoreHorizontal size={14} className="text-smoke" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="table-td text-center text-smoke py-48">
                        No tasks match your search.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {/* Kanban view */}
        {view === "kanban" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 items-start">
            {columns.map((col) => (
              <div key={col} className="flex flex-col gap-16">
                <div className="flex items-center justify-between px-8">
                  <span className="text-body-sm text-snow flex items-center gap-8">
                    <span className={statusDot[col]}>●</span>
                    {col}
                  </span>
                  <span className="text-caption text-smoke">{grouped[col].length}</span>
                </div>

                <div className="flex flex-col gap-16 min-h-[80px]">
                  {grouped[col].map((t) => (
                    <div key={t.id} className="card flex flex-col gap-16">
                      <div className="flex items-start justify-between gap-8">
                        <p className="text-body-sm text-snow">{t.title}</p>
                        <button className="h-24 w-24 rounded-input hover:bg-white/[0.04] flex items-center justify-center shrink-0">
                          <MoreHorizontal size={12} className="text-smoke" />
                        </button>
                      </div>

                      <span className="font-mono text-caption text-smoke">{t.project}</span>

                      <div className="h-6 rounded-full bg-charcoal overflow-hidden">
                        <div className="h-full bg-phosphor-green" style={{ width: `${t.progress}%` }} />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`inline-flex rounded-tag border px-16 py-[2px] text-caption ${priorityStyle[t.priority]}`}>
                          {t.priority}
                        </span>
                        <span className="flex items-center gap-4 text-caption text-smoke">
                          <Calendar size={12} />
                          {t.due}
                        </span>
                      </div>

                      <div className="flex items-center gap-8 pt-8 border-t border-charcoal">
                        <div className="h-24 w-24 rounded-full shrink-0 overflow-hidden">
                          <img
                            src={avatarUrl(t.assignee)}
                            alt={t.assignee}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-caption text-silver-mist truncate">{t.assignee}</span>
                      </div>
                    </div>
                  ))}

                  {grouped[col].length === 0 ? (
                    <div className="rounded-card border border-dashed border-charcoal p-24 text-center">
                      <span className="text-caption text-smoke">No tasks</span>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
