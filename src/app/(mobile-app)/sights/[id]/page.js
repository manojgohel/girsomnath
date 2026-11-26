import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Ticket,
  Sparkles,
  Info,
  Navigation,
  Compass
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SIGHTS_DATA } from "@/lib/sights-data";

export function generateStaticParams() {
  return SIGHTS_DATA.map((entry) => ({
    id: entry.id
  }));
}

async function SightDetailContent({ params }) {
  const { id } = await params;
  const sight = SIGHTS_DATA.find((entry) => entry.id === id);

  if (!sight) {
    notFound();
  }

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/sights"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Top Sights
        </Link>
      </div>

      <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-border/80 bg-muted/40 shadow-xs">
        <Image
          src={sight.image}
          alt={sight.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
        <div className="absolute top-2.5 left-2.5">
          <Badge className="bg-background/90 text-foreground backdrop-blur-xs text-[10px] font-bold border-border/70 shadow-xs">
            {sight.category}
          </Badge>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-amber-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-xs">
            <Star className="size-3 fill-current" />
            {sight.rating} ({sight.reviewsCount})
          </Badge>
        </div>
      </div>

      <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
        <div>
          <h1 className="text-lg font-bold text-foreground leading-snug">
            {sight.name}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <MapPin className="size-3.5 text-primary shrink-0" />
            <span>{sight.location}</span>
            <span>•</span>
            <Badge variant="outline" className="text-[10px]">
              {sight.taluka}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60 text-xs">
          <div className="flex items-center gap-2 rounded-xl bg-muted/30 p-2 border border-border/60">
            <Clock className="size-4 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold">Best Time / Hours</p>
              <p className="font-medium text-foreground text-[11px] leading-tight">{sight.bestTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-muted/30 p-2 border border-border/60">
            <Ticket className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold">Entry / Permit</p>
              <p className="font-medium text-foreground text-[11px] leading-tight">{sight.entryFee}</p>
            </div>
          </div>
        </div>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sight.name + ", Gir Somnath, Gujarat")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2.5 text-xs font-bold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
        >
          <Navigation className="size-4" /> Get Directions on Google Maps
        </a>
      </Card>

      <Card className="p-4 border-border/80 bg-card shadow-xs space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Compass className="size-3.5 text-primary" /> About This Destination
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {sight.description}
        </p>

        {sight.tips && (
          <div className="flex items-start gap-2 rounded-xl bg-blue-500/10 p-2.5 text-xs text-blue-900 dark:text-blue-300 border border-blue-500/20 mt-2">
            <Info className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Visitor Tip:</strong> {sight.tips}
            </span>
          </div>
        )}
      </Card>

      <Card className="p-4 border-border/80 bg-card shadow-xs space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-amber-500" /> Key Highlights & Features
        </h2>
        <ul className="space-y-1.5 text-xs text-muted-foreground">
          {sight.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-primary shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </Card>

      {sight.gallery && sight.gallery.length > 0 && (
        <Card className="p-4 border-border/80 bg-card shadow-xs space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Photo Gallery
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {sight.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-4/3 overflow-hidden rounded-xl border border-border/70 bg-muted/40"
              >
                <Image
                  src={imgUrl}
                  alt={`${sight.name} ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default function SightDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col space-y-3 px-3.5 py-4">
          <div className="h-4 w-28 rounded-lg bg-muted animate-pulse" />
          <div className="aspect-16/9 w-full rounded-2xl bg-muted animate-pulse" />
          <div className="h-28 rounded-2xl bg-muted animate-pulse" />
        </div>
      }
    >
      <SightDetailContent params={params} />
    </Suspense>
  );
}
