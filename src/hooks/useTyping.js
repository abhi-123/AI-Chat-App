import { useEffect, useState } from "react";
const dots = ["", ".", "..", "..."];
export const useTyping = (isTyping) => {
  const [dotIndex, setDotIndex] = useState(0);
  useEffect(() => {
    if (!isTyping) {
      setDotIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % dots.length);
    }, 400);

    return () => clearInterval(interval);
  }, [isTyping]);
  return dots[dotIndex];
};
