"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Bell, Github, User, Settings, LogOut } from "lucide-react";
import { notifications as allNotifications } from "@/lib/data";
import { avatarUrl, CURRENT_USER_SEED } from "@/lib/avatar";
import ThemeToggle from "./ThemeToggle";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = allNotifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 border-b border-charcoal bg-obsidian/95 backdrop-blur">
      <div className="flex items-center justify-between gap-16 px-24 md:px-32 h-64">
        <div className="min-w-0">
          <h1 className="text-subheading text-snow truncate">{title}</h1>
          {subtitle ? (
            <p className="text-caption text-smoke truncate">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-16">
          <div className="hidden lg:flex items-center gap-8 rounded-input border border-slate bg-obsidian px-16 py-8 w-[260px]">
            <Search size={14} className="text-smoke shrink-0" />
            <input
              placeholder="Search..."
              className="bg-transparent outline-none text-body-sm text-snow placeholder-smoke w-full"
            />
          </div>

          <button
            className="pill-tag hidden sm:inline-flex"
            aria-label="GitHub stars"
          >
            <Github size={12} />
            2.4k
          </button>

          <ThemeToggle />

          {/* Notifications dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setProfileOpen(false);
              }}
              className="relative h-32 w-32 rounded-button border border-slate flex items-center justify-center hover:border-graphite transition-colors"
              aria-label="Notifications"
            >
              <Bell size={14} className="text-silver-mist" />
              {unreadCount > 0 ? (
                <span className="absolute top-6 right-7 h-6 w-6 rounded-full bg-phosphor-green" />
              ) : null}
            </button>

            {notifOpen ? (
              <div className="absolute right-0 mt-8 w-[320px] rounded-card border border-charcoal bg-obsidian shadow-xl overflow-hidden">
                <div className="flex items-center justify-between px-16 py-16 border-b border-charcoal">
                  <span className="text-body-sm text-snow font-medium">
                    Notifications
                  </span>
                  {unreadCount > 0 ? (
                    <span className="text-caption text-phosphor-green">
                      {unreadCount} new
                    </span>
                  ) : null}
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {allNotifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-8 px-16 py-16 border-b border-charcoal last:border-0 hover:bg-ash/50 transition-colors"
                    >
                      <span
                        className={`mt-6 h-6 w-6 rounded-full shrink-0 ${
                          n.unread ? "bg-phosphor-green" : "bg-transparent"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-body-sm text-snow truncate">
                          {n.title}
                        </p>
                        <p className="text-caption text-smoke truncate">
                          {n.desc}
                        </p>
                        <p className="text-caption text-smoke mt-2">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-16 py-8 border-t border-charcoal">
                  <button className="text-caption text-mint-pulse hover:underline w-full text-center">
                    Mark all as read
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((v) => !v);
                setNotifOpen(false);
              }}
              className="h-32 w-32 rounded-full border border-slate overflow-hidden"
              aria-label="Account menu"
            >
              <img
                src={avatarUrl(CURRENT_USER_SEED)}
                alt="Sal Pribadi"
                className="h-full w-full object-cover"
              />
            </button>

            {profileOpen ? (
              <div className="absolute right-0 mt-8 w-[220px] rounded-card border border-charcoal bg-obsidian shadow-xl overflow-hidden">
                <div className="flex items-center gap-16 px-16 py-16 border-b border-charcoal">
                  <div className="h-32 w-32 rounded-full border border-slate shrink-0 overflow-hidden">
                    <img
                      src={avatarUrl(CURRENT_USER_SEED)}
                      alt="Sal Pribadi"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-sm text-snow truncate">
                      Sal Pribadi
                    </p>
                    <p className="text-caption text-smoke truncate">Pro plan</p>
                  </div>
                </div>
                <div className="py-8 flex flex-col">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-16 px-16 py-8 text-body-sm text-silver-mist hover:bg-white/[0.04] hover:text-snow transition-colors"
                  >
                    <User size={14} />
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-16 px-16 py-8 text-body-sm text-silver-mist hover:bg-white/[0.04] hover:text-snow transition-colors"
                  >
                    <Settings size={14} />
                    Settings
                  </Link>
                </div>
                <div className="py-8 border-t border-charcoal">
                  <Link
                    href="/login"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-16 px-16 py-8 text-body-sm text-silver-mist hover:bg-white/[0.04] hover:text-snow transition-colors"
                  >
                    <LogOut size={14} />
                    Log out
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
