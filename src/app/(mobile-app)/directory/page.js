"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  X,
  PhoneCall,
  MapPin,
  Plus,
  Calculator,
  Scale,
  Store,
  Pill,
  Hospital,
  Building2,
  Landmark,
  Wrench,
  Flame,
  LayoutGrid,
  CheckCircle2,
  Clock
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DIRECTORY_DATA } from "@/lib/directory-data";

const DIRECTORY_CATEGORIES = [
  { id: "All", label: "All", icon: LayoutGrid, iconBg: "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100" },
  { id: "CA", label: "CA", icon: Calculator, iconBg: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400" },
  { id: "Advocates", label: "Advocates", icon: Scale, iconBg: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400" },
  { id: "Shops", label: "Shops", icon: Store, iconBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400" },
  { id: "Medical Stores", label: "Medical Stores", icon: Pill, iconBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400" },
  { id: "Hospitals", label: "Hospitals", icon: Hospital, iconBg: "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400" },
  { id: "Shopping Malls", label: "Shopping Malls", icon: Building2, iconBg: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400" },
  { id: "Govt Offices", label: "Govt Offices", icon: Landmark, iconBg: "bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300" },
  { id: "Garages", label: "Garages", icon: Wrench, iconBg: "bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400" },
  { id: "Temples", label: "Temples/Dargas", icon: Flame, iconBg: "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-400" }
];

function DirectoryContent() {
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category");
  const paramTaluka = searchParams.get("taluka");

  const [search, setSearch] = useState("");
  const [customCategory, setCustomCategory] = useState(null);

  const selectedCategory = customCategory ?? paramCategory ?? "All";
  const selectedTaluka = paramTaluka ?? "All Talukas";

  const filtered = DIRECTORY_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase()) ||
      item.town.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      selectedCategory === "All Categories" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesTaluka =
      !selectedTaluka || selectedTaluka === "All Talukas" || item.town === selectedTaluka;
    return matchesSearch && matchesCategory && matchesTaluka;
  });

  const hasActiveFilters =
    search ||
    (selectedCategory && selectedCategory !== "All" && selectedCategory !== "All Categories") ||
    (selectedTaluka && selectedTaluka !== "All Talukas");

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <PageHeader
        title="Directory"
        description="Local businesses, professionals, utilities, and services across Gir Somnath."
        icon={PhoneCall}
        action={
          <Button
            nativeButton={false}
            render={<Link href="/directory/new" />}
            size="sm"
            className="h-8.5 rounded-full px-3.5 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm gap-1"
          >
            <Plus className="size-3.5" /> Add Contact
          </Button>
        }
      />

      <div className="flex w-full items-center gap-2.5 overflow-x-auto py-1 no-scrollbar -mx-3.5 px-3.5">
        {DIRECTORY_CATEGORIES.map((item) => {
          const Icon = item.icon;
          const isSelected =
            selectedCategory === item.id ||
            (item.id === "All" && (!selectedCategory || selectedCategory === "All Categories"));

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCustomCategory(item.id);
              }}
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
          placeholder="Search business, professional, or service..."
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
        <span>Showing {filtered.length} Listings</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCustomCategory("All");
            }}
            className="text-primary font-medium hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/directory/${item.id}`}
            className="group flex items-stretch overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40 hover:bg-muted/30 active:scale-[0.99]"
          >
            <div className="relative w-24 shrink-0 overflow-hidden bg-muted/40">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 96px, 96px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 items-center p-3 min-w-0">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-bold text-foreground leading-snug truncate group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  {item.verified && (
                    <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <Badge variant="outline" className="px-1.5 py-0 text-[9px] font-medium border-border/70 bg-muted/40">
                    {item.category}
                  </Badge>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
                    <MapPin className="size-3 text-muted-foreground/75 shrink-0" /> {item.town}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-muted-foreground/85 pt-0.5">
                  <span className="flex items-center gap-1 truncate">
                    <Clock className="size-3 shrink-0" /> {item.timing}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading directory...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}
