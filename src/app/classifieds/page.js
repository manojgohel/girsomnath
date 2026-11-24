"use client";

import { useState } from "react";
import { Megaphone, MapPin, PlusCircle, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    category: "Commercial",
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

export default function ClassifiedsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All" ? ADS_DATA : ADS_DATA.filter((a) => a.category === selectedCategory);

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

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        {["All", "Jobs", "Real Estate", "Services", "Commercial"].map((cat) => (
          <Badge
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="shrink-0 px-3 py-1 font-medium cursor-pointer"
          >
            {cat}
          </Badge>
        ))}
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
