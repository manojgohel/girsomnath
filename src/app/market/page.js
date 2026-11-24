"use client";

import { useState } from "react";
import { ShoppingBag, MapPin, PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    title: "2BHK Ground Floor Independent House",
    price: "₹ 12,000 / mo",
    type: "Rent",
    category: "Residential",
    location: "Somnath Bypass",
    phone: "+91 94080 22334"
  }
];

export default function MarketPage() {
  const [filterType, setFilterType] = useState("All");

  const filtered = filterType === "All" ? MARKET_DATA : MARKET_DATA.filter((m) => m.type === filterType);

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

      <div className="flex items-center gap-1.5 text-xs">
        {["All", "Buy", "Rent"].map((type) => (
          <Badge
            key={type}
            variant={filterType === type ? "default" : "outline"}
            onClick={() => setFilterType(type)}
            className="px-4 py-1 font-medium cursor-pointer"
          >
            {type === "All" ? "All Listings" : `For ${type}`}
          </Badge>
        ))}
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
                <a href={`tel:${item.phone}`}>Contact Seller</a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
