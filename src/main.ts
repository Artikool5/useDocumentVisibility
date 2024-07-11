import { useState, useEffect, useCallback } from "react";

type VisibilityListener = (isVisible: boolean) => void;

interface DocumentVisibilityReturn {
  isVisible: boolean;
  count: number;
  onVisibilityChange: (listener: VisibilityListener) => () => void;
}

export const useDocumentVisibility = (): DocumentVisibilityReturn => {
  const isBrowser = typeof document !== "undefined";
  const [isVisible, setIsVisible] = useState(
    isBrowser ? !document.hidden : true,
  );
  const [count, setCount] = useState(0);
  const [listeners, setListeners] = useState<VisibilityListener[]>([]);

  const handleVisibilityChange = useCallback(() => {
    if (!isBrowser) return;

    const newVisibility = !document.hidden;
    setIsVisible(newVisibility);
    if (!newVisibility) {
      setCount((prevCount) => prevCount + 1);
    }
    listeners.forEach((l) => l(newVisibility));
  }, [listeners, isBrowser]);

  const onVisibilityChange = useCallback((listener: VisibilityListener) => {
    setListeners((prevListeners) => [...prevListeners, listener]);
    return () => {
      setListeners((prevListeners) =>
        prevListeners.filter((l) => l !== listener),
      );
    };
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isBrowser, handleVisibilityChange]);

  return {
    isVisible,
    count,
    onVisibilityChange,
  };
};
