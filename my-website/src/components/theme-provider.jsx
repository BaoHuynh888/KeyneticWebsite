import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useTheme = useNextTheme

export function ThemeProvider({ children, ...props }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>
      {children}
    </NextThemesProvider>
  );
}