"use client";

import Link from "next/link";
import {
  Calendar,
  ShoppingBag,
  Megaphone,
  PhoneCall,
  Compass,
  MapPin,
  ShieldAlert
} from "lucide-react";
import { Card } from "@/components/ui/card";
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

const MAIN_MENU = [
  {
    href: "/directory",
    label: "Directory",
    icon: PhoneCall,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/50 dark:border-blue-900/40"
  },
  {
    href: "/events",
    label: "Events",
    icon: Calendar,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200/50 dark:border-purple-900/40"
  },
  {
    href: "/market",
    label: "Market",
    icon: ShoppingBag,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-900/40"
  },
  {
    href: "/classifieds",
    label: "Classified Ads",
    icon: Megaphone,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/40"
  }
];

const EMERGENCY_NUMBERS = [
  { label: "Police", number: "100" },
  { label: "Ambulance", number: "108" },
  { label: "Fire", number: "101" },
  { label: "Forest/Gir", number: "1926" }
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
        <div className="grid grid-cols-4 gap-2">
          {MAIN_MENU.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-border/70 bg-card p-2 text-center shadow-xs transition-all hover:border-primary/40 hover:bg-muted/40 active:scale-95"
              >
                <div className={`flex size-11 items-center justify-center rounded-xl border transition-transform group-hover:scale-105 ${item.color}`}>
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

      <Card className="border-border/80 bg-muted/30 p-3 gap-2.5 shadow-xs">
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
          {EMERGENCY_NUMBERS.map((item) => (
            <a
              key={item.label}
              href={`tel:${item.number}`}
              className="rounded-lg bg-background p-1.5 font-medium border border-border/50 transition-colors hover:bg-secondary active:scale-95 block"
            >
              <p className="text-muted-foreground">{item.label}</p>
              <p className="font-bold text-foreground">{item.number}</p>
            </a>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden border-border/80 bg-card p-3 gap-2.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">
              Gir Somnath District Map
            </span>
          </div>
          <Badge variant="outline" className="text-[9px]">Gujarat</Badge>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/70 bg-muted">
          <iframe
            title="Gir Somnath District Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476686.0465355403!2d70.2928503859736!3d20.89201594951167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bfd2f1f440742f5%3A0xe7a508920bb35324!2sGir%20Somnath%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Card>

      <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-2 pb-2">
        GirSomnath.in is an independent community portal and is not an official government website or affiliated with any government department, entity, or scheme. It is an informational directory and utility platform for the citizens of Gir Somnath district.
      </p>
    </div>
  );
}
