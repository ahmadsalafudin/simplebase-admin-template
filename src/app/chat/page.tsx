"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { chatContacts, chatMessages } from "@/lib/data";
import { avatarUrl } from "@/lib/avatar";
import { Search, Send, Phone, Video, MoreHorizontal } from "lucide-react";

export default function ChatPage() {
  const [activeId, setActiveId] = useState(chatContacts[0].id);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const active = chatContacts.find((c) => c.id === activeId)!;
  const messages = chatMessages[activeId] ?? [];

  const filtered = chatContacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageShell title="Chat" subtitle="Message your team without leaving the Simplebase">
      <div className="card p-0 overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] h-[calc(100vh-176px)] min-h-[480px]">
        {/* Contact list */}
        <div className="border-r border-charcoal flex flex-col min-h-0">
          <div className="p-16 border-b border-charcoal">
            <div className="flex items-center gap-8 rounded-input border border-slate bg-obsidian px-16 py-8">
              <Search size={14} className="text-smoke shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people..."
                className="bg-transparent outline-none text-body-sm text-snow placeholder-smoke w-full"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left flex items-center gap-16 px-16 py-16 border-b border-charcoal transition-colors ${
                    isActive ? "bg-ash" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="h-40 w-40 rounded-full overflow-hidden">
                      <img src={avatarUrl(c.name)} alt={c.name} className="h-full w-full object-cover" />
                    </div>
                    {c.online ? (
                      <span className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-phosphor-green border-2 border-obsidian" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-8">
                      <p className="text-body-sm text-snow truncate">{c.name}</p>
                      <span className="text-caption text-smoke shrink-0">{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <p className="text-caption text-smoke truncate">{c.lastMessage}</p>
                      {c.unread > 0 ? (
                        <span className="h-18 w-18 rounded-full bg-phosphor-green text-ink text-[10px] font-medium flex items-center justify-center shrink-0">
                          {c.unread}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thread */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between px-24 py-16 border-b border-charcoal">
            <div className="flex items-center gap-16 min-w-0">
              <div className="relative shrink-0">
                <div className="h-32 w-32 rounded-full overflow-hidden">
                  <img src={avatarUrl(active.name)} alt={active.name} className="h-full w-full object-cover" />
                </div>
                {active.online ? (
                  <span className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-phosphor-green border-2 border-obsidian" />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="text-body-sm text-snow truncate">{active.name}</p>
                <p className="text-caption text-smoke">{active.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
                <Phone size={14} className="text-silver-mist" />
              </button>
              <button className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
                <Video size={14} className="text-silver-mist" />
              </button>
              <button className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
                <MoreHorizontal size={14} className="text-silver-mist" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-24 py-24 flex flex-col gap-16">
            {messages.length > 0 ? (
              messages.map((m) => (
                <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex flex-col gap-4 max-w-[70%] ${m.from === "me" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-card px-16 py-8 text-body-sm ${
                        m.from === "me"
                          ? "bg-phosphor-green text-ink"
                          : "bg-ash border border-charcoal text-snow"
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-caption text-smoke">{m.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-body-sm text-smoke">No messages yet. Say hi to {active.name}!</p>
              </div>
            )}
          </div>

          <form
            className="flex items-center gap-16 px-24 py-16 border-t border-charcoal"
            onSubmit={(e) => {
              e.preventDefault();
              setDraft("");
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Message ${active.name}...`}
              className="input-field flex-1"
            />
            <button type="submit" className="btn-pill-primary !px-16 !py-8 shrink-0">
              <Send size={14} />
              Send
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
