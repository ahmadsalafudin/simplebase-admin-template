"use client";

import { useMemo, useState } from "react";
import PageShell from "@/components/PageShell";
import { emailAccounts, emails } from "@/lib/data";
import {
  Search,
  SlidersHorizontal,
  RotateCw,
  MoreHorizontal,
  MoreVertical,
  PenSquare,
  Inbox as InboxIcon,
  Star,
  FileText,
  Send,
  Archive,
  Trash2,
  HelpCircle,
  Keyboard,
  X,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Pin,
  Reply,
  Paperclip,
  Smile,
  Figma,
  Image as ImageIcon,
  File as FileGeneric,
  type LucideIcon,
} from "lucide-react";

const attachmentIcon: Record<string, LucideIcon> = {
  figma: Figma,
  doc: FileText,
  image: ImageIcon,
};

type Folder = "inbox" | "priority" | "drafts" | "sent" | "archive" | "trash";

const folderNav: { id: Folder; label: string; icon: LucideIcon; count?: number }[] = [
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "priority", label: "Priority", icon: Star },
];

const folderList: { id: Folder; label: string; icon: LucideIcon; count: number }[] = [
  { id: "drafts", label: "Drafts", icon: FileText, count: 9 },
  { id: "sent", label: "Sent", icon: Send, count: 24 },
  { id: "archive", label: "Archive", icon: Archive, count: 56 },
  { id: "trash", label: "Trash", icon: Trash2, count: 3 },
];

type MobileView = "nav" | "list" | "detail";

