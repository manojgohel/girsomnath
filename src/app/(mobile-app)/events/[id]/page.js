import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Share2,
  BookmarkPlus,
  Phone,
  MessageCircle,
  Sparkles,
  Ticket,
  Users,
  Compass,
  Images
} from "lucide-react";
import { EVENTS_DATA } from "@/lib/events-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return EVENTS_DATA.map((item) => ({
    id: item.id
  }));
}

async function EventDetailContent({ params }) {
  const { id } = await params;
  const event = EVENTS_DATA.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const whatsappNumber = event.whatsapp || event.phone.replace(/[^0-9]/g, "");

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Events
        </Link>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Bookmark" className="size-8 rounded-full">
            <BookmarkPlus className="size-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Share" className="size-8 rounded-full">
            <Share2 className="size-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden border-border/80 bg-card p-0 shadow-xs">
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-muted/40">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover"
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs text-[10px] font-semibold border-border/60">
              {event.category}
            </Badge>
            <Badge variant="outline" className="bg-background/90 backdrop-blur-xs text-[10px] font-semibold border-border/60">
              {event.tag}
            </Badge>
          </div>
          <div className="absolute bottom-2.5 right-2.5">
            <Badge variant="default" className="text-[10px] font-bold shadow-xs">
              {event.price}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h1 className="text-base font-bold text-foreground leading-snug">
            {event.title}
          </h1>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/60">
            <div className="flex items-start gap-2">
              <Calendar className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Event Date</span>
                <span className="font-semibold text-foreground">{event.date}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Timings</span>
                <span className="font-semibold text-foreground">{event.time}</span>
              </div>
            </div>

            <div className="col-span-2 flex items-start gap-2 pt-1 border-t border-border/40">
              <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Venue & Location</span>
                <span className="font-medium text-foreground">{event.location}, Gir Somnath</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
            <Button
              render={<a href={`tel:${event.phone}`} />}
              size="default"
              variant="default"
              className="h-10 rounded-xl text-xs font-semibold shadow-xs"
            >
              <Phone className="size-3.5 mr-1.5" /> Call Organizer
            </Button>
            <Button
              render={
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I would like more information regarding the event "${event.title}" on Gir Somnath.in.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="default"
              variant="outline"
              className="h-10 rounded-xl text-xs font-semibold border-emerald-600/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 shadow-xs"
            >
              <MessageCircle className="size-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" /> WhatsApp
            </Button>
          </div>
        </div>
      </Card>

      {event.gallery && event.gallery.length > 0 && (
        <Card className="border-border/80 bg-card p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Images className="size-3.5 text-primary" /> Event Media & Photos
            </h2>
            <span className="text-[10px] font-medium text-muted-foreground">
              {event.gallery.length} Images
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {event.gallery.map((imgSrc, idx) => (
              <div
                key={idx}
                className="group relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted/40 shadow-2xs"
              >
                <Image
                  src={imgSrc}
                  alt={`${event.title} media ${idx + 1}`}
                  fill
                  sizes="(max-width: 640px) 30vw, 120px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="border-border/80 bg-card p-4 shadow-xs space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Compass className="size-3.5 text-primary" /> About Event
        </h2>
        <p className="text-xs text-foreground/85 leading-relaxed">
          {event.description}
        </p>
      </Card>

      {event.highlights && event.highlights.length > 0 && (
        <Card className="border-border/80 bg-card p-4 shadow-xs space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" /> Event Highlights
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {event.highlights.map((hl, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs font-medium text-foreground border border-border/60"
              >
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="border-border/80 bg-card p-4 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Users className="size-3.5 text-primary" /> Organizer & Passes
        </h2>

        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-muted-foreground">Organizer</span>
            <span className="font-semibold text-foreground text-right">{event.organizer}</span>
          </div>
          <div className="flex items-start justify-between border-t border-border/40 pt-1.5">
            <span className="text-[11px] text-muted-foreground">Passes / Entry Fee</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{event.price}</span>
          </div>
          <div className="flex items-start justify-between border-t border-border/40 pt-1.5">
            <span className="text-[11px] text-muted-foreground">Helpline</span>
            <a href={`tel:${event.phone}`} className="font-semibold text-foreground hover:underline">
              {event.phone}
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function EventDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading event details...</div>}>
      <EventDetailContent params={params} />
    </Suspense>
  );
}
