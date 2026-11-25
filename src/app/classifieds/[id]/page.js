import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Share2,
  BookmarkPlus,
  Phone,
  MessageCircle,
  Briefcase,
  ShieldCheck,
  Building2,
  Images,
  Compass
} from "lucide-react";
import { ADS_DATA } from "@/lib/classifieds-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  return ADS_DATA.map((item) => ({
    id: item.id
  }));
}

async function ClassifiedDetailContent({ params }) {
  const { id } = await params;
  const ad = ADS_DATA.find((a) => a.id === id);

  if (!ad) {
    notFound();
  }

  const whatsappNumber = ad.whatsapp || ad.contact.replace(/[^0-9]/g, "");

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/classifieds"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Classifieds
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
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted/40">
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 420px"
            className="object-cover"
          />
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-xs text-[10px] font-semibold border-border/60">
              {ad.category}
            </Badge>
            <Badge variant="outline" className="bg-background/90 backdrop-blur-xs text-[10px] font-semibold border-border/60">
              {ad.tag}
            </Badge>
          </div>
          <div className="absolute bottom-2.5 right-2.5">
            <Badge variant="default" className="text-xs font-bold shadow-xs px-2.5 py-1 bg-emerald-600 text-white">
              {ad.compensation}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h1 className="text-base font-bold text-foreground leading-snug">
              {ad.title}
            </h1>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-0.5">
              <span className="flex items-center gap-1">
                <MapPin className="size-3 text-primary shrink-0" /> {ad.location}, Taluka: {ad.taluka}
              </span>
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="size-3" /> {ad.time}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
            <Button
              render={<a href={`tel:${ad.contact}`} />}
              size="default"
              variant="default"
              className="h-10 rounded-xl text-xs font-semibold shadow-xs"
            >
              <Phone className="size-3.5 mr-1.5" /> Call Contact
            </Button>
            <Button
              render={
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    `Hello, I am contacting you regarding your classified ad "${ad.title}" on GirSomnath.in.`
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

      {ad.gallery && ad.gallery.length > 0 && (
        <Card className="border-border/80 bg-card p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Images className="size-3.5 text-primary" /> Photos & Documents
            </h2>
            <span className="text-[10px] font-medium text-muted-foreground">
              {ad.gallery.length} Images
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {ad.gallery.map((imgSrc, idx) => (
              <div
                key={idx}
                className="group relative aspect-video overflow-hidden rounded-xl border border-border/70 bg-muted/40 shadow-2xs"
              >
                <Image
                  src={imgSrc}
                  alt={`${ad.title} image ${idx + 1}`}
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
          <Compass className="size-3.5 text-primary" /> Ad Description
        </h2>
        <p className="text-xs text-foreground/85 leading-relaxed">
          {ad.description}
        </p>
      </Card>

      {ad.requirements && ad.requirements.length > 0 && (
        <Card className="border-border/80 bg-card p-4 shadow-xs space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" /> Requirements & Criteria
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {ad.requirements.map((req, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-2 text-xs font-medium text-foreground border border-border/60"
              >
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                <span>{req}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="border-border/80 bg-card p-4 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Building2 className="size-3.5 text-primary" /> Advertiser Details
        </h2>

        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between">
            <span className="text-[11px] text-muted-foreground">Posted By</span>
            <span className="font-semibold text-foreground text-right">{ad.poster}</span>
          </div>
          <div className="flex items-start justify-between border-t border-border/40 pt-1.5">
            <span className="text-[11px] text-muted-foreground">Compensation / Rate</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{ad.compensation}</span>
          </div>
          <div className="flex items-start justify-between border-t border-border/40 pt-1.5">
            <span className="text-[11px] text-muted-foreground">Phone</span>
            <a href={`tel:${ad.contact}`} className="font-semibold text-foreground hover:underline">
              {ad.contact}
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ClassifiedDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading ad details...</div>}>
      <ClassifiedDetailContent params={params} />
    </Suspense>
  );
}
