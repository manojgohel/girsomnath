"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, MapPin, PlusCircle, Sparkles, Presentation, Compass, LayoutGrid } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const EVENTS_MENU = [
  { id: "All", label: "All Events", icon: LayoutGrid, color: "bg-primary/10 text-primary border-primary/20" },
  { id: "Festival", label: "Festivals", icon: Sparkles, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40" },
  { id: "Exhibition", label: "Exhibition", icon: Presentation, color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-sky-900/40" },
  { id: "Tour", label: "Tours", icon: Compass, color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200/50 dark:border-teal-900/40" }
];

const EVENTS_DATA = [
  {
    title: "Somnath Beach Festival & Food Carnival",
    date: "Dec 14 - Dec 18, 2026",
    time: "4:00 PM - 10:00 PM",
    location: "Chowpatty Promenade, Veraval",
    category: "Community & Culture",
    tag: "Festival"
  },
  {
    title: "Gir Organic Farmers Market & Expo",
    date: "Dec 22, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "APMC Yard, Talala Gir",
    category: "Agriculture",
    tag: "Exhibition"
  },
  {
    title: "Coastal Fishermen Safety Workshop",
    date: "Dec 28, 2026",
    time: "10:30 AM - 1:00 PM",
    location: "Fisheries Training Hall, Veraval",
    category: "Workshop",
    tag: "Exhibition"
  },
  {
    title: "Somnath Heritage Walk & Temple Tour",
    date: "Jan 05, 2027",
    time: "6:30 AM - 9:30 AM",
    location: "Prabhas Patan, Somnath",
    category: "Tourism",
    tag: "Tour"
  },
  {
    title: "Gir Eco Safari Nature Camp",
    date: "Jan 12 - Jan 16, 2027",
    time: "6:00 AM onwards",
    location: "Sasan Gir Sanctuary",
    category: "Tourism",
    tag: "Tour"
  }
];

function EventsContent() {
  const searchParams = useSearchParams();
  const paramTag = searchParams.get("tag");

  const [customTag, setCustomTag] = useState(null);
  const selectedTag = customTag ?? paramTag ?? "All";

  const filtered =
    selectedTag === "All"
      ? EVENTS_DATA
      : EVENTS_DATA.filter((e) => e.tag.toLowerCase() === selectedTag.toLowerCase());

  return (
    <div className="flex flex-col space-y-4 px-3.5 py-2">
      <PageHeader
        title="Events"
        description="Cultural festivals, exhibitions, agro meets, and local gatherings."
        icon={Calendar}
        action={
          <Button size="sm" className="h-8 gap-1 text-xs shadow-xs">
            <PlusCircle className="size-3.5" /> Submit Event
          </Button>
        }
      />

      <div className="grid grid-cols-4 gap-2">
        {EVENTS_MENU.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedTag === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCustomTag(item.id)}
              className={`group flex flex-col items-center justify-center rounded-2xl border p-2 text-center shadow-xs transition-all active:scale-95 ${
                isSelected
                  ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                  : "border-border/70 bg-card hover:border-primary/40 hover:bg-muted/40"
              }`}
            >
              <div
                className={`flex size-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}
              >
                <Icon className="size-5" />
              </div>
              <span
                className={`mt-1.5 block w-full truncate text-[11px] leading-tight ${
                  isSelected ? "font-bold text-primary" : "font-semibold text-foreground"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-0.5">
        <span>Showing {filtered.length} Events</span>
        {selectedTag !== "All" && (
          <button
            type="button"
            onClick={() => setCustomTag("All")}
            className="text-primary font-medium hover:underline"
          >
            Show All
          </button>
        )}
      </div>

      <div className="space-y-3">
        {filtered.map((event, idx) => (
          <Card key={idx} className="p-3.5 gap-2 shadow-xs">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-[10px]">
                {event.category}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {event.tag}
              </Badge>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {event.title}
              </h2>
              <div className="mt-1 flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                <span className="font-medium text-foreground/90">
                  {event.date} • {event.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" /> {event.location}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading...</div>}>
      <EventsContent />
    </Suspense>
  );
}
