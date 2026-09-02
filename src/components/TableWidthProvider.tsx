"use client";

import { createContext, useContext, useEffect, useState } from "react";

type TableWidth = "center" | "wide";

type TableWidthContextValue = {
  tableWidth: TableWidth;
  setTableWidth: (value: TableWidth) => void;
};

const TableWidthContext = createContext<TableWidthContextValue>({
  tableWidth: "center",
  setTableWidth: () => {},
});

const STORAGE_KEY = "tableWidth";

function applyTableWidth(value: TableWidth) {
  document.documentElement.classList.toggle("wide-layout", value === "wide");
}

export function TableWidthProvider({ children }: { children: React.ReactNode }) {
  const [tableWidth, setTableWidthState] = useState<TableWidth>("center");

  // Sync with whatever the inline boot script (or a previous session) set.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as TableWidth | null;
    const initial: TableWidth = stored === "wide" ? "wide" : "center";
    setTableWidthState(initial);
    applyTableWidth(initial);
  }, []);

  const setTableWidth = (next: TableWidth) => {
    setTableWidthState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTableWidth(next);
  };

  return (
    <TableWidthContext.Provider value={{ tableWidth, setTableWidth }}>
      {children}
    </TableWidthContext.Provider>
  );
}

export function useTableWidth() {
  return useContext(TableWidthContext);
}
