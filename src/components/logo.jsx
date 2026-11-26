import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  showIcon = false,
  showTagline = true,
  tagline = "District Community Portal",
  size = "default",
  collapsed = false,
  className
}) {
  const isSm = size === "sm";

  const content = (
    <div className={cn("flex items-center gap-2.5 min-w-0 overflow-hidden", className)}>
      {showIcon && (
        <div className="relative size-9 shrink-0 overflow-hidden rounded-xl border border-amber-600/30 bg-background shadow-xs">
          <Image
            src="/icons/icon-192x192.png"
            alt="Gir Somnath Lion Emblem"
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
      )}
      <div
        className={cn(
          "flex flex-col min-w-0 transition-opacity duration-200",
          collapsed && "hidden group-data-[collapsible=icon]:hidden"
        )}
      >
        <div className="flex items-center gap-1 min-w-0">
          <span
            className={cn(
              "font-heading font-bold tracking-tight text-foreground truncate whitespace-nowrap",
              isSm ? "text-sm" : "text-base"
            )}
          >
            Gir Somnath
          </span>
          <Badge variant="default" className="px-1.5 py-0 text-[10px] font-bold shrink-0">
            .in
          </Badge>
        </div>
        {showTagline && (
          <span className="text-[10.5px] leading-tight text-muted-foreground truncate whitespace-nowrap">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0 outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
