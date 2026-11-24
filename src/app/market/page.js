"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShoppingBag, MapPin, PlusCircle, Coins, KeyRound, LayoutGrid } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MARKET_MENU = [
  { id: "All", label: "All Items", icon: LayoutGrid, color: "bg-primary/10 text-primary border-primary/20" },
  { id: "Buy", label: "Buy", icon: ShoppingBag, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40" },
  { id: "Sell", label: "Sell", icon: Coins, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40" },
  { id: "Rent", label: "Rent", icon: KeyRound, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200/50 dark:border-cyan-900/40" }
];

const MARKET_DATA = [
  {
    title: "John Deere Tractor 5050D with Rotavator",
    price: "₹ 1,400 / day",
    type: "Rent",
    category: "Agro Machinery",
    location: "Kodinar",
    phone: "+91 98790 11223"
  },
  {
    title: "Organic Kesar Mango Orchard (4 Bigha)",
    price: "₹ 38 Lakh",
    type: "Buy",
    category: "Farmland",
    location: "Talala Gir",
    phone: "+91 94280 33445"
  },
  {
    title: "Commercial Godown 2500 sq ft near Highway",
    price: "₹ 22,000 / mo",
    type: "Rent",
    category: "Commercial Property",
    location: "Veraval GIDC",
    phone: "+91 98250 55667"
  },
  {
    title: "Deep Sea Wooden Fishing Trawler 42ft",
    price: "₹ 16.5 Lakh",
    type: "Buy",
    category: "Marine & Fisheries",
    location: "Veraval Harbor",
    phone: "+91 97120 77889"
  },
  {
    title: "Eicher 14ft Commercial Truck for Transport",
    price: "₹ 2,200 / day",
    type: "Rent",
    category: "Vehicles",
    location: "Una",
    phone: "+91 98980 99001"
  },
  {
    title: "Used Power Tiller with Attachment",
    price: "₹ 85,000",
    type: "Sell",
    category: "Agro Equipment",
    location: "Sutrapada",
    phone: "+91 94080 22334"
  }
];

function MarketContent() {
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type");

  const [customType, setCustomType] = useState(null);
  const filterType = customType ?? paramType ?? "All";

  const filtered =
    filterType === "All"
      ? MARKET_DATA
      : MARKET_DATA.filter((m) => m.type.toLowerCase() === filterType.toLowerCase());

  return (
    <div className="flex flex-col space-y-4 px-3.5 py-2">
      <PageHeader
        title="Marketplace"
        description="Buy, sell, and rent equipment, properties, vehicles, and goods."
        icon={ShoppingBag}
        action={
          <Button size="sm" className="h-8 gap-1 text-xs shadow-xs">
            <PlusCircle className="size-3.5" /> Post Item
          </Button>
        }
      />

      <div className="grid grid-cols-4 gap-2">
        {MARKET_MENU.map((item) => {
          const Icon = item.icon;
          const isSelected = filterType === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCustomType(item.id)}
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
        <span>Showing {filtered.length} Items</span>
        {filterType !== "All" && (
          <button
            type="button"
            onClick={() => setCustomType("All")}
            className="text-primary font-medium hover:underline"
          >
            Show All
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {filtered.map((item, idx) => (
          <Card key={idx} className="p-3 gap-1 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-[9px]">
                  For {item.type}
                </Badge>
                <span className="text-[9px] text-muted-foreground">{item.category}</span>
              </div>
              <p className="mt-1.5 text-xs font-semibold leading-snug text-foreground line-clamp-2">
                {item.title}
              </p>
            </div>
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {item.price}
              </p>
              <p className="text-[10px] text-muted-foreground flex items-center gap-0.5 mt-0.5">
                <MapPin className="size-2.5" /> {item.location}
              </p>
              <Button asChild size="sm" variant="outline" className="w-full mt-2 h-7 text-[10px]">
                <a href={`tel:${item.phone}`}>Contact</a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function MarketPage() {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading...</div>}>
      <MarketContent />
    </Suspense>
  );
}
