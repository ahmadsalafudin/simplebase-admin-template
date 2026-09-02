"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import StatCard from "@/components/StatCard";
import { products, orders } from "@/lib/data";
import {
  DollarSign,
  ShoppingBag,
  PackageCheck,
  Users2,
  Plus,
  MoreHorizontal,
} from "lucide-react";

const productStatusStyle: Record<string, string> = {
  Active: "text-phosphor-green",
  "Low stock": "text-silver-mist",
  "Out of stock": "text-smoke",
};

const orderStatusStyle: Record<string, string> = {
  Processing: "text-silver-mist",
  Shipped: "text-phosphor-green",
  Delivered: "text-phosphor-green",
  Cancelled: "text-smoke",
};

const tabs = ["Products", "Orders"];

export default function EcommercePage() {
  const [active, setActive] = useState("Products");

  return (
    <PageShell title="Ecommerce" subtitle="Manage your storefront, products, and orders">
      <div className="flex flex-col gap-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
          <StatCard label="Total revenue" value="$48,290" delta="+12.4%" icon={DollarSign} />
          <StatCard label="Orders this month" value="312" delta="+8.1%" icon={ShoppingBag} />
          <StatCard label="Products in stock" value="1,024" delta="-2.3%" positive={false} icon={PackageCheck} />
          <StatCard label="Active customers" value="2,140" delta="+5.6%" icon={Users2} />
        </div>

        <div className="flex items-center gap-8 overflow-x-auto pb-8 border-b border-charcoal">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 rounded-button px-16 py-8 text-body-sm transition-colors ${
                active === tab
                  ? "bg-ash text-snow border border-charcoal"
                  : "text-smoke hover:text-silver-mist"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {active === "Products" ? (
          <div className="card p-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-24 py-16 border-b border-charcoal">
              <h2 className="text-subheading text-snow">Products</h2>
              <button className="btn-pill-primary !px-16 !py-8">
                <Plus size={14} />
                Add product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Product</th>
                    <th className="table-th">Category</th>
                    <th className="table-th">Price</th>
                    <th className="table-th">Stock</th>
                    <th className="table-th">Sold</th>
                    <th className="table-th">Status</th>
                    <th className="table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-ash/50 transition-colors">
                      <td className="table-td">
                        <div className="flex items-center gap-16">
                          <div className="h-32 w-32 rounded-input bg-charcoal shrink-0" />
                          <span className="text-snow truncate">{p.name}</span>
                        </div>
                      </td>
                      <td className="table-td">{p.category}</td>
                      <td className="table-td">{p.price}</td>
                      <td className="table-td">{p.stock}</td>
                      <td className="table-td">{p.sold}</td>
                      <td className="table-td">
                        <span className={productStatusStyle[p.status]}>● {p.status}</span>
                      </td>
                      <td className="table-td text-right">
                        <button className="h-32 w-32 rounded-input hover:bg-white/[0.04] flex items-center justify-center ml-auto">
                          <MoreHorizontal size={14} className="text-smoke" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {active === "Orders" ? (
          <div className="card p-0 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-24 py-16 border-b border-charcoal">
              <h2 className="text-subheading text-snow">Recent orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="table-th">Order</th>
                    <th className="table-th">Customer</th>
                    <th className="table-th">Date</th>
                    <th className="table-th">Items</th>
                    <th className="table-th">Total</th>
                    <th className="table-th">Status</th>
                    <th className="table-th"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-ash/50 transition-colors">
                      <td className="table-td font-mono text-caption text-snow">{o.id}</td>
                      <td className="table-td">{o.customer}</td>
                      <td className="table-td">{o.date}</td>
                      <td className="table-td">{o.items}</td>
                      <td className="table-td text-snow">{o.total}</td>
                      <td className="table-td">
                        <span className={orderStatusStyle[o.status]}>● {o.status}</span>
                      </td>
                      <td className="table-td text-right">
                        <button className="h-32 w-32 rounded-input hover:bg-white/[0.04] flex items-center justify-center ml-auto">
                          <MoreHorizontal size={14} className="text-smoke" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>
    </PageShell>
  );
}
