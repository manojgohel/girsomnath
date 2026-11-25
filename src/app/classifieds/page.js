"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  MapPin,
  Plus,
  Clock,
  Briefcase,
  Building,
  Hammer,
  LayoutGrid,
  Search,
  X,
  Tag
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADS_DATA } from "@/lib/classifieds-data";

const CLASSIFIEDS_MENU = [
  { id: "All", label: "All Ads", icon: LayoutGrid, iconBg: "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100" },
  { id: "Jobs", label: "Jobs", icon: Briefcase, iconBg: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400" },
  { id: "Real Estate", label: "Real Estate", icon: Building, iconBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" },
  { id: "Services", label: "Services", icon: Hammer, iconBg: "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400" }
];

function ClassifiedsContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category");

  const [search, setSearch] = useState("");
  const [customCategory, setCustomCategory] = useState(null);
  const selectedCategory = customCategory ?? paramCat ?? "All";

  const filtered = ADS_DATA.filter((a) => {
    const matchesCat =
      selectedCategory === "All" || a.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <PageHeader
        title="Classified Ads"
        description="Local jobs, properties, services, and community notices."
        icon={Megaphone}
        action={
          <Button
            render={<Link href="/classifieds/new" />}
            size="sm"
            className="h-8.5 rounded-full px-3.5 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm gap-1"
          >
            <Plus className="size-3.5" /> Post Ad
          </Button>
        }
      />

      <div className="flex w-full items-center gap-2.5 overflow-x-auto py-1 no-scrollbar -mx-3.5 px-3.5">
        {CLASSIFIEDS_MENU.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCustomCategory(item.id)}
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
          placeholder="Search jobs, real estate or services..."
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
        <span>Showing {filtered.length} Ads</span>
        {(selectedCategory !== "All" || search) && (
          <button
            type="button"
            onClick={() => {
              setCustomCategory("All");
              setSearch("");
            }}
            className="text-primary font-medium hover:underline"
          >
            Show All
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {filtered.map((ad) => (
          <Link
            key={ad.id}
            href={`/classifieds/${ad.id}`}
            className="group flex items-stretch overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40 hover:bg-muted/30 active:scale-[0.99]"
          >
            <div className="relative w-24 shrink-0 overflow-hidden bg-muted/40">
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                sizes="(max-width: 640px) 96px, 96px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between p-3 min-w-0">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5 text-[10px]">
                  <Badge variant="outline" className="px-1.5 py-0 text-[9px] font-medium border-border/70 bg-muted/40">
                    {ad.category}
                  </Badge>
                  <Badge variant="secondary" className="px-1.5 py-0 text-[9px] font-semibold">
                    {ad.tag}
                  </Badge>
                </div>

                <h3 className="text-xs font-bold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {ad.title}
                </h3>

                <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {ad.compensation}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/50 pt-1.5 mt-2">
                <span className="flex items-center gap-0.5 truncate">
                  <MapPin className="size-2.5 shrink-0 text-muted-foreground/75" /> {ad.location}
                </span>
                <span className="flex items-center gap-0.5 shrink-0">
                  <Clock className="size-2.5" /> {ad.time}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ClassifiedsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading classifieds...</div>}>
      <ClassifiedsContent />
    </Suspense>
  );
}
