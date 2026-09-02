"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { Check, CreditCard } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "For side projects and getting started",
    features: ["2 projects", "500 MB database", "Community support"],
  },
  {
    name: "Pro",
    price: "$25",
    period: "/month",
    description: "For production workloads that need to scale",
    features: [
      "Unlimited projects",
      "8 GB database",
      "Daily backups",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Team",
    price: "$599",
    period: "/month",
    description: "For teams that need SSO, roles, and SLAs",
    features: [
      "Everything in Pro",
      "SSO / SAML",
      "Role-based access",
      "SOC2 report",
    ],
  },
];

export default function PurchasePage() {
  const [selected, setSelected] = useState("Pro");

  return (
    <PageShell title="Purchase" subtitle="Choose a plan and complete checkout">
      <div className="flex flex-col gap-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {plans.map((plan) => {
            const active = selected === plan.name;
            return (
              <button
                key={plan.name}
                onClick={() => setSelected(plan.name)}
                className={`text-left flex flex-col gap-24 rounded-card border p-24 transition-colors ${
                  active
                    ? "border-phosphor-green bg-obsidian"
                    : "border-charcoal bg-obsidian hover:border-graphite"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-subheading text-snow">{plan.name}</span>
                  {plan.highlighted ? (
                    <span className="pill-tag">Popular</span>
                  ) : null}
                </div>
                <div>
                  <span className="text-heading-sm text-snow">
                    {plan.price}
                  </span>
                  <span className="text-body-sm text-smoke">{plan.period}</span>
                </div>
                <p className="text-body-sm text-smoke">{plan.description}</p>
                <div className="flex flex-col gap-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-8">
                      <Check
                        size={14}
                        className="text-phosphor-green shrink-0"
                      />
                      <span className="text-body-sm text-silver-mist">{f}</span>
                    </div>
                  ))}
                </div>
                <div
                  className={`mt-8 h-8 w-8 rounded-full border ${
                    active
                      ? "bg-phosphor-green border-phosphor-green"
                      : "border-slate"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="card lg:col-span-2 flex flex-col gap-24">
            <div className="flex items-center gap-16">
              <div className="h-32 w-32 rounded-input bg-ash border border-charcoal flex items-center justify-center">
                <CreditCard size={16} className="text-phosphor-green" />
              </div>
              <h2 className="text-subheading text-snow">Payment details</h2>
            </div>
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">
                  Card number
                </label>
                <input
                  className="input-field"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              <div className="grid grid-cols-2 gap-16">
                <div className="flex flex-col gap-8">
                  <label className="text-caption text-silver-mist">
                    Expiry
                  </label>
                  <input className="input-field" placeholder="MM / YY" />
                </div>
                <div className="flex flex-col gap-8">
                  <label className="text-caption text-silver-mist">CVC</label>
                  <input className="input-field" placeholder="123" />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <label className="text-caption text-silver-mist">
                  Cardholder name
                </label>
                <input className="input-field" placeholder="Sal Pribadi" />
              </div>
            </div>
          </div>

          <div className="card flex flex-col gap-24 h-fit">
            <h2 className="text-subheading text-snow">Order summary</h2>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-silver-mist">
                {selected} plan
              </span>
              <span className="text-body-sm text-snow">
                {plans.find((p) => p.name === selected)?.price}/mo
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-silver-mist">Tax</span>
              <span className="text-body-sm text-snow">$0.00</span>
            </div>
            <div className="h-px bg-charcoal" />
            <div className="flex items-center justify-between">
              <span className="text-body-sm text-snow">Due today</span>
              <span className="text-subheading text-snow">
                {plans.find((p) => p.name === selected)?.price}
              </span>
            </div>
            <button className="btn-pill-primary w-full mt-8">
              Confirm and pay
            </button>
            <p className="text-caption text-smoke text-center">
              You can cancel or change your plan anytime.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
