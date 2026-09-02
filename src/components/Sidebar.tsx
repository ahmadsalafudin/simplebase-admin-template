"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { avatarUrl, CURRENT_USER_SEED } from "@/lib/avatar";
import {
  LayoutDashboard,
  User,
  Calendar,
  HardDrive,
  ShoppingCart,
  ShoppingBag,
  Truck,
  MessageSquare,
  Mail,
  Users,
  Receipt,
  Settings,
  Terminal,
  KanbanSquare,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/timeline", label: "Project Timeline", icon: KanbanSquare },
  { href: "/drive", label: "Drive", icon: HardDrive },
  { href: "/ecommerce", label: "Ecommerce", icon: ShoppingBag },
  { href: "/shipments", label: "Shipments", icon: Truck },
  { href: "/chat", label: "Chat", icon: MessageSquare },
  { href: "/email", label: "Email", icon: Mail },
  { href: "/purchase", label: "Purchase", icon: ShoppingCart },
  { href: "/users", label: "Users", icon: Users },
  { href: "/receipt", label: "Receipts", icon: Receipt },
];

const errorItems = [
  { href: "/error/404", label: "Error 404" },
  { href: "/error/500", label: "Error 500" },
  { href: "/error/503", label: "Error 503" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isErrorRoute = pathname.startsWith("/error");
  const [errorOpen, setErrorOpen] = useState(isErrorRoute);

  useEffect(() => {
    if (isErrorRoute) setErrorOpen(true);
  }, [isErrorRoute]);

  return (
    <aside className="hidden md:flex md:flex-col w-[240px] shrink-0 border-r border-charcoal bg-obsidian h-screen sticky top-0">
      <div className="h-64 flex items-center gap-8 px-24 border-b border-charcoal">
        <div className="h-24 w-24 rounded-input bg-phosphor-green flex items-center justify-center">
          <Terminal size={14} className="text-ink" strokeWidth={2.5} />
        </div>
        <span className="text-body-sm font-medium text-snow">simplebase</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-16 py-24 flex flex-col gap-8">
        <span className="px-16 pb-8 text-caption text-smoke">Workspace</span>
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={active ? "nav-link-active" : "nav-link"}
            >
              <Icon
                size={16}
                strokeWidth={1.5}
                className={active ? "text-phosphor-green" : "text-smoke"}
              />
              {label}
            </Link>
          );
        })}

        {/* Error pages dropdown */}
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
              Error Pages
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
              {errorItems.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={active ? "nav-sublink-active" : "nav-sublink"}
                  >
                    <span
                      className={`h-6 w-6 rounded-full shrink-0 ${active ? "bg-phosphor-green" : "bg-graphite"}`}
                    />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Link
          href="/settings"
          className={pathname === "/settings" ? "nav-link-active" : "nav-link"}
        >
          <Settings
            size={16}
            strokeWidth={1.5}
            className={
              pathname === "/settings" ? "text-phosphor-green" : "text-smoke"
            }
          />
          Settings
        </Link>
      </nav>

      <div className="px-16 py-24 border-t border-charcoal">
        <div className="card-ash flex items-center gap-16">
          <div className="h-32 w-32 rounded-full shrink-0 overflow-hidden">
            <img
              src={avatarUrl(CURRENT_USER_SEED)}
              alt="Sal Pribadi"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-body-sm text-snow truncate">Sal Pribadi</p>
            <p className="text-caption text-smoke truncate">Pro plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
