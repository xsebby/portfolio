import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type PortfolioView = "dev" | "vfx";

type ViewContextValue = {
  view: PortfolioView;
  toggleView: () => void;
};

const ViewContext = createContext<ViewContextValue | null>(null);

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<PortfolioView>("dev");
  const toggleView = useCallback(() => {
    setView((current) => (current === "dev" ? "vfx" : "dev"));
  }, []);

  return (
    <ViewContext.Provider value={{ view, toggleView }}>
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within ViewProvider");
  }
  return context;
}
