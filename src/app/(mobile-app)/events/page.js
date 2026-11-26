"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Plus,
  Sparkles,
  Presentation,
  Compass,
  LayoutGrid,
  Search,
  X,
  Clock,
  Ticket
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENTS_DATA } from "@/lib/events-data";

const EVENTS_MENU = [
  { id: "All", label: "All Events", icon: LayoutGrid, iconBg: "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100" },
  { id: "Festival", label: "Festivals", icon: Sparkles, iconBg: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400" },
  { id: "Exhibition", label: "Exhibition", icon: Presentation, iconBg: "bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400" },
  { id: "Tour", label: "Tours", icon: Compass, iconBg: "bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400" }
];

function EventsContent() {
  const searchParams = useSearchParams();
  const paramTag = searchParams.get("tag");

  const [search, setSearch] = useState("");
  const [customTag, setCustomTag] = useState(null);
  const selectedTag = customTag ?? paramTag ?? "All";

  const filtered = EVENTS_DATA.filter((e) => {
    const matchesTag =
      selectedTag === "All" || e.tag.toLowerCase() === selectedTag.toLowerCase();
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <PageHeader
        title="Events"
        description="Cultural festivals, exhibitions, agro meets, and local gatherings."
        icon={Calendar}
        action={
          <Button
            nativeButton={false}
            render={<Link href="/events/new" />}
            size="sm"
            className="h-8.5 rounded-full px-3.5 text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm gap-1"
          >
            <Plus className="size-3.5" /> Submit Event
          </Button>
        }
      />

      <div className="flex w-full items-center gap-2.5 overflow-x-auto py-1 no-scrollbar -mx-3.5 px-3.5">
        {EVENTS_MENU.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedTag === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCustomTag(item.id)}
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
          placeholder="Search events, venues or themes..."
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
        <span>Showing {filtered.length} Events</span>
        {(selectedTag !== "All" || search) && (
          <button
            type="button"
            onClick={() => {
              setCustomTag("All");
              setSearch("");
            }}
            className="text-primary font-medium hover:underline"
          >
            Show All
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs transition-all hover:border-primary/40 hover:bg-muted/30 active:scale-[0.99]"
          >
            <div className="relative aspect-[16/7] w-full overflow-hidden bg-muted/40">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs text-[10px] font-semibold border-border/60">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="bg-background/90 backdrop-blur-xs text-[10px] font-semibold border-border/60">
                  {event.tag}
                </Badge>
              </div>
              <div className="absolute bottom-2.5 right-2.5">
                <Badge variant="default" className="text-[10px] font-bold shadow-xs">
                  {event.price}
                </Badge>
              </div>
            </div>

            <div className="p-3.5 space-y-2">
              <h2 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                {event.title}
              </h2>

              <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground pt-1 border-t border-border/50">
                <span className="flex items-center gap-1 truncate font-medium text-foreground/85">
                  <Calendar className="size-3 text-primary shrink-0" />
                  <span className="truncate">{event.date}</span>
                </span>
                <span className="flex items-center gap-1 truncate">
                  <Clock className="size-3 text-muted-foreground/75 shrink-0" />
                  <span className="truncate">{event.time}</span>
                </span>
                <span className="col-span-2 flex items-center gap-1 truncate">
                  <MapPin className="size-3 text-primary shrink-0" />
                  <span className="truncate">{event.location}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading events...</div>}>
      <EventsContent />
    </Suspense>
  );
}
