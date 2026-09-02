"use client";

import { useMemo, useState } from "react";
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
  List,
  LayoutGrid,
  Search,
  Keyboard,
  Monitor,
  Cable,
  Armchair,
  Headphones,
  Package,
  type LucideIcon,
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

// Visual treatment per product category — icon + soft tinted panel,
// standing in for a real product photo.
const categoryVisual: Record<string, { icon: LucideIcon; bg: string; fg: string }> = {
  Peripherals: { icon: Keyboard, bg: "bg-sky-500/10", fg: "text-sky-400" },
  Displays: { icon: Monitor, bg: "bg-violet-500/10", fg: "text-violet-400" },
  Accessories: { icon: Cable, bg: "bg-amber-500/10", fg: "text-amber-400" },
  Furniture: { icon: Armchair, bg: "bg-orange-500/10", fg: "text-orange-400" },
  Audio: { icon: Headphones, bg: "bg-phosphor-green/10", fg: "text-phosphor-green" },
};
const defaultVisual = { icon: Package, bg: "bg-charcoal", fg: "text-smoke" };

const tabs = ["Products", "Orders"];
type ProductView = "list" | "grid";

export default function EcommercePage() {
  const [active, setActive] = useState("Products");
  const [view, setView] = useState<ProductView>("grid");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [query]);

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
            <div className="flex flex-wrap items-center justify-between gap-16 px-24 py-16 border-b border-charcoal">
              <h2 className="text-subheading text-snow">Products</h2>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 rounded-button border border-slate p-4">
                  <button
                    onClick={() => setView("list")}
                    aria-label="List view"
                    title="List view"
                    className={`h-28 w-28 rounded-input flex items-center justify-center transition-colors ${
                      view === "list"
                        ? "bg-ash text-snow border border-charcoal"
                        : "text-smoke hover:text-silver-mist"
                    }`}
                  >
                    <List size={14} />
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    title="Grid view"
                    className={`h-28 w-28 rounded-input flex items-center justify-center transition-colors ${
                      view === "grid"
                        ? "bg-ash text-snow border border-charcoal"
                        : "text-smoke hover:text-silver-mist"
                    }`}
                  >
                    <LayoutGrid size={14} />
                  </button>
                </div>
                <button className="btn-pill-primary !px-16 !py-8">
                  <Plus size={14} />
                  Add product
                </button>
              </div>
            </div>

            <div className="px-24 py-16 border-b border-charcoal">
              <div className="relative max-w-[360px]">
                <Search size={16} className="absolute left-16 top-1/2 -translate-y-1/2 text-smoke" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search product or category..."
                  className="input-field !pl-40"
                />
              </div>
            </div>

            {view === "list" ? (
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
                    {filteredProducts.map((p) => {
                      const visual = categoryVisual[p.category] ?? defaultVisual;
                      const Icon = visual.icon;
                      return (
                        <tr key={p.id} className="hover:bg-ash/50 transition-colors">
                          <td className="table-td">
                            <div className="flex items-center gap-16">
                              <div className={`h-32 w-32 rounded-input shrink-0 flex items-center justify-center ${visual.bg}`}>
                                <Icon size={16} className={visual.fg} />
                              </div>
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
                      );
                    })}
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td className="table-td text-smoke text-center" colSpan={7}>
                          No products match your search.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-24">
                {filteredProducts.length === 0 ? (
                  <p className="text-body-sm text-smoke text-center py-40">No products match your search.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
                    {filteredProducts.map((p) => {
                      const visual = categoryVisual[p.category] ?? defaultVisual;
                      const Icon = visual.icon;
                      return (
                        <div
                          key={p.id}
                          className="card p-0 overflow-hidden flex flex-col transition-colors hover:border-slate"
                        >
                          <div className={`h-128 flex items-center justify-center ${visual.bg}`}>
                            <Icon size={36} className={visual.fg} />
                          </div>
                          <div className="p-16 flex flex-col gap-8">
                            <div className="flex items-center justify-between gap-8">
                              <span className="pill-tag !py-[2px] !px-8">{p.category}</span>
                              <button className="h-28 w-28 rounded-input hover:bg-white/[0.04] flex items-center justify-center shrink-0">
                                <MoreHorizontal size={14} className="text-smoke" />
                              </button>
                            </div>
                            <h3 className="text-body-sm text-snow font-medium truncate">{p.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-subheading text-snow font-semibold">{p.price}</span>
                              <span className={`text-caption ${productStatusStyle[p.status]}`}>● {p.status}</span>
                            </div>
                            <div className="flex items-center justify-between text-caption text-smoke pt-4 border-t border-charcoal">
                              <span>Stock: {p.stock}</span>
                              <span>Sold: {p.sold}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
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
