"use client";

import { useState } from "react";
import Link from "next/link";
import { Terminal, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-24 py-64">
      <div className="w-full max-w-[400px] flex flex-col gap-32">
        <div className="flex flex-col items-center gap-16 text-center">
          <div className="h-40 w-40 rounded-input bg-phosphor-green flex items-center justify-center">
            <Terminal size={20} className="text-ink" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-heading-sm text-snow">Forgot password</h1>
            <p className="text-body-sm text-smoke">
              {sent
                ? "Check your inbox for a link to reset your password"
                : "Enter your email and we'll send you a reset link"}
            </p>
          </div>
        </div>

        <div className="card flex flex-col gap-24">
          {sent ? (
            <div className="flex flex-col items-center gap-16 text-center py-16">
              <div className="h-48 w-48 rounded-full bg-ash border border-charcoal flex items-center justify-center">
                <CheckCircle2 size={22} className="text-phosphor-green" />
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-body-sm text-snow">Reset link sent</p>
                <p className="text-caption text-smoke">
                  We&apos;ve sent a password reset link to{" "}
                  <span className="text-silver-mist">{email || "your email"}</span>. It may take a
                  few minutes to arrive.
                </p>
              </div>
              <button onClick={() => setSent(false)} className="btn-pill-ghost w-full mt-8">
                Use a different email
              </button>
            </div>
          ) : (
            <form
              className="flex flex-col gap-16"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="flex flex-col gap-8">
                <label htmlFor="email" className="text-caption text-silver-mist">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn-pill-primary w-full mt-8">
                Send reset link
              </button>
            </form>
          )}
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center gap-8 text-body-sm text-smoke hover:text-snow transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>

        <p className="text-center text-caption text-smoke flex items-center justify-center gap-8">
          <Mail size={12} />
          Need help? support@simplebase.dev
        </p>
      </div>
    </div>
  );
}