export default function EmailPage() {
  const [folder, setFolder] = useState<Folder>("inbox");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(emails[0].id);
  const [attachmentsOpen, setAttachmentsOpen] = useState(true);
  const [draft, setDraft] = useState("");
  // Small screens show one pane at a time; lg+ always shows all three.
  const [mobileView, setMobileView] = useState<MobileView>("list");

  const inboxCount = emails.filter((e) => e.folder === "inbox").length;
  const priorityCount = emails.filter((e) => e.priority).length;

  const listEmails = useMemo(() => {
    let base = emails;
    if (folder === "priority") base = emails.filter((e) => e.priority);
    else if (folder === "inbox") base = emails.filter((e) => e.folder === "inbox");
    else base = [];

    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (e) => e.from.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q)
    );
  }, [folder, query]);

  const pinned = listEmails.filter((e) => e.pinned);
  const rest = listEmails.filter((e) => !e.pinned);

  const selected = emails.find((e) => e.id === selectedId) ?? emails[0];

  const openEmail = (id: string) => {
    setSelectedId(id);
    setAttachmentsOpen(true);
    setMobileView("detail");
  };

  const selectFolder = (id: Folder) => {
    setFolder(id);
    setMobileView("list");
  };

  return (
    <PageShell title="Email" subtitle="Read and reply to messages without leaving Simplebase">
      <div className="card p-0 overflow-hidden grid grid-rows-[1fr] grid-cols-1 lg:grid-cols-[220px_340px_1fr] h-[calc(100vh-176px)] min-h-[640px]">
        {/* Accounts + folder rail */}
        <div
          className={`${
            mobileView === "nav" ? "flex" : "hidden"
          } lg:flex border-r border-charcoal flex-col min-h-0`}
        >
          <div className="flex items-center justify-between px-16 h-64 shrink-0 border-b border-charcoal">
            <div className="flex -space-x-8">
              {emailAccounts.map((a) => (
                <div
                  key={a.id}
                  className="h-32 w-32 rounded-full bg-ash border-2 border-obsidian flex items-center justify-center text-caption text-snow font-medium"
                  title={a.name}
                >
                  {a.initials}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button className="h-28 w-28 rounded-input hover:bg-white/[0.04] flex items-center justify-center transition-colors">
                <MoreVertical size={14} className="text-smoke" />
              </button>
              <button
                onClick={() => setMobileView("list")}
                className="lg:hidden h-28 w-28 rounded-input hover:bg-white/[0.04] flex items-center justify-center transition-colors"
                aria-label="Close menu"
              >
                <X size={14} className="text-smoke" />
              </button>
            </div>
          </div>

          <div className="px-16 py-16 border-b border-charcoal">
            <p className="text-body-sm text-snow font-medium truncate">{emailAccounts[0].name}</p>
            <p className="text-caption text-smoke truncate">{emailAccounts[0].email}</p>
          </div>

          <div className="px-16 pt-16">
            <button className="btn-pill-ghost w-full justify-center">
              <PenSquare size={14} />
              New email
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-16 py-16 flex flex-col gap-4">
            {folderNav.map(({ id, label, icon: Icon }) => {
              const active = folder === id;
              const count = id === "inbox" ? inboxCount : id === "priority" ? priorityCount : undefined;
              return (
                <button
                  key={id}
                  onClick={() => selectFolder(id)}
                  className={`w-full ${active ? "nav-link-active" : "nav-link"} justify-between`}
                >
                  <span className="flex items-center gap-16">
                    <Icon size={16} strokeWidth={1.5} className={active ? "text-phosphor-green" : "text-smoke"} />
                    {label}
                  </span>
                  {count !== undefined ? <span className="text-caption text-smoke">{count}</span> : null}
                </button>
              );
            })}

            <span className="px-16 pt-16 pb-8 text-caption text-smoke">Folders</span>
            {folderList.map(({ id, label, icon: Icon, count }) => {
              const active = folder === id;
              return (
                <button
                  key={id}
                  onClick={() => selectFolder(id)}
                  className={`w-full ${active ? "nav-link-active" : "nav-link"} justify-between`}
                >
                  <span className="flex items-center gap-16">
                    <Icon size={16} strokeWidth={1.5} className={active ? "text-phosphor-green" : "text-smoke"} />
                    {label}
                  </span>
                  <span className="text-caption text-smoke">{count}</span>
                </button>
              );
            })}
          </nav>

          <div className="px-16 py-16 border-t border-charcoal flex flex-col gap-4">
            <button className="nav-link w-full">
              <HelpCircle size={16} strokeWidth={1.5} className="text-smoke" />
              Help &amp; feedback
            </button>
            <button className="nav-link w-full">
              <Keyboard size={16} strokeWidth={1.5} className="text-smoke" />
              Keyboard shortcuts
            </button>
          </div>
        </div>

        {/* Message list */}
        <div
          className={`${
            mobileView === "list" ? "flex" : "hidden"
          } lg:flex border-r border-charcoal flex-col min-h-0`}
        >
          <div className="flex items-center justify-between gap-8 px-16 h-64 shrink-0 border-b border-charcoal">
            <div className="flex items-center gap-8 min-w-0">
              <button
                onClick={() => setMobileView("nav")}
                className="lg:hidden h-28 w-28 rounded-input hover:bg-white/[0.04] flex items-center justify-center shrink-0 transition-colors"
                aria-label="Open folders"
              >
                <Menu size={14} className="text-smoke" />
              </button>
              <h2 className="text-subheading text-snow capitalize truncate">{folder}</h2>
            </div>
            <div className="flex items-center rounded-input border border-charcoal overflow-hidden shrink-0">
              <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                <SlidersHorizontal size={14} className="text-smoke" />
              </button>
              <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                <RotateCw size={14} className="text-smoke" />
              </button>
              <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center transition-colors">
                <MoreHorizontal size={14} className="text-smoke" />
              </button>
            </div>
          </div>

          <div className="p-16 border-b border-charcoal">
            <div className="flex items-center gap-8 rounded-input border border-slate bg-obsidian px-16 py-8">
              <Search size={14} className="text-smoke shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none text-body-sm text-snow placeholder-smoke w-full"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {listEmails.length === 0 ? (
              <p className="text-body-sm text-smoke text-center py-40">No emails in this folder.</p>
            ) : (
              <>
                {pinned.length > 0 ? (
                  <>
                    <p className="px-16 pt-16 pb-8 text-caption text-smoke">Pinned ({pinned.length})</p>
                    {pinned.map((e) => (
                      <EmailListItem key={e.id} email={e} active={e.id === selectedId} onClick={() => openEmail(e.id)} />
                    ))}
                  </>
                ) : null}
                {rest.length > 0 ? (
                  <>
                    <p className="px-16 pt-16 pb-8 text-caption text-smoke">Inbox ({rest.length})</p>
                    {rest.map((e) => (
                      <EmailListItem key={e.id} email={e} active={e.id === selectedId} onClick={() => openEmail(e.id)} />
                    ))}
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Reading pane */}
        <div
          className={`${
            mobileView === "detail" ? "flex" : "hidden"
          } lg:flex flex-col min-h-0`}
        >
          <div className="flex items-center justify-between gap-12 px-16 h-64 shrink-0 border-b border-charcoal">
            <div className="flex items-center gap-8 min-w-0">
              <button
                onClick={() => setMobileView("list")}
                className="h-28 w-28 rounded-input border border-charcoal hover:bg-white/[0.04] flex items-center justify-center transition-colors shrink-0"
                aria-label="Back to inbox"
              >
                <ChevronLeft size={14} className="text-smoke lg:hidden" />
                <X size={14} className="text-smoke hidden lg:block" />
              </button>
              <div className="hidden sm:flex items-center rounded-input border border-charcoal overflow-hidden shrink-0">
                <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                  <ChevronLeft size={14} className="text-smoke" />
                </button>
                <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center transition-colors">
                  <ChevronRight size={14} className="text-smoke" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-8 shrink-0">
              <div className="hidden sm:flex items-center rounded-input border border-charcoal overflow-hidden">
                <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                  <Pin size={14} className="text-smoke" />
                </button>
                <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                  <Archive size={14} className="text-smoke" />
                </button>
                <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                  <Reply size={14} className="text-smoke" />
                </button>
                <button className="h-28 w-28 hover:bg-white/[0.04] flex items-center justify-center transition-colors">
                  <MoreHorizontal size={14} className="text-smoke" />
                </button>
              </div>
              <button className="h-28 w-28 rounded-input border border-red-500/20 hover:bg-red-500/10 flex items-center justify-center transition-colors">
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-24">
            <h3 className="text-heading-sm text-snow mb-4">{selected.subject}</h3>
            <p className="text-caption text-smoke mb-24">{selected.date}</p>

            <div className="flex flex-wrap items-start justify-between gap-16 pb-24 border-b border-charcoal mb-24">
              <div className="flex items-center gap-16 min-w-0">
                <div className="h-32 w-32 rounded-full bg-ash border border-charcoal flex items-center justify-center text-caption text-snow font-medium shrink-0">
                  {selected.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-body-sm text-snow font-medium truncate">{selected.from}</p>
                  <p className="text-caption text-smoke truncate">{selected.fromEmail}</p>
                </div>
              </div>
              <div className="text-caption text-smoke text-right">
                <p>To: {selected.to}</p>
                {selected.cc ? <p>Cc: {selected.cc}</p> : null}
              </div>
            </div>

            {selected.attachments.length > 0 ? (
              <div className="mb-24 pb-24 border-b border-charcoal">
                <button
                  onClick={() => setAttachmentsOpen((v) => !v)}
                  className="flex items-center gap-8 text-caption text-smoke mb-16"
                >
                  Attachments ({selected.attachments.length})
                  <ChevronDown size={12} className={`transition-transform ${attachmentsOpen ? "rotate-180" : ""}`} />
                </button>
                {attachmentsOpen ? (
                  <div className="flex flex-wrap gap-8">
                    {selected.attachments.map((att) => {
                      const AttIcon = attachmentIcon[att.type] ?? FileGeneric;
                      return (
                        <div
                          key={att.name}
                          className="flex items-center gap-8 rounded-input border border-charcoal px-16 py-8"
                        >
                          <AttIcon size={14} className="text-smoke shrink-0" />
                          <span className="text-body-sm text-snow">{att.name}</span>
                          <span className="text-caption text-smoke">{att.size}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-col gap-16">
              {selected.body.map((p, i) => (
                <p key={i} className="text-body-sm text-silver-mist leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
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
              placeholder={`Reply ${selected.from}...`}
              className="input-field flex-1"
            />
            <div className="flex items-center rounded-input border border-charcoal overflow-hidden shrink-0">
              <button type="button" className="h-32 w-36 hover:bg-white/[0.04] flex items-center justify-center border-r border-charcoal transition-colors">
                <Smile size={16} className="text-smoke" />
              </button>
              <button type="button" className="h-32 w-36 hover:bg-white/[0.04] flex items-center justify-center transition-colors">
                <Paperclip size={16} className="text-smoke" />
              </button>
            </div>
            <button type="submit" className="h-32 w-32 rounded-input bg-phosphor-green hover:bg-mint-pulse flex items-center justify-center shrink-0">
              <Send size={16} className="text-ink" />
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}

function EmailListItem({
  email,
  active,
  onClick,
}: {
  email: (typeof emails)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-16 py-16 border-b border-charcoal border-l-2 transition-colors ${
        active ? "bg-ash border-l-phosphor-green" : "border-l-transparent hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center justify-between gap-8 mb-4">
        <span className="flex items-center gap-8 min-w-0">
          <span className="text-body-sm text-snow font-medium truncate">{email.from}</span>
          {email.unread ? <span className="h-6 w-6 rounded-full bg-sky-400 shrink-0" /> : null}
        </span>
        <span className="text-caption text-smoke shrink-0">{email.time}</span>
      </div>
      <p className="text-body-sm text-snow truncate mb-4">{email.subject}</p>
      <p className="text-caption text-smoke line-clamp-2">{email.preview}</p>
    </button>
  );
}
