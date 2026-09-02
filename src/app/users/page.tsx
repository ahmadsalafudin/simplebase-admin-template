"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { users as allUsers } from "@/lib/data";
import { avatarUrl } from "@/lib/avatar";
import { Search, Plus, ChevronDown, MoreHorizontal, ArrowUpDown } from "lucide-react";

const statusStyle: Record<string, string> = {
  Active: "text-phosphor-green",
  Invited: "text-silver-mist",
  Suspended: "text-smoke",
};

type SortKey = "name" | "role" | "status";

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let rows = allUsers.filter((u) => {
      const matchesQuery =
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
    rows = [...rows].sort((a, b) => {
      const res = a[sortKey].localeCompare(b[sortKey]);
      return sortAsc ? res : -res;
    });
    return rows;
  }, [query, statusFilter, sortKey, sortAsc]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const toggleRow = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map((u) => u.id));
  };

  return (
    <PageShell title="Users" subtitle={`${allUsers.length} members across your workspace`}>
      <div className="card p-0 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16 px-24 py-16 border-b border-charcoal">
          <div className="flex items-center gap-8 flex-1">
            <div className="flex items-center gap-8 rounded-input border border-slate bg-obsidian px-16 py-8 w-full sm:w-[260px]">
              <Search size={14} className="text-smoke shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search members..."
                className="bg-transparent outline-none text-body-sm text-snow placeholder-smoke w-full"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none rounded-input border border-slate bg-obsidian pl-16 pr-32 py-8 text-body-sm text-snow outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Invited</option>
                <option>Suspended</option>
              </select>
              <ChevronDown size={14} className="text-smoke absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <button className="btn-pill-primary">
            <Plus size={14} />
            Invite member
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="table-th w-[40px]">
                  <input
                    type="checkbox"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="accent-phosphor-green"
                  />
                </th>
                <th className="table-th cursor-pointer select-none" onClick={() => toggleSort("name")}>
                  <span className="inline-flex items-center gap-8">
                    Name
                    <ArrowUpDown size={12} />
                  </span>
                </th>
                <th className="table-th cursor-pointer select-none" onClick={() => toggleSort("role")}>
                  <span className="inline-flex items-center gap-8">
                    Role
                    <ArrowUpDown size={12} />
                  </span>
                </th>
                <th className="table-th cursor-pointer select-none" onClick={() => toggleSort("status")}>
                  <span className="inline-flex items-center gap-8">
                    Status
                    <ArrowUpDown size={12} />
                  </span>
                </th>
                <th className="table-th">Project</th>
                <th className="table-th">Last active</th>
                <th className="table-th"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-ash/50 transition-colors">
                  <td className="table-td">
                    <input
                      type="checkbox"
                      checked={selected.includes(u.id)}
                      onChange={() => toggleRow(u.id)}
                      className="accent-phosphor-green"
                    />
                  </td>
                  <td className="table-td">
                    <div className="flex items-center gap-16">
                      <div className="h-32 w-32 rounded-full shrink-0 overflow-hidden">
                        <img
                          src={avatarUrl(u.email)}
                          alt={u.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-snow truncate">{u.name}</p>
                        <p className="text-caption text-smoke truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td">{u.role}</td>
                  <td className="table-td">
                    <span className={statusStyle[u.status]}>● {u.status}</span>
                  </td>
                  <td className="table-td font-mono text-caption">{u.project}</td>
                  <td className="table-td">{u.lastActive}</td>
                  <td className="table-td text-right">
                    <button className="h-32 w-32 rounded-input hover:bg-white/[0.04] flex items-center justify-center ml-auto">
                      <MoreHorizontal size={14} className="text-smoke" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-td text-center text-smoke py-48">
                    No members match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-24 py-16 border-t border-charcoal">
          <span className="text-caption text-smoke">
            {selected.length > 0 ? `${selected.length} selected · ` : ""}
            Showing {filtered.length} of {allUsers.length} members
          </span>
          <div className="flex items-center gap-8">
            <button className="btn-pill-ghost !px-16 !py-8">Previous</button>
            <button className="btn-pill-ghost !px-16 !py-8">Next</button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
