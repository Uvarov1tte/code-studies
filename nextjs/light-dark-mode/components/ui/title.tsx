"use client";

import { useTheme } from "next-themes";

export const Title = () => {
  const { theme } = useTheme();
  return (
    <h1 className="text-6xl font-semibold">
      Next.js {theme === "light" ? "light" : "dark"} mode
    </h1>
  );
};
