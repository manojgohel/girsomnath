import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Share2,
  BookmarkPlus,
  Compass,
  CheckCircle2,
  Building2,
  MessageCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDirectoryItemAction } from "@/actions/directory-actions";

async function DirectoryDetailContent({ params }) {
  const { id } = await params;
  const item = await getDirectoryItemAction(id);

  if (!item || item.status !== "approved") {
    notFound();
  }

  const whatsappNumber =
    item.whatsapp || item.phone?.replace(/[^0-9]/g, "") || "";

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Directory
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

      <Card className="overflow-hidden border-border/80 bg-card p-4 shadow-xs gap-3.5">
        <div className="flex items-start gap-3.5">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-muted/40 shadow-xs">
            <Image
              src={item.image || "/images/directory/shops.svg"}
              alt={item.name}
              width={56}
              height={56}
              className="size-full object-cover"
            />
          </div>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base font-bold text-foreground leading-snug">
                {item.name}
              </h1>
              {item.verified && (
                <Badge variant="secondary" className="gap-1 px-1.5 py-0 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3" /> Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="outline" className="px-2 py-0.5 text-[10px] font-medium border-border/80 bg-muted/30">
                {item.category}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="size-3 text-primary" /> {item.town || item.taluka}, Taluka: {item.taluka}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
          <Button
            render={<a href={`tel:${item.phone}`} />}
            size="default"
            variant="default"
            className="h-10 rounded-xl text-xs font-semibold shadow-xs"
          >
            <Phone className="size-3.5 mr-1.5" /> Call Primary
          </Button>
          {whatsappNumber ? (
            <Button
              render={
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="default"
              variant="outline"
              className="h-10 rounded-xl text-xs font-semibold border-emerald-600/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            >
              <MessageCircle className="size-3.5 mr-1.5" /> WhatsApp
            </Button>
          ) : (
            <Button
              disabled
              size="default"
              variant="outline"
              className="h-10 rounded-xl text-xs font-semibold opacity-50"
            >
              <MessageCircle className="size-3.5 mr-1.5" /> WhatsApp
            </Button>
          )}
        </div>
      </Card>

      <Card className="border-border/80 bg-card p-4 shadow-xs space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Building2 className="size-3.5 text-primary" /> Contact Details
        </h2>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5">
            <Phone className="size-4 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Phone Number</span>
              <a href={`tel:${item.phone}`} className="font-semibold text-foreground hover:underline">
                {item.phone}
              </a>
              {item.altPhone && (
                <span className="text-muted-foreground text-[11px] mt-0.5">
                  Alt: {item.altPhone}
                </span>
              )}
            </div>
          </div>

          {item.email && (
            <div className="flex items-start gap-2.5">
              <Mail className="size-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">Email Address</span>
                <a href={`mailto:${item.email}`} className="font-semibold text-foreground hover:underline">
                  {item.email}
                </a>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5">
            <Clock className="size-4 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Operating Hours</span>
              <span className="font-medium text-foreground">{item.timing || "09:00 AM - 07:00 PM"}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="size-4 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">Address & Location</span>
              <span className="font-medium text-foreground leading-relaxed">
                {item.address}, {item.town || item.taluka}, Gir Somnath, Gujarat
              </span>
            </div>
          </div>
        </div>
      </Card>

      {item.description && (
        <Card className="border-border/80 bg-card p-4 shadow-xs space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Compass className="size-3.5 text-primary" /> Overview
          </h2>
          <p className="text-xs text-foreground/85 leading-relaxed">
            {item.description}
          </p>
        </Card>
      )}

      {item.services && item.services.length > 0 && (
        <Card className="border-border/80 bg-card p-4 shadow-xs space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-primary" /> Services & Features
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {item.services.map((srv, idx) => (
              <Badge key={idx} variant="secondary" className="px-2.5 py-1 text-xs font-medium">
                {srv}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default function DirectoryDetailPage({ params }) {
  return (
    <Suspense fallback={<div className="p-4 text-xs text-muted-foreground">Loading contact details...</div>}>
      <DirectoryDetailContent params={params} />
    </Suspense>
  );
}
