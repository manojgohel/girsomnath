"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  MapPin,
  Plus,
  Coins,
  KeyRound,
  LayoutGrid,
  Search,
  X,
  Phone,
  Tag
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MARKET_DATA } from "@/lib/market-data";
import { MARKET_MENU } from "@/lib/constants";

function MarketContent() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type");

  const [search, setSearch] = useState("");
  const [customType, setCustomType] = useState(null);
  const filterType = customType ?? paramType ?? "All";

  const filtered = MARKET_DATA.filter((m) => {
    const matchesType =
      filterType === "All" || m.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.category.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <PageHeader
        title="Marketplace"
        description="Buy, sell, and rent equipment, properties, vehicles, and goods."
        icon={ShoppingBag}
        action={
          <Button
            nativeButton={false}
            render={<Link href="/market/new" />}
            size="sm"
            className="h-8.5 rounded-full px-3.5 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm gap-1"
          >
            <Plus className="size-3.5" /> Post Item
          </Button>
        }
      />

      <div className="flex w-full items-center gap-2.5 overflow-x-auto py-1 no-scrollbar -mx-3.5 px-3.5">
        {MARKET_MENU.map((item) => {
          const Icon = item.icon;
          const isSelected = filterType === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCustomType(item.id)}
              className={`group flex shrink-0 items-center gap-2.5 rounded-2xl border px-3 py-2 transition-all duration-150 active:scale-95 ${
                isSelected
                  ? "border-zinc-900 bg-zinc-100 dark:border-zinc-200 dark:bg-zinc-800/80 shadow-xs ring-1 ring-zinc-900/10 dark:ring-zinc-100/10"
                  : "border-border/60 bg-card hover:border-border hover:bg-muted/30 shadow-2xs"
              }`}
            >
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${item.iconBg}`}
              >
                <Icon className="size-4.5 stroke-[2.2]" />
              </div>
              <span
                className={`whitespace-nowrap text-xs font-semibold pr-0.5 ${
                  isSelected ? "text-foreground font-bold" : "text-foreground/90"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search items, equipment or property..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 pl-10 pr-9 rounded-2xl bg-card text-xs shadow-xs border-border/80 placeholder:text-muted-foreground/75 focus-visible:bg-card focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-0.5 pt-0.5">
        <span>Showing {filtered.length} Items</span>
        {(filterType !== "All" || search) && (
          <button
            type="button"
            onClick={() => {
              setCustomType("All");
              setSearch("");
            }}
            className="text-primary font-medium hover:underline"
          >
            Show All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/market/${item.id}`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40 hover:bg-muted/30 active:scale-[0.99]"
          >
            <div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 210px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs text-[9px] font-semibold border-border/60">
                    For {item.type}
                  </Badge>
                </div>
              </div>

              <div className="p-2.5 space-y-1">
                <span className="text-[9px] font-medium text-muted-foreground block truncate">
                  {item.category}
                </span>
                <h3 className="text-xs font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="p-2.5 pt-0 space-y-1">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {item.price}
              </p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 truncate border-t border-border/50 pt-1.5">
                <MapPin className="size-2.5 shrink-0 text-muted-foreground/80" /> {item.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function MarketPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading marketplace...</div>}>
      <MarketContent />
    </Suspense>
  );
}
