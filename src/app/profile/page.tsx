"use client";

import PageShell from "@/components/PageShell";
import { avatarUrl, CURRENT_USER_SEED } from "@/lib/avatar";
import {
  Camera,
  Github,
  Twitter,
  Globe,
  ShieldCheck,
  KeyRound,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <PageShell
      title="Profile"
      subtitle="Manage how you appear across your workspace"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left: avatar + summary */}
        <div className="card flex flex-col items-center gap-16 text-center h-fit">
          <div className="relative">
            <div className="h-96 w-96 rounded-full overflow-hidden">
              <img
                src={avatarUrl(CURRENT_USER_SEED, 192)}
                alt="Sal Pribadi"
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-phosphor-green border-4 border-obsidian flex items-center justify-center">
              <Camera size={14} className="text-ink" />
            </button>
          </div>
          <div>
            <h2 className="text-subheading text-snow">Sal Pribadi</h2>
            <p className="text-caption text-smoke">
              salpribadi.dev@gmail.com
            </p>
          </div>
          <span className="pill-tag">
            <ShieldCheck size={12} className="text-phosphor-green" />
            Owner · Verified
          </span>

          <div className="w-full h-px bg-charcoal my-8" />

          <div className="flex items-center gap-8 w-full justify-center">
            <a className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
              <Github size={14} className="text-silver-mist" />
            </a>
            <a className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
              <Twitter size={14} className="text-silver-mist" />
            </a>
            <a className="h-32 w-32 rounded-input border border-slate flex items-center justify-center hover:border-graphite">
              <Globe size={14} className="text-silver-mist" />
            </a>
          </div>
        </div>

        {/* Right: forms */}
        <div className="lg:col-span-2 flex flex-col gap-16">
          <div className="card flex flex-col gap-24">
            <h2 className="text-subheading text-snow">Personal information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">
                  Full name
                </label>
                <input className="input-field" defaultValue="Sal Pribadi" />
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">
                  Display name
                </label>
                <input className="input-field" defaultValue="Salx" />
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">Email</label>
                <input
                  className="input-field"
                  defaultValue="salpribadi.dev@gmail.com"
                />
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">Role</label>
                <input
                  className="input-field"
                  defaultValue="Software Developer"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-8">
                <label className="text-caption text-silver-mist">Bio</label>
                <textarea
                  className="input-field resize-none h-[88px]"
                  defaultValue="Building admin tools and client platforms at Rukatek Mandiri."
                />
              </div>
            </div>
            <div className="flex justify-end gap-8">
              <button className="btn-pill-ghost">Cancel</button>
              <button className="btn-pill-primary">Save changes</button>
            </div>
          </div>

          <div className="card flex flex-col gap-24">
            <div className="flex items-center gap-16">
              <div className="h-32 w-32 rounded-input bg-ash border border-charcoal flex items-center justify-center">
                <KeyRound size={16} className="text-phosphor-green" />
              </div>
              <div>
                <h2 className="text-subheading text-snow">
                  Password &amp; security
                </h2>
                <p className="text-caption text-smoke">
                  Update your password and two-factor settings
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">
                  New password
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-input border border-charcoal bg-ash px-16 py-16">
              <div>
                <p className="text-body-sm text-snow">
                  Two-factor authentication
                </p>
                <p className="text-caption text-smoke">
                  Add an extra layer of security to your account
                </p>
              </div>
              <button className="btn-pill-ghost">Enable</button>
            </div>
            <div className="flex justify-end">
              <button className="btn-pill-primary">Update password</button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
