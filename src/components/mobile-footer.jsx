"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_ITEMS as NAV_ITEMS } from "@/lib/constants";

export function MobileFooter() {
  const pathname = usePathname();

  return (
    <footer className="sticky bottom-0 z-40 w-full shrink-0 border-t border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <nav aria-label="Mobile Navigation" className="grid h-16 w-full grid-cols-5 items-center px-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-full flex-col items-center justify-center gap-1 rounded-xl py-1 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-10 items-center justify-center rounded-full transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-xs"
                    : "text-muted-foreground group-hover:scale-105 group-hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "size-4.5 transition-transform duration-200",
                    isActive ? "stroke-[2.4]" : "stroke-[1.8]"
                  )}
                />
              </div>
              <span
                className={cn(
                  "block w-full truncate px-0.5 text-center text-[10px] leading-none tracking-tight",
                  isActive ? "font-semibold text-primary" : "font-medium"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
