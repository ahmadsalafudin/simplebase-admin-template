"use client";

import Link from "next/link";
import { CloudOff } from "lucide-react";

export default function Error503Page() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-24 py-64">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-32 text-center">
        <div className="h-64 w-64 rounded-input bg-ash border border-charcoal flex items-center justify-center">
          <CloudOff size={28} className="text-phosphor-green" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-16">
          <h1 className="text-display text-snow leading-none">
            5<span className="text-phosphor-green">0</span>3
          </h1>
          <div className="flex flex-col gap-8">
            <h2 className="text-heading-sm text-snow">Service unavailable</h2>
            <p className="text-body-sm text-smoke">
              We&apos;re temporarily down for scheduled maintenance. Please check back in a few
              minutes.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16">
          <Link href="/dashboard" className="btn-pill-primary">
            Back to dashboard
          </Link>
          <button type="button" onClick={() => window.location.reload()} className="btn-pill-ghost">
            Refresh
          </button>
        </div>

        <div className="card-ash w-full text-left">
          <p className="text-caption text-smoke font-mono">
            <span className="text-phosphor-green">$</span> GET /api/status{" "}
            <span className="text-silver-mist">→</span> 503 Service Unavailable
          </p>
        </div>
      </div>
    </div>
  );
}
