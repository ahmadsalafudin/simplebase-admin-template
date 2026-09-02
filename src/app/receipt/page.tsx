"use client";

import PageShell from "@/components/PageShell";
import { invoices } from "@/lib/data";
import { Download, CreditCard, Printer } from "lucide-react";

const statusStyle: Record<string, string> = {
  Paid: "text-phosphor-green",
  Refunded: "text-smoke",
  Pending: "text-silver-mist",
};

export default function ReceiptPage() {
  return (
    <PageShell title="Receipts" subtitle="Payment history and billing details">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 card p-0 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-24 py-16 border-b border-charcoal">
            <h2 className="text-subheading text-snow">Invoice history</h2>
            <button className="btn-pill-ghost !px-16 !py-8">
              <Download size={14} />
              Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="table-th">Invoice</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">Plan</th>
                  <th className="table-th">Amount</th>
                  <th className="table-th">Status</th>
                  <th className="table-th"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="hover:bg-ash/50 transition-colors"
                  >
                    <td className="table-td font-mono text-caption text-snow">
                      {inv.id}
                    </td>
                    <td className="table-td">{inv.date}</td>
                    <td className="table-td">{inv.plan}</td>
                    <td className="table-td text-snow">{inv.amount}</td>
                    <td className="table-td">
                      <span className={statusStyle[inv.status]}>
                        ● {inv.status}
                      </span>
                    </td>
                    <td className="table-td text-right">
                      <button className="inline-flex items-center gap-8 text-caption text-mint-pulse hover:underline">
                        <Download size={12} />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <div className="card flex flex-col gap-16">
            <div className="flex items-center gap-16">
              <div className="h-32 w-32 rounded-input bg-ash border border-charcoal flex items-center justify-center">
                <CreditCard size={16} className="text-phosphor-green" />
              </div>
              <h2 className="text-subheading text-snow">Payment method</h2>
            </div>
            <div className="rounded-input border border-charcoal bg-ash px-16 py-16 flex items-center justify-between">
              <div>
                <p className="text-body-sm text-snow">Visa ending in 4417</p>
                <p className="text-caption text-smoke">Expires 08/28</p>
              </div>
              <span className="pill-tag">Default</span>
            </div>
            <button className="btn-pill-ghost w-full">
              Update payment method
            </button>
          </div>

          <div className="card flex flex-col gap-16">
            <h2 className="text-subheading text-snow">Latest receipt</h2>
            <div className="flex flex-col gap-8 text-body-sm">
              <div className="flex items-center justify-between">
                <span className="text-smoke">Invoice</span>
                <span className="text-snow font-mono text-caption">
                  {invoices[0].id}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-smoke">Billed to</span>
                <span className="text-snow">Sal Pribadi</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-smoke">Plan</span>
                <span className="text-snow">{invoices[0].plan}</span>
              </div>
              <div className="h-px bg-charcoal my-8" />
              <div className="flex items-center justify-between">
                <span className="text-snow">Total paid</span>
                <span className="text-subheading text-snow">
                  {invoices[0].amount}
                </span>
              </div>
            </div>
            <button className="btn-pill-primary w-full">
              <Printer size={14} />
              Print receipt
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
