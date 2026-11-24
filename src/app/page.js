"use client";

import Link from "next/link";
import {
  Search,
  Calendar,
  ShoppingBag,
  Megaphone,
  PhoneCall,
  ArrowRight,
  Calculator,
  Scale,
  Store,
  Pill,
  Hospital,
  Building2,
  Landmark,
  Wrench,
  Flame,
  Sparkles,
  Presentation,
  Coins,
  KeyRound,
  Briefcase,
  Building,
  Hammer,
  LayoutGrid,
  Compass,
  MapPin
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

const DIRECTORY_MENU = [
  {
    href: "/directory?category=CA",
    label: "CA",
    icon: Calculator,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40"
  },
  {
    href: "/directory?category=Advocates",
    label: "Advocates",
    icon: Scale,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/40"
  },
  {
    href: "/directory?category=Shops",
    label: "Shops",
    icon: Store,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40"
  },
  {
    href: "/directory?category=Medical+Stores",
    label: "Medical Stores",
    icon: Pill,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
  },
  {
    href: "/directory?category=Hospitals",
    label: "Hospitals",
    icon: Hospital,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/40"
  },
  {
    href: "/directory?category=Shopping+Malls",
    label: "Shopping Malls",
    icon: Building2,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40"
  },
  {
    href: "/directory?category=Govt+Offices",
    label: "Govt Offices",
    icon: Landmark,
    color: "bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/40"
  },
  {
    href: "/directory?category=Garages",
    label: "Garages",
    icon: Wrench,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-900/40"
  },
  {
    href: "/directory?category=Temples",
    label: "Temples/Dargas",
    icon: Flame,
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200/50 dark:border-yellow-900/40"
  }
];

const EVENTS_MENU = [
  {
    href: "/events?tag=Festival",
    label: "Festivals",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40"
  },
  {
    href: "/events?tag=Exhibition",
    label: "Exhibition",
    icon: Presentation,
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-sky-900/40"
  },
  {
    href: "/events?tag=Tour",
    label: "Tours",
    icon: Compass,
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200/50 dark:border-teal-900/40"
  }
];

const MARKET_MENU = [
  {
    href: "/market?type=Buy",
    label: "Buy",
    icon: ShoppingBag,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
  },
  {
    href: "/market?type=Sell",
    label: "Sell",
    icon: Coins,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40"
  },
  {
    href: "/market?type=Rent",
    label: "Rent",
    icon: KeyRound,
    color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200/50 dark:border-cyan-900/40"
  }
];

const CLASSIFIEDS_MENU = [
  {
    href: "/classifieds?category=Jobs",
    label: "Jobs",
    icon: Briefcase,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40"
  },
  {
    href: "/classifieds?category=Real+Estate",
    label: "Real Estate",
    icon: Building,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
  },
  {
    href: "/classifieds?category=Services",
    label: "Services",
    icon: Hammer,
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200/50 dark:border-orange-900/40"
  },
  {
    href: "/classifieds",
    label: "All Ads",
    icon: LayoutGrid,
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/40"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 px-3 py-2">
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9 border border-primary/20 bg-primary/10 text-primary">
            <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
              XYZ
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground leading-none">
              GirSomnath.in Portal
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <h1 className="text-sm font-bold text-foreground">
                Welcome, XYZ
              </h1>
              <Badge variant="secondary" className="px-1.5 py-0 text-[9px] font-semibold">
                Citizen
              </Badge>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Portal
        </span>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search directory, events, market, ads..."
          className="h-10 pl-9 rounded-xl bg-muted/40 text-xs shadow-xs"
        />
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
              GirSomnath
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
              <Link
                key={taluka}
                href={`/directory?taluka=${encodeURIComponent(taluka)}`}
                className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-background px-2.5 py-1 text-[11px] font-medium text-foreground shadow-2xs transition-colors hover:border-primary/50 hover:bg-secondary active:scale-95"
              >
                <MapPin className="size-3 text-primary shrink-0" />
                <span>{taluka}</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <section className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <PhoneCall className="size-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Directory
            </h2>
          </div>
          <Button asChild variant="link" size="sm" className="h-auto p-0 text-[11px] font-semibold gap-0.5">
            <Link href="/directory">
              View All <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {DIRECTORY_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-2 text-center shadow-xs transition-all hover:border-primary/40 hover:bg-muted/40 active:scale-95"
              >
                <div className={`flex size-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
                  <Icon className="size-5" />
                </div>
                <span className="mt-1.5 block w-full truncate text-[11px] font-semibold text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Events
            </h2>
          </div>
          <Button asChild variant="link" size="sm" className="h-auto p-0 text-[11px] font-semibold gap-0.5">
            <Link href="/events">
              View All <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {EVENTS_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-2 text-center shadow-xs transition-all hover:border-primary/40 hover:bg-muted/40 active:scale-95"
              >
                <div className={`flex size-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
                  <Icon className="size-5" />
                </div>
                <span className="mt-1.5 block w-full truncate text-[11px] font-semibold text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="size-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Market
            </h2>
          </div>
          <Button asChild variant="link" size="sm" className="h-auto p-0 text-[11px] font-semibold gap-0.5">
            <Link href="/market">
              View All <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {MARKET_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-2 text-center shadow-xs transition-all hover:border-primary/40 hover:bg-muted/40 active:scale-95"
              >
                <div className={`flex size-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
                  <Icon className="size-5" />
                </div>
                <span className="mt-1.5 block w-full truncate text-[11px] font-semibold text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Megaphone className="size-4 text-primary" />
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Classifieds Ads
            </h2>
          </div>
          <Button asChild variant="link" size="sm" className="h-auto p-0 text-[11px] font-semibold gap-0.5">
            <Link href="/classifieds">
              View All <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {CLASSIFIEDS_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-2 text-center shadow-xs transition-all hover:border-primary/40 hover:bg-muted/40 active:scale-95"
              >
                <div className={`flex size-10 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
                  <Icon className="size-5" />
                </div>
                <span className="mt-1.5 block w-full truncate text-[11px] font-semibold text-foreground">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
