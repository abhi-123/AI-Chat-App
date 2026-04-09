import { useRef, useEffect } from "react";

export const useAutoScroll = (messages) => {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const shouldScrollRef = useRef(true);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

    shouldScrollRef.current = distanceFromBottom < 100;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = (force = false) => {
    if (force || shouldScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // normal case
  }, [messages]);

  return { bottomRef, containerRef, scrollToBottom };
};
