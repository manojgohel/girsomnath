"use client";

import Link from "next/link";
import Image from "next/image";
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
  ExternalLink,
  Phone,
  ArrowUpRight,
  SunMedium
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PwaInstallBanner } from "@/components/pwa-install-banner";
import { TALUKAS } from "@/lib/constants";

const CULTURAL_STATS = [
  { label: "Jyotirlinga", value: "1st of 12", sub: "Somnath Mahadev" },
  { label: "Gir Kesar", value: "GI-Tagged", sub: "Talala Mango Hub" },
  { label: "Wildlife Home", value: "Asiatic Lion", sub: "Gir Forest Sanctuary" },
  { label: "Coastline", value: "Arabian Sea", sub: "Port & Fisheries" }
];

const MAIN_MODULES = [
  {
    href: "/directory",
    title: "Business Directory",
    desc: "Vyapar, verified local services, clinics & shops",
    badge: "Verified",
    icon: PhoneCall,
    iconColor: "text-amber-700 dark:text-amber-400",
    gradient: "from-amber-500/15 via-orange-500/5 to-transparent",
    borderHover: "hover:border-amber-500/50"
  },
  {
    href: "/events",
    title: "Utsav & Events",
    desc: "Maha Shivratri, beach mela, aarti & mandal sabha",
    badge: "Upcoming",
    icon: Calendar,
    iconColor: "text-orange-700 dark:text-orange-400",
    gradient: "from-orange-500/15 via-red-500/5 to-transparent",
    borderHover: "hover:border-orange-500/50"
  },
  {
    href: "/market",
    title: "Krishi & Market",
    desc: "Kesar mango orchards, tractors, mandis & tools",
    badge: "Rentals",
    icon: ShoppingBag,
    iconColor: "text-emerald-700 dark:text-emerald-400",
    gradient: "from-emerald-500/15 via-amber-500/5 to-transparent",
    borderHover: "hover:border-emerald-500/50"
  },
  {
    href: "/classifieds",
    title: "Classifieds & Rojgar",
    desc: "District jobs, rental houses, factory & driver ads",
    badge: "Active",
    icon: Megaphone,
    iconColor: "text-amber-800 dark:text-amber-300",
    gradient: "from-amber-600/15 via-yellow-500/5 to-transparent",
    borderHover: "hover:border-amber-600/50"
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

      <div className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-linear-to-r from-amber-500/15 via-orange-500/10 to-amber-600/20 p-3.5 shadow-xs">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-amber-600 to-orange-600 text-white shadow-sm ring-2 ring-amber-400/40">
              <SunMedium className="size-6 text-amber-100 animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-widest leading-none">
                  जय सोमनाथ · Gir Somnath
                </span>
              </div>
              <h1 className="text-sm font-bold text-foreground mt-1 truncate">
                Welcome to Gir Somnath
              </h1>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                Land of Somnath Jyotirlinga, Gir Kesar Mango & Asiatic Lions
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-500/20 dark:bg-amber-400/10 border border-amber-600/30 px-2.5 py-1 rounded-full shrink-0">
            <span className="size-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" /> GJ-32
          </span>
        </div>
      </div>

      <Card className="relative overflow-hidden border-amber-500/30 bg-card p-3 py-3 gap-2 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex size-2 rounded-full bg-amber-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Saurashtra Heritage & Gateway
            </span>
          </div>
          <Badge variant="outline" className="text-[10px] border-amber-500/40 text-amber-800 dark:text-amber-300 font-semibold bg-amber-500/10">
            पवित्र भूमि
          </Badge>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-foreground tracking-tight font-serif leading-none">
              Gir Somnath
            </h2>
            <Badge className="bg-amber-600 text-white px-1.5 py-0 text-[10px] font-bold hover:bg-amber-700">
              .in
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Civic and cultural gateway connecting local vyapar, cultural events, agricultural mandis, and travel guides.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-amber-500/20">
          {CULTURAL_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-1 text-center"
            >
              <p className="text-[8.5px] uppercase font-bold text-amber-800 dark:text-amber-300 truncate">
                {stat.label}
              </p>
              <p className="text-[10.5px] font-bold text-foreground truncate">
                {stat.value}
              </p>
              <p className="text-[8px] text-muted-foreground truncate">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-border/60 pt-1.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-semibold text-foreground flex items-center gap-1">
              <MapPin className="size-3 text-amber-600 dark:text-amber-400" /> Administrative Talukas
            </span>
            <span className="text-[9.5px] text-muted-foreground font-medium">6 Talukas</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {TALUKAS.map((taluka) => (
              <Link
                key={taluka}
                href={`/directory?taluka=${encodeURIComponent(taluka)}`}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-600/30 bg-amber-500/5 px-2 py-0.5 text-[10.5px] font-semibold text-foreground transition-all hover:bg-amber-500/15 hover:border-amber-600/50 active:scale-95 shadow-2xs"
              >
                <span>{taluka}</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <section className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-amber-600" /> District Services
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">Core Portals</span>
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
                    <div className="flex size-10 items-center justify-center rounded-xl bg-background border border-amber-500/30 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className={`size-5 stroke-[2.2] ${item.iconColor}`} />
                    </div>
                    <Badge variant="secondary" className="text-[9px] px-1.5 py-0 font-bold bg-background/90 border border-amber-500/30 text-amber-800 dark:text-amber-300">
                      {item.badge}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1">
                      {item.title}
                    </h3>
                    <p className="text-[10.5px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px] font-semibold text-muted-foreground group-hover:text-foreground">
                  <span>Open Section</span>
                  <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-amber-600 transition-colors" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Link href="/sights" className="block active:scale-[0.99] transition-transform">
        <Card className="relative overflow-hidden border-border/80 bg-linear-to-r from-orange-500/15 via-amber-500/10 to-emerald-500/10 p-3.5 shadow-xs hover:border-primary/50 transition-colors">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-amber-600 via-orange-600 to-amber-700 text-white shadow-xs">
                <Compass className="size-6 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground">
                    Top Sights & Attractions
                  </span>
                  <Badge className="bg-amber-600 text-white text-[9px] px-1.5 py-0 font-bold">
                    <Sparkles className="size-2.5 mr-0.5" /> Guide
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                  Somnath Jyotirlinga, Gir Lion Safari, Triveni Sangam & Beaches
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
              <p className="text-[10px] text-muted-foreground mt-0.5">Direct 24/7 Citizen Assistance</p>
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
              className="flex items-center justify-between rounded-xl bg-muted/30 p-2.5 border border-border/70 hover:bg-muted/70 hover:border-amber-600/40 transition-colors active:scale-95"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-foreground truncate">{item.label}</p>
                <p className="text-[9px] text-muted-foreground truncate">{item.sub}</p>
              </div>
              <div className="flex items-center gap-1 font-mono font-bold text-xs text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2 py-1 rounded-lg shrink-0">
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
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-600/10 text-amber-700 dark:text-amber-400">
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
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-400 hover:underline"
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

      <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-2">
        Gir Somnath.in is an independent community portal and is not an official government website or affiliated with any government department, entity, or scheme. It is an informational directory and utility platform for the citizens of Gir Somnath district.
      </p>

      <div className="-mx-3.5 -mb-4 overflow-hidden pt-2">
        <div className="relative aspect-[4.4/1] w-full">
          <Image
            src="/images/footer-image-gir-somnath.png"
            alt="Gir Somnath Heritage Panorama"
            fill
            className="object-cover object-bottom"
            sizes="(max-width: 768px) 100vw, 450px"
          />
        </div>
      </div>
    </div>
  );
}
