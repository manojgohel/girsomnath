"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  PhoneCall,
  MapPin,
  PlusCircle,
  Calculator,
  Scale,
  Store,
  Pill,
  Hospital,
  Building2,
  Landmark,
  Wrench,
  Flame,
  LayoutGrid
} from "lucide-react";
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

const DIRECTORY_CATEGORIES = [
  { id: "All", label: "All", icon: LayoutGrid, color: "bg-primary/10 text-primary border-primary/20" },
  { id: "CA", label: "CA", icon: Calculator, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40" },
  { id: "Advocates", label: "Advocates", icon: Scale, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/40" },
  { id: "Shops", label: "Shops", icon: Store, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40" },
  { id: "Medical Stores", label: "Medical Stores", icon: Pill, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40" },
  { id: "Hospitals", label: "Hospitals", icon: Hospital, color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/40" },
  { id: "Shopping Malls", label: "Shopping Malls", icon: Building2, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40" },
  { id: "Govt Offices", label: "Govt Offices", icon: Landmark, color: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/40" },
  { id: "Garages", label: "Garages", icon: Wrench, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-900/40" },
  { id: "Temples", label: "Temples/Dargas", icon: Flame, color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200/50 dark:border-yellow-900/40" }
];

const COMBO_CATEGORIES = [
  "All Categories",
  "CA",
  "Advocates",
  "Shops",
  "Medical Stores",
  "Hospitals",
  "Shopping Malls",
  "Govt Offices",
  "Garages",
  "Temples"
];

const DIRECTORY_DATA = [
  { name: "Veraval Fisheries & Exporters Association", category: "Shops", phone: "+91 2876 220140", address: "Harbor Road, Veraval Port", town: "Veraval", initial: "VF" },
  { name: "Talala Kesar Mango Cooperative", category: "Shops", phone: "+91 2877 222345", address: "APMC Market Yard", town: "Talala", initial: "TM" },
  { name: "Mehta & Associates Chartered Accountants", category: "CA", phone: "+91 2876 245110", address: "Station Road, Veraval", town: "Veraval", initial: "MA" },
  { name: "Joshi Legal Associates & Notary", category: "Advocates", phone: "+91 2876 231450", address: "Court Complex, Veraval", town: "Veraval", initial: "JL" },
  { name: "Somnath Tourism & Guest House Desk", category: "Shopping Malls", phone: "+91 2876 231200", address: "Bypass Road, Somnath", town: "Somnath", initial: "ST" },
  { name: "Kodinar Auto Garage & Repairs", category: "Garages", phone: "+91 2877 221890", address: "National Highway, Kodinar", town: "Kodinar", initial: "KG" },
  { name: "Somnath Civil Hospital & Emergency", category: "Hospitals", phone: "+91 2876 242011", address: "Hospital Road, Veraval", town: "Veraval", initial: "SH" },
  { name: "Sanjivani 24x7 Medical Store", category: "Medical Stores", phone: "+91 2876 248900", address: "Tower Chowk, Veraval", town: "Veraval", initial: "SM" },
  { name: "Una Hardware & Sanitary Mart", category: "Shops", phone: "+91 2875 221430", address: "Station Road, Una", town: "Una", initial: "UM" },
  { name: "Somnath Mahadev Jyotirlinga Trust", category: "Temples", phone: "+91 2876 231212", address: "Prabhas Patan, Somnath", town: "Somnath", initial: "ST" },
  { name: "Mamlatdar & Taluka Seva Sadan", category: "Govt Offices", phone: "+91 2876 220015", address: "Taluka Panchayat, Veraval", town: "Veraval", initial: "TS" }
];

function DirectoryContent() {
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category");
  const paramTaluka = searchParams.get("taluka");

  const [search, setSearch] = useState("");
  const [customCategory, setCustomCategory] = useState(null);
  const [customTaluka, setCustomTaluka] = useState(null);

  const selectedCategory = customCategory ?? paramCategory ?? "All";
  const selectedTaluka = customTaluka ?? paramTaluka ?? "All Talukas";

  const filtered = DIRECTORY_DATA.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.address.toLowerCase().includes(search.toLowerCase());
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
    <div className="flex flex-col space-y-4 px-3.5 py-2">
      <PageHeader
        title="Directory"
        description="Local businesses, professionals, utilities, and services across Gir Somnath."
        icon={PhoneCall}
        action={
          <Button size="sm" className="h-8 gap-1 text-xs shadow-xs">
            <PlusCircle className="size-3.5" /> Add Contact
          </Button>
        }
      />

      <div className="grid grid-cols-4 gap-2">
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
            items={COMBO_CATEGORIES}
            value={selectedCategory === "All" ? "All Categories" : selectedCategory}
            onValueChange={(val) => setCustomCategory(val ?? "All Categories")}
          >
            <ComboboxInput
              placeholder="Category"
              className="h-8.5 rounded-xl text-xs bg-muted/40 border-border"
            />
            <ComboboxContent>
              <ComboboxEmpty>No category found.</ComboboxEmpty>
              <ComboboxList>
                {COMBO_CATEGORIES.map((cat) => (
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
            onValueChange={(val) => setCustomTaluka(val ?? "All Talukas")}
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
              setCustomCategory("All");
              setCustomTaluka("All Talukas");
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
              <Button render={<a href={`tel:${item.phone}`} />} size="sm" variant="default" className="h-7 px-3 text-[11px] shrink-0 font-medium">
                Call
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading...</div>}>
      <DirectoryContent />
    </Suspense>
  );
}
