"use client";

import { useState } from "react";
import { Calendar, MapPin, PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    tag: "Training"
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
    title: "Kodinar Youth Cricket Championship",
    date: "Jan 12 - Jan 16, 2027",
    time: "8:00 AM onwards",
    location: "Town Ground, Kodinar",
    category: "Sports",
    tag: "Tournament"
  }
];

export default function EventsPage() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filtered = selectedTag === "All" ? EVENTS_DATA : EVENTS_DATA.filter((e) => e.tag === selectedTag);

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

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {["All", "Festival", "Exhibition", "Training", "Tour", "Tournament"].map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            onClick={() => setSelectedTag(tag)}
            className="shrink-0 px-3 py-1 font-medium cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
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
