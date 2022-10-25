import { useEffect, useState } from "react";

export const useIntersectionObserver = (ref) => {
  const [isOnScreen, setIsOnScreen] = useState(null);
  const observerRef = new IntersectionObserver(
    ([entry]) => setIsOnScreen(entry.isIntersecting),
    {
      root: document.getElementById("container"),
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.2,
    }
  );

  useEffect(() => {
    observerRef.observe(ref.current);
    return () => observerRef.disconnect();
  }, [ref, observerRef]);

  return {
    isOnScreen,
  };
};
