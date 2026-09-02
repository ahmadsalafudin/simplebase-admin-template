"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Re-keying on pathname remounts this wrapper on every navigation, which
  // restarts the CSS animation below — giving menu switches a smooth,
  // consistent transition instead of an abrupt content swap.
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
