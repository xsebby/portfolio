import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type DetailItem = {
  title: string;
  role: string;
  about: string;
  date?: string;
  details?: string;
  image?: string;
  link?: string;
  linkLabel?: string;
};

type DetailPanelContextValue = {
  item: DetailItem | null;
  openDetail: (item: DetailItem) => void;
  closeDetail: () => void;
};

const DetailPanelContext = createContext<DetailPanelContextValue | null>(null);

export function DetailPanelProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<DetailItem | null>(null);

  const openDetail = useCallback((next: DetailItem) => {
    setItem(next);
  }, []);

  const closeDetail = useCallback(() => {
    setItem(null);
  }, []);

  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDetail();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [item, closeDetail]);

  return (
    <DetailPanelContext.Provider value={{ item, openDetail, closeDetail }}>
      {children}
    </DetailPanelContext.Provider>
  );
}

export function useDetailPanel() {
  const context = useContext(DetailPanelContext);
  if (!context) {
    throw new Error("useDetailPanel must be used within DetailPanelProvider");
  }
  return context;
}
