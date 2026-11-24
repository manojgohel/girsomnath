"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Megaphone, MapPin, PlusCircle, Clock, Briefcase, Building, Hammer, LayoutGrid } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CLASSIFIEDS_MENU = [
  { id: "All", label: "All Ads", icon: LayoutGrid, color: "bg-primary/10 text-primary border-primary/20" },
  { id: "Jobs", label: "Jobs", icon: Briefcase, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40" },
  { id: "Real Estate", label: "Real Estate", icon: Building, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40" },
  { id: "Services", label: "Services", icon: Hammer, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-900/40" }
];

const ADS_DATA = [
  {
    title: "Senior Accountant & Billing Officer Needed",
    category: "Jobs",
    time: "2 hours ago",
    location: "Veraval GIDC",
    tag: "Full-Time",
    contact: "+91 98251 11223"
  },
  {
    title: "Looking for 2BHK Furnished Apartment on Lease",
    category: "Real Estate",
    time: "Yesterday",
    location: "Somnath Bypass",
    tag: "Wanted",
    contact: "+91 94282 33445"
  },
  {
    title: "Experienced JCB Crane Operator Available for Projects",
    category: "Services",
    time: "2 days ago",
    location: "Una & Kodinar",
    tag: "Freelance",
    contact: "+91 97123 55667"
  },
  {
    title: "Fish Cold Storage Space Available on Monthly Sharing",
    category: "Real Estate",
    time: "3 days ago",
    location: "Veraval Harbor",
    tag: "Available",
    contact: "+91 98984 77889"
  },
  {
    title: "Driver Required for Heavy Commercial Vehicle",
    category: "Jobs",
    time: "4 days ago",
    location: "Talala Gir",
    tag: "Urgent",
    contact: "+91 94085 99001"
  }
];

function ClassifiedsContent() {
  const searchParams = useSearchParams();
  const paramCat = searchParams.get("category");

  const [customCategory, setCustomCategory] = useState(null);
  const selectedCategory = customCategory ?? paramCat ?? "All";

  const filtered =
    selectedCategory === "All"
      ? ADS_DATA
      : ADS_DATA.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex flex-col space-y-4 px-3.5 py-2">
      <PageHeader
        title="Classified Ads"
        description="Local jobs, properties, services, and community notices."
        icon={Megaphone}
        action={
          <Button size="sm" className="h-8 gap-1 text-xs shadow-xs">
            <PlusCircle className="size-3.5" /> Post Ad
          </Button>
        }
      />

      <div className="grid grid-cols-4 gap-2">
        {CLASSIFIEDS_MENU.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCustomCategory(item.id)}
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
        <span>Showing {filtered.length} Ads</span>
        {selectedCategory !== "All" && (
          <button
            type="button"
            onClick={() => setCustomCategory("All")}
            className="text-primary font-medium hover:underline"
          >
            Show All
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {filtered.map((ad, idx) => (
          <Card key={idx} className="p-3 gap-1 shadow-xs">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span className="font-semibold text-primary">{ad.category}</span>
              <Badge variant="secondary" className="text-[9px]">
                {ad.tag}
              </Badge>
            </div>
            <p className="text-xs font-semibold text-foreground mt-0.5">
              {ad.title}
            </p>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1 pt-1.5 border-t border-border/40">
              <span className="flex items-center gap-0.5">
                <MapPin className="size-2.5" /> {ad.location}
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5">
                  <Clock className="size-2.5" /> {ad.time}
                </span>
                <a
                  href={`tel:${ad.contact}`}
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  Contact
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ClassifiedsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading...</div>}>
      <ClassifiedsContent />
    </Suspense>
  );
}
