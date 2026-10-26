"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileSidebar } from "./MobileSidebarContext";
import {
  LayoutDashboard,
  Calendar,
  HardDrive,
  Package,
  CreditCard,
  Store,
  Truck,
  Mail,
  MessageSquare,
  Users,
  AppWindow,
  Settings,
  Terminal,
  CheckSquare,
  AlertTriangle,
  ChevronDown,
  X,
  Heart,
  BookOpen,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";
import { chatContacts, emails } from "@/lib/data";

type SidebarLinkProps = {
  href: string;
  label: string;
  icon?: LucideIcon;
  active: boolean;
  badge?: number;
  nested?: boolean;
};

function SidebarLink({ href, label, icon: Icon, active, badge, nested = false }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`${nested ? (active ? "nav-sublink-active" : "nav-sublink") : active ? "nav-link-active" : "nav-link"} justify-between`}
    >
      <span className="flex min-w-0 items-center gap-16">
        {Icon ? (
          <Icon
            size={16}
            strokeWidth={1.5}
            className={active ? "text-phosphor-green" : "text-smoke"}
          />
        ) : nested ? (
          <span className={`h-6 w-6 rounded-full shrink-0 ${active ? "bg-phosphor-green" : "bg-graphite"}`} />
        ) : null}
        <span className="truncate">{label}</span>
      </span>
      {badge ? (
        <span className="ml-8 rounded-full bg-charcoal px-8 py-2 text-caption text-silver-mist">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

function DisabledSidebarLink({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <span aria-disabled="true" className="nav-link cursor-not-allowed opacity-50">
      <Icon size={16} strokeWidth={1.5} className="text-smoke" />
      {label}
    </span>
  );
}

const errorItems = [
  { href: "/error/404", label: "Error 404" },
  { href: "/error/500", label: "Error 500" },
  { href: "/error/503", label: "Error 503" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isErrorRoute = pathname.startsWith("/error");
  const [errorOpen, setErrorOpen] = useState(isErrorRoute);
  const [shopOpen, setShopOpen] = useState(pathname === "/marketplace");
  const [settingsOpen, setSettingsOpen] = useState(
    pathname === "/settings" || pathname === "/profile",
  );
  const { open, setOpen } = useMobileSidebar();
  const unreadEmailCount = emails.filter((email) => email.unread).length;
  const unreadChatCount = chatContacts.reduce((total, chat) => total + chat.unread, 0);

  useEffect(() => {
    if (isErrorRoute) setErrorOpen(true);
  }, [isErrorRoute]);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* Backdrop, mobile only */}
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[240px] shrink-0 border-r border-charcoal bg-obsidian h-screen transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-auto md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-64 flex items-center justify-between gap-8 px-24 border-b border-charcoal">
          <div className="flex items-center gap-8 min-w-0">
            <div className="h-24 w-24 rounded-input bg-phosphor-green flex items-center justify-center shrink-0">
              <Terminal size={14} className="text-ink" strokeWidth={2.5} />
            </div>
            <span className="text-body-sm font-medium text-snow truncate">simplebase</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden h-28 w-28 rounded-input hover:bg-white/[0.04] flex items-center justify-center shrink-0 transition-colors"
            aria-label="Close menu"
          >
            <X size={16} className="text-smoke" />
          </button>
        </div>

      <nav className="flex-1 overflow-y-auto px-16 py-24 flex flex-col gap-8">
        <SidebarLink href="/dashboard" label="Dashboard" icon={LayoutDashboard} active={pathname === "/dashboard"} />

        <span className="px-16 pt-16 pb-8 text-caption text-smoke">Operational</span>
        <SidebarLink href="/shipments" label="Shipments" icon={Truck} active={pathname === "/shipments"} />
        <SidebarLink href="/ecommerce" label="Inventory" icon={Package} active={pathname === "/ecommerce"} />
        <SidebarLink href="/receipt" label="Payments" icon={CreditCard} active={pathname === "/receipt"} />
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setShopOpen((value) => !value)}
            aria-expanded={shopOpen}
            className={`w-full justify-between ${pathname === "/marketplace" || pathname === "/purchase" ? "nav-link-active" : "nav-link"}`}
          >
            <span className="flex items-center gap-16">
              <Store size={16} strokeWidth={1.5} className={pathname === "/marketplace" || pathname === "/purchase" ? "text-phosphor-green" : "text-smoke"} />
              My Shop
            </span>
            <ChevronDown size={14} className={`text-smoke transition-transform duration-150 ${shopOpen ? "rotate-180" : ""}`} />
          </button>
          <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out overflow-hidden ${shopOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="min-h-0 flex flex-col gap-4">
              <SidebarLink href="/marketplace" label="Marketplace" active={pathname === "/marketplace"} nested />
              <SidebarLink href="/purchase" label="Purchase" active={pathname === "/purchase"} nested />
            </div>
          </div>
        </div>

        <span className="px-16 pt-16 pb-8 text-caption text-smoke">Communication</span>
        <SidebarLink href="/email" label="Email" icon={Mail} active={pathname === "/email"} badge={unreadEmailCount} />
        <SidebarLink href="/chat" label="Chats" icon={MessageSquare} active={pathname === "/chat"} badge={unreadChatCount} />

        <span className="px-16 pt-16 pb-8 text-caption text-smoke">Productivity</span>
        <SidebarLink href="/calendar" label="Calendar" icon={Calendar} active={pathname === "/calendar"} />
        <SidebarLink href="/timeline" label="Tasks" icon={CheckSquare} active={pathname === "/timeline"} />
        <SidebarLink href="/drive" label="Drive" icon={HardDrive} active={pathname === "/drive"} />

        <span className="px-16 pt-16 pb-8 text-caption text-smoke">Administration</span>
        <SidebarLink href="/users" label="Users" icon={Users} active={pathname === "/users"} />
        <SidebarLink href="/marketplace" label="Apps" icon={AppWindow} active={false} />
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setSettingsOpen((value) => !value)}
            aria-expanded={settingsOpen}
            className={`w-full justify-between ${pathname === "/settings" || pathname === "/profile" ? "nav-link-active" : "nav-link"}`}
          >
            <span className="flex items-center gap-16">
              <Settings size={16} strokeWidth={1.5} className={pathname === "/settings" || pathname === "/profile" ? "text-phosphor-green" : "text-smoke"} />
              Settings
            </span>
            <ChevronDown size={14} className={`text-smoke transition-transform duration-150 ${settingsOpen ? "rotate-180" : ""}`} />
          </button>
          <div className={`grid transition-[grid-template-rows] duration-200 ease-in-out overflow-hidden ${settingsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="min-h-0 flex flex-col gap-4">
              <SidebarLink href="/settings" label="Preferences" active={pathname === "/settings"} nested />
              <SidebarLink href="/profile" label="Profile" active={pathname === "/profile"} nested />
            </div>
          </div>
        </div>

        <span className="px-16 pt-16 pb-8 text-caption text-smoke">Documentation</span>
        <DisabledSidebarLink label="Component" icon={BookOpen} />
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setErrorOpen((v) => !v)}
            aria-expanded={errorOpen}
            className={`w-full justify-between ${isErrorRoute ? "nav-link-active" : "nav-link"}`}
          >
            <span className="flex items-center gap-16">
              <AlertTriangle
                size={16}
                strokeWidth={1.5}
                className={isErrorRoute ? "text-phosphor-green" : "text-smoke"}
              />
              Errors
            </span>
            <ChevronDown
              size={14}
              className={`text-smoke transition-transform duration-150 ${errorOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-200 ease-in-out overflow-hidden ${
              errorOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="min-h-0 flex flex-col gap-4">
              {errorItems.map(({ href, label }) => (
                <SidebarLink key={href} href={href} label={label} active={pathname === href} nested />
              ))}
            </div>
          </div>
        </div>
        <DisabledSidebarLink label="Help Center" icon={LifeBuoy} />
      </nav>

      <div className="px-16 py-24 border-t border-charcoal">
        <a
          href="https://sociabuzz.com/ahmadsalafudin/tribe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-8 w-full rounded-button bg-phosphor-green py-12 px-16 text-body-sm font-medium text-ink hover:bg-mint-pulse transition-colors"
        >
          <Heart size={16} className="fill-ink" />
          Support me
        </a>
      </div>
      </aside>
    </>
  );
}
