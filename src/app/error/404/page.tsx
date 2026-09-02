"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileQuestion } from "lucide-react";

export default function Error404Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-24 py-64">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-32 text-center">
        <div className="h-64 w-64 rounded-input bg-ash border border-charcoal flex items-center justify-center">
          <FileQuestion size={28} className="text-phosphor-green" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-16">
          <h1 className="text-display text-snow leading-none">
            4<span className="text-phosphor-green">0</span>4
          </h1>
          <div className="flex flex-col gap-8">
            <h2 className="text-heading-sm text-snow">Page not found</h2>
            <p className="text-body-sm text-smoke">
              The page you&apos;re looking for doesn&apos;t exist, was moved, or the URL was
              typed incorrectly.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-16">
          <Link href="/dashboard" className="btn-pill-primary">
            Back to dashboard
          </Link>
          <button type="button" onClick={() => router.back()} className="btn-pill-ghost">
            Go back
          </button>
        </div>

        <div className="card-ash w-full text-left">
          <p className="text-caption text-smoke font-mono">
            <span className="text-phosphor-green">$</span> GET /requested-page{" "}
            <span className="text-silver-mist">→</span> 404 Not Found
          </p>
        </div>
      </div>
    </div>
  );
}
