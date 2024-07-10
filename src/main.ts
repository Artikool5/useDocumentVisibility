import { useState, useEffect, useCallback } from "react";

type VisibilityListener = (isVisible: boolean) => void;

interface DocumentVisibilityReturn {
  isVisible: boolean;
  count: number;
  onVisibilityChange: (listener: VisibilityListener) => () => void;
}

const useDocumentVisibility = (): DocumentVisibilityReturn => {
  const [isVisible, setIsVisible] = useState(!document.hidden);
  const [count, setCount] = useState(0);
  const [listeners, setListeners] = useState<VisibilityListener[]>([]);

  const handleVisibilityChange = useCallback(() => {
    const newVisibility = !document.hidden;
    setIsVisible(newVisibility);
    if (!newVisibility) {
      setCount((prevCount) => prevCount + 1);
    }
    listeners.forEach((l) => l(newVisibility));
  }, [listeners]);

  const onVisibilityChange = useCallback((listener: VisibilityListener) => {
    setListeners((prevListeners) => [...prevListeners, listener]);
    return () => {
      setListeners((prevListeners) =>
        prevListeners.filter((l) => l !== listener),
      );
    };
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  });

  return {
    isVisible,
    count,
    onVisibilityChange,
  };
};

export default useDocumentVisibility;
