/*
 * Define a context to manage view modes across the application.
 * "default" is the standard view based on page content
 * "mapList" shows a list of maps as popup over page content
 */

import React, { createContext, useContext, useState, ReactNode } from "react";

type ViewMode = "default" | "mapList";

type CounterContextValue = {
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  resetViewMode: (viewMode: ViewMode) => void;
};

const ViewModeContext = createContext<CounterContextValue | undefined>(
  undefined
);

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>("default");

  const resetViewMode = (next: ViewMode) => {
    setViewMode((current) => (current === next ? "default" : next));
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, resetViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const vm = useContext(ViewModeContext);
  if (!vm) throw new Error("useViewMode must be used inside CounterProvider");
  return vm;
}
