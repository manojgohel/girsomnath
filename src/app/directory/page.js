"use client";

import { useState } from "react";
import { Search, PhoneCall, MapPin, PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TALUKAS = [
  "All Talukas",
  "Veraval",
  "Somnath",
  "Talala",
  "Kodinar",
  "Una",
  "Sutrapada",
  "Gir Gadhada"
];

const CATEGORIES = [
  "All Categories",
  "Trade & Industry",
  "Agriculture",
  "Hospitality",
  "Logistics",
  "Fisheries",
  "Retail & Trade",
  "Healthcare",
  "Emergency"
];

const DIRECTORY_DATA = [
  { name: "Veraval Fisheries & Exporters Association", category: "Trade & Industry", phone: "+91 2876 220140", address: "Harbor Road, Veraval Port", town: "Veraval", initial: "VF" },
  { name: "Talala Kesar Mango Cooperative", category: "Agriculture", phone: "+91 2877 222345", address: "APMC Market Yard", town: "Talala", initial: "TM" },
  { name: "Somnath Tourism & Guest House Desk", category: "Hospitality", phone: "+91 2876 231200", address: "Bypass Road, Somnath", town: "Somnath", initial: "ST" },
  { name: "Kodinar Transport & Logistics Hub", category: "Logistics", phone: "+91 2877 221890", address: "National Highway, Kodinar", town: "Kodinar", initial: "KT" },
  { name: "Una Timber & Hardware Merchants", category: "Retail & Trade", phone: "+91 2875 221430", address: "Station Road, Una", town: "Una", initial: "UT" },
  { name: "Sutrapada Coastal Cooperative", category: "Fisheries", phone: "+91 2876 263110", address: "Coastal Belt, Sutrapada", town: "Sutrapada", initial: "SC" },
  { name: "Gir Agro Seeds & Fertilizers", category: "Agriculture", phone: "+91 2877 223901", address: "Main Bazaar, Talala Gir", town: "Talala", initial: "GA" },
  { name: "Somnath Diagnostic & Healthcare Center", category: "Healthcare", phone: "+91 2876 242011", address: "College Road, Veraval", town: "Veraval", initial: "SD" },
  { name: "Gir Gadhada Agro Equipment Centre", category: "Agriculture", phone: "+91 2875 241022", address: "Market Yard, Gir Gadhada", town: "Gir Gadhada", initial: "GG" },
  { name: "District Emergency Control Room", category: "Emergency", phone: "1077", address: "Disaster Management Centre, Veraval", town: "Veraval", initial: "EC" }
];

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedTaluka, setSelectedTaluka] = useState("All Talukas");

  const filtered = DIRECTORY_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesTaluka =
      !selectedTaluka || selectedTaluka === "All Talukas" || item.town === selectedTaluka;
    return matchesSearch && matchesCategory && matchesTaluka;
  });

  const hasActiveFilters =
    search ||
    (selectedCategory && selectedCategory !== "All Categories") ||
    (selectedTaluka && selectedTaluka !== "All Talukas");

  return (
    <div className="flex flex-col space-y-4 px-3.5 py-2">
      <PageHeader
        title="Directory"
        description="Local businesses, cooperatives, utilities, and emergency numbers across Gir Somnath."
        icon={PhoneCall}
        action={
          <Button size="sm" className="h-8 gap-1 text-xs shadow-xs">
            <PlusCircle className="size-3.5" /> Add Contact
          </Button>
        }
      />

      <div className="space-y-2 rounded-2xl border border-border bg-card p-3 shadow-xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search business, service or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 rounded-xl bg-muted/40 text-xs shadow-none border-border"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Combobox
            items={CATEGORIES}
            value={selectedCategory}
            onValueChange={(val) => setSelectedCategory(val ?? "All Categories")}
          >
            <ComboboxInput
              placeholder="Category"
              className="h-8.5 rounded-xl text-xs bg-muted/40 border-border"
            />
            <ComboboxContent>
              <ComboboxEmpty>No category found.</ComboboxEmpty>
              <ComboboxList>
                {CATEGORIES.map((cat) => (
                  <ComboboxItem key={cat} value={cat}>
                    {cat}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>

          <Combobox
            items={TALUKAS}
            value={selectedTaluka}
            onValueChange={(val) => setSelectedTaluka(val ?? "All Talukas")}
          >
            <ComboboxInput
              placeholder="Taluka"
              className="h-8.5 rounded-xl text-xs bg-muted/40 border-border"
            />
            <ComboboxContent>
              <ComboboxEmpty>No taluka found.</ComboboxEmpty>
              <ComboboxList>
                {TALUKAS.map((taluka) => (
                  <ComboboxItem key={taluka} value={taluka}>
                    {taluka}
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-0.5">
        <span>Showing {filtered.length} Contacts</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All Categories");
              setSelectedTaluka("All Talukas");
            }}
            className="text-primary font-medium hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      <div className="space-y-2">
        {filtered.map((item, idx) => (
          <Card key={idx} className="p-3 gap-2.5 shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <Avatar className="size-9 rounded-xl border border-border bg-secondary text-foreground font-semibold text-xs shrink-0">
                  <AvatarFallback className="rounded-xl bg-secondary text-foreground font-bold text-xs">
                    {item.initial}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-foreground leading-snug">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-medium">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 font-medium">
                      {item.town}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1 truncate max-w-[200px]">
                <MapPin className="size-3 shrink-0 text-muted-foreground" />
                <span className="truncate">{item.address}</span>
              </span>
              <Button asChild size="sm" variant="default" className="h-7 px-3 text-[11px] shrink-0 font-medium">
                <a href={`tel:${item.phone}`}>Call</a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
