"use client";

import Link from "next/link";
import {
  Calendar,
  ShoppingBag,
  Megaphone,
  PhoneCall,
  Compass,
  MapPin,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Search,
  ExternalLink,
  Phone,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PwaInstallBanner } from "@/components/pwa-install-banner";
import { TALUKAS } from "@/lib/constants";

const MAIN_MODULES = [
  {
    href: "/directory",
    title: "Business Directory",
    desc: "Local shops, verified services, medical & offices",
    badge: "Verified",
    icon: PhoneCall,
    iconColor: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500/10 via-sky-500/5 to-transparent",
    borderHover: "hover:border-blue-500/40"
  },
  {
    href: "/events",
    title: "Events & Festivals",
    desc: "Temple aarti, coastal expos & community fairs",
    badge: "Upcoming",
    icon: Calendar,
    iconColor: "text-purple-600 dark:text-purple-400",
    gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
    borderHover: "hover:border-purple-500/40"
  },
  {
    href: "/market",
    title: "Marketplace Rentals",
    desc: "Tractors, warehouses, farm gear & orchards",
    badge: "Rentals",
    icon: ShoppingBag,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/40"
  },
  {
    href: "/classifieds",
    title: "Classifieds & Jobs",
    desc: "Local job vacancies, flats, rentals & notices",
    badge: "Active",
    icon: Megaphone,
    iconColor: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderHover: "hover:border-amber-500/40"
  }
];

const EMERGENCY_NUMBERS = [
  { label: "Police Control", number: "100", sub: "District HQ" },
  { label: "Ambulance", number: "108", sub: "Emergency Medical" },
  { label: "Fire Station", number: "101", sub: "Disaster / Fire" },
  { label: "Gir Forest Rescue", number: "1926", sub: "Lion & Wildlife" }
];

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 px-3.5 py-2.5">
      <PwaInstallBanner />

      <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="size-10 border border-primary/20 bg-primary/10 text-primary">
            <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
              GS
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider leading-none">
              GirSomnath.in Portal
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <h1 className="text-sm font-bold text-foreground truncate">
                Welcome to Gir Somnath
              </h1>
              <Badge variant="secondary" className="px-1.5 py-0 text-[9px] font-semibold shrink-0">
                Citizen
              </Badge>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full shrink-0">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Portal
        </span>
      </div>

      <Card className="relative overflow-hidden border-border/80 bg-card p-4 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex size-2 rounded-full bg-primary" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              District Explorer
            </span>
          </div>
          <Badge variant="outline" className="text-[10px] border-border/70 font-semibold">
            Gujarat · GJ-32
          </Badge>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-lg font-bold text-foreground tracking-tight">
              GirSomnath
            </h2>
            <Badge variant="default" className="px-1.5 py-0 text-[10px] font-bold">
              .in
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            All-in-one digital district gateway connecting verified local merchants, cultural events, agriculture rentals, job vacancies, and travel sights.
          </p>
        </div>

        <div className="border-t border-border/60 pt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-foreground flex items-center gap-1">
              <MapPin className="size-3 text-primary" /> Browse by Taluka
            </span>
            <span className="text-[10px] text-muted-foreground">7 Administrative Talukas</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TALUKAS.map((taluka) => (
              <Link
                key={taluka}
                href={`/directory?taluka=${encodeURIComponent(taluka)}`}
                className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground transition-all hover:bg-muted/70 hover:border-primary/40 active:scale-95 shadow-2xs"
              >
                <span>{taluka}</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Flame className="size-3.5 text-primary" /> District Services
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">Explore All 4 Pillars</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {MAIN_MODULES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className={`group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs transition-all bg-linear-to-b ${item.gradient} ${item.borderHover} hover:shadow-sm active:scale-[0.98]`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background border border-border/80 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className={`size-5 stroke-[2.2] ${item.iconColor}`} />
                    </div>
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-semibold bg-background/80 border border-border/60">
                      {item.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                      {item.title}
                    </h3>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] font-semibold text-muted-foreground group-hover:text-foreground">
                  <span>Open Section</span>
                  <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Link href="/sights" className="block active:scale-[0.99] transition-transform">
        <Card className="relative overflow-hidden border-border/80 bg-linear-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 p-3.5 shadow-xs hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-600 text-white shadow-xs">
                <Compass className="size-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground">
                    Top Sights & Attractions
                  </span>
                  <Badge className="bg-amber-500 text-white text-[9px] px-1.5 py-0 font-bold">
                    <Sparkles className="size-2.5 mr-0.5" /> Guide
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  Most visited places, Somnath Temple, Gir Lion Safari & Beaches
                </p>
              </div>
            </div>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-background border border-border/70 text-foreground shadow-2xs">
              <ChevronRight className="size-4 text-muted-foreground" />
            </div>
          </div>
        </Card>
      </Link>

      <Card className="border-border/80 bg-card p-3.5 gap-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
              <ShieldAlert className="size-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground leading-none">
                Emergency & Helplines
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Direct 24/7 Government Assistance</p>
            </div>
          </div>
          <Badge variant="outline" className="text-[9px] border-border/70 font-semibold bg-muted/40">
            24x7 Free
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {EMERGENCY_NUMBERS.map((item) => (
            <a
              key={item.label}
              href={`tel:${item.number}`}
              className="flex items-center justify-between rounded-xl bg-muted/30 p-2.5 border border-border/70 hover:bg-muted/70 hover:border-primary/40 transition-colors active:scale-95"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-foreground truncate">{item.label}</p>
                <p className="text-[9px] text-muted-foreground truncate">{item.sub}</p>
              </div>
              <div className="flex items-center gap-1 font-mono font-bold text-xs text-primary bg-primary/10 px-2 py-1 rounded-lg shrink-0">
                <Phone className="size-3" />
                <span>{item.number}</span>
              </div>
            </a>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden border-border/80 bg-card p-3.5 gap-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MapPin className="size-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground leading-none">
                District Interactive Map
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">Explore Coastal Saurashtra Region</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/place/Gir+Somnath,+Gujarat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline"
          >
            Full Map <ExternalLink className="size-3" />
          </a>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/70 bg-muted/40 shadow-inner">
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
