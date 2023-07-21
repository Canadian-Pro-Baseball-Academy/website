import React, { useEffect } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = React.useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      setScrollPosition(scrollPosition);
    });
  }, []);

  return scrollPosition;
};
