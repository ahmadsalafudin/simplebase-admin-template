"use client";

import Link from "next/link";
import { Terminal, Github, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-24 py-64">
      <div className="w-full max-w-[400px] flex flex-col gap-32">
        <div className="flex flex-col items-center gap-16 text-center">
          <div className="h-40 w-40 rounded-input bg-phosphor-green flex items-center justify-center">
            <Terminal size={20} className="text-ink" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-heading-sm text-snow">Welcome back</h1>
            <p className="text-body-sm text-smoke">Sign in to your simplebase to keep working</p>
          </div>
        </div>

        <div className="card flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <button className="btn-pill-ghost w-full">
              <Github size={14} />
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-16">
            <div className="h-px flex-1 bg-charcoal" />
            <span className="text-caption text-smoke">or</span>
            <div className="h-px flex-1 bg-charcoal" />
          </div>

          <form className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <label htmlFor="email" className="text-caption text-silver-mist">
                Email
              </label>
              <input id="email" type="email" placeholder="you@company.com" className="input-field" />
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-caption text-silver-mist">
                  Password
                </label>
                <Link href="/forgot-password" className="text-caption text-mint-pulse hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input id="password" type="password" placeholder="••••••••" className="input-field" />
            </div>

            <Link href="/dashboard" className="btn-pill-primary w-full mt-8">
              Sign in
            </Link>
          </form>
        </div>

        <p className="text-center text-body-sm text-smoke">
          Don&apos;t have an account?{" "}
          <Link href="#" className="text-mint-pulse hover:underline">
            Start your project
          </Link>
        </p>

        <p className="text-center text-caption text-smoke flex items-center justify-center gap-8">
          <Mail size={12} />
          Need help? support@simplebase.dev
        </p>
      </div>
    </div>
  );
}
