"use client";

import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  ShoppingBag,
  Megaphone,
  PhoneCall,
  ShieldAlert,
  Compass,
  PlusCircle,
  Landmark,
  TrendingUp,
  BellRing
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TALUKAS = [
  "Veraval",
  "Somnath",
  "Talala",
  "Kodinar",
  "Una",
  "Sutrapada",
  "Gir Gadhada"
];

const QUICK_MENU = [
  {
    href: "/directory",
    label: "Directory",
    sub: "Contacts",
    icon: PhoneCall,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40"
  },
  {
    href: "/events",
    label: "Events",
    sub: "Festivals",
    icon: Calendar,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40"
  },
  {
    href: "/market",
    label: "Market",
    sub: "Buy/Sell/Rent",
    icon: ShoppingBag,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
  },
  {
    href: "/classifieds",
    label: "Classifieds",
    sub: "Jobs & Ads",
    icon: Megaphone,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40"
  },
  {
    href: "/directory",
    label: "Helplines",
    sub: "Emergency",
    icon: ShieldAlert,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/40"
  },
  {
    href: "/market",
    label: "Rentals",
    sub: "Farm & Vehicle",
    icon: TrendingUp,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200/50 dark:border-cyan-900/40"
  },
  {
    href: "/classifieds",
    label: "Post Ad",
    sub: "Free Listing",
    icon: PlusCircle,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/40"
  },
  {
    href: "#somnath",
    label: "Explore",
    sub: "Places & Towns",
    icon: Landmark,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-900/40"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 px-3.5 py-2">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-3 shadow-xs">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border border-primary/20 bg-primary/10 text-primary">
            <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
              XYZ
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-muted-foreground">
              District Portal Welcome
            </span>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold text-foreground">
                Welcome, XYZ
              </h1>
              <Badge variant="secondary" className="px-1.5 py-0 text-[9px] font-semibold">
                Citizen
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Portal
          </span>
          <span className="text-[10px] text-muted-foreground">Gir Somnath, GJ</span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search directory, events, market, ads..."
          className="h-10 pl-9 rounded-xl bg-muted/40 text-xs shadow-xs"
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-200">
        <BellRing className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="truncate text-[11px] font-medium">
          Somnath Beach Festival & Organic Agro-Market registrations open
        </p>
      </div>

      <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-amber-500/15 via-primary/5 to-card p-4 gap-3 shadow-xs">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="gap-1 bg-background/80 text-[10px]">
            <Compass className="size-3" /> Saurashtra Coast, Gujarat
          </Badge>
          <span className="text-[10px] font-semibold text-muted-foreground">Code: GJ-32</span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-foreground">
              Gir Somnath
            </h2>
            <Badge variant="default" className="px-1.5 py-0 text-[10px] font-bold">
              .in
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Your local guide to businesses, community events, marketplace rentals, job classifieds, and district happenings.
          </p>
        </div>

        <div className="border-t border-border/60 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-foreground uppercase tracking-wide">
              District Talukas
            </span>
            <span className="text-[10px] text-muted-foreground">Gir Somnath</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TALUKAS.map((taluka) => (
              <Badge
                key={taluka}
                variant="secondary"
                className="gap-1 border border-border/70 bg-background/90 px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-secondary cursor-pointer shadow-2xs"
              >
                <MapPin className="size-3 text-primary" />
                {taluka}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Quick Portal Access
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {QUICK_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-2.5 text-center shadow-xs transition-all hover:border-primary/40 hover:bg-muted/40 active:scale-95"
              >
                <div className={`flex size-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
                  <Icon className="size-5" />
                </div>
                <span className="mt-1.5 block w-full truncate text-[11px] font-semibold text-foreground">
                  {item.label}
                </span>
                <span className="block w-full truncate text-[9px] text-muted-foreground">
                  {item.sub}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Card className="border-border/80 bg-muted/30 p-3 gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="size-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold text-foreground">
              Emergency & Utility Helplines
            </span>
          </div>
          <Badge variant="outline" className="text-[9px]">24x7</Badge>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
          <div className="rounded-lg bg-background p-1.5 font-medium border border-border/50">
            <p className="text-muted-foreground">Police</p>
            <p className="font-bold text-foreground">100</p>
          </div>
          <div className="rounded-lg bg-background p-1.5 font-medium border border-border/50">
            <p className="text-muted-foreground">Ambulance</p>
            <p className="font-bold text-foreground">108</p>
          </div>
          <div className="rounded-lg bg-background p-1.5 font-medium border border-border/50">
            <p className="text-muted-foreground">Fire</p>
            <p className="font-bold text-foreground">101</p>
          </div>
          <div className="rounded-lg bg-background p-1.5 font-medium border border-border/50">
            <p className="text-muted-foreground">Forest/Gir</p>
            <p className="font-bold text-foreground">1926</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
