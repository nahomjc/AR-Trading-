"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useIntersectionVisible(rootMargin = "150px 0px") {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: Element | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { rootMargin },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [rootMargin],
  );

  useEffect(() => () => observerRef.current?.disconnect(), []);

  return { ref, visible };
}
