"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Star,
  Clock,
  Ticket,
  Sparkles,
  Info
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIGHTS_DATA } from "@/lib/sights-data";

const CATEGORIES = ["All", "Pilgrimage", "Wildlife", "Beach", "Culture"];

export default function SightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = SIGHTS_DATA.filter((sight) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Pilgrimage") return sight.category.includes("Pilgrimage");
    if (selectedCategory === "Wildlife") return sight.category.includes("Wildlife");
    if (selectedCategory === "Beach") return sight.category.includes("Beach");
    if (selectedCategory === "Culture") return sight.category.includes("Culture");
    return true;
  });

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <PageHeader
        title="Top Sights & Attractions"
        description="Must-visit destinations, temples, wildlife sanctuaries & beaches across Gir Somnath."
        icon={Compass}
      />

      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground shadow-xs"
                : "bg-muted/50 border border-border/70 text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3.5">
        {filtered.map((sight) => (
          <Card
            key={sight.id}
            className="overflow-hidden border-border/80 bg-card shadow-xs rounded-2xl flex flex-col pt-0 gap-0"
          >
            <div className="relative aspect-16/9 w-full bg-muted/40 overflow-hidden">
              <Image
                src={sight.image}
                alt={sight.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute top-2.5 left-2.5">
                <Badge className="bg-background/90 text-foreground backdrop-blur-xs text-[10px] font-bold border-border/70 shadow-xs">
                  {sight.category}
                </Badge>
              </div>
              <div className="absolute top-2.5 right-2.5">
                <Badge className="bg-amber-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs">
                  <Star className="size-3 fill-current" />
                  {sight.rating} ({sight.reviewsCount})
                </Badge>
              </div>
            </div>

            <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-bold text-foreground leading-snug">
                    {sight.name}
                  </h2>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
                  <MapPin className="size-3 text-primary shrink-0" />
                  <span>{sight.location}</span>
                  <span>•</span>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                    {sight.taluka}
                  </Badge>
                </div>

                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {sight.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border/60">
                <div className="flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                  <Clock className="size-3.5 text-muted-foreground shrink-0" />
                  <span>{sight.bestTime}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-foreground font-medium">
                  <Ticket className="size-3.5 text-muted-foreground shrink-0" />
                  <span>{sight.entryFee}</span>
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Sparkles className="size-3 text-amber-500" /> Key Highlights
                </span>
                <ul className="text-[11px] text-muted-foreground space-y-0.5">
                  {sight.highlights.slice(0, 2).map((h, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-primary shrink-0" />
                      <span className="truncate">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {sight.tips && (
                <div className="flex items-start gap-1.5 rounded-xl bg-muted/40 p-2 text-[10px] text-muted-foreground border border-border/60">
                  <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="leading-tight">{sight.tips}</span>
                </div>
              )}

              <Link
                href={`/sights/${sight.id}`}
                className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
              >
                View Details & Visitor Guide
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
