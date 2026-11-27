"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  UploadCloud
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty
} from "@/components/ui/combobox";
import { TALUKAS, EVENT_TAGS, EVENT_CATEGORIES } from "@/lib/constants";

export default function SubmitEventPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Community & Culture",
    tag: "Festival",
    date: "",
    time: "",
    location: "",
    price: "Free Entry",
    organizer: "",
    phone: "",
    whatsapp: "",
    description: "",
    highlights: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/events");
    }, 1200);
  };

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Events
        </Link>
      </div>

      <PageHeader
        title="Submit New Event"
        description="Publish festivals, cultural gatherings, workshops or expos in Gir Somnath."
        icon={Calendar}
      />

      {submitted ? (
        <Card className="p-6 border-border/80 bg-card text-center space-y-2 shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Event Submitted Successfully</h2>
          <p className="text-xs text-muted-foreground">
            Your event has been submitted for publishing review. Redirecting...
          </p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" /> Event Schedule & Title
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Event Title *</label>
              <Input
                required
                placeholder="e.g. Gir Somnath Folk Music Festival"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Category *</label>
                <Combobox
                  items={EVENT_CATEGORIES}
                  value={formData.category}
                  onValueChange={(val) => val && setFormData({ ...formData, category: val })}
                >
                  <ComboboxInput
                    placeholder="Select Category"
                    className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No category found.</ComboboxEmpty>
                    <ComboboxList>
                      {EVENT_CATEGORIES.map((cat) => (
                        <ComboboxItem key={cat} value={cat}>
                          {cat}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Tag *</label>
                <Combobox
                  items={EVENT_TAGS}
                  value={formData.tag}
                  onValueChange={(val) => val && setFormData({ ...formData, tag: val })}
                >
                  <ComboboxInput
                    placeholder="Select Tag"
                    className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No tag found.</ComboboxEmpty>
                    <ComboboxList>
                      {EVENT_TAGS.map((t) => (
                        <ComboboxItem key={t} value={t}>
                          {t}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Dates *</label>
                <Input
                  required
                  placeholder="e.g. Jan 10 - Jan 14, 2027"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Timings *</label>
                <Input
                  required
                  placeholder="e.g. 5:00 PM - 10:00 PM"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Venue & Location *</label>
              <Input
                required
                placeholder="e.g. Chowpatty Ground, Veraval"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Users className="size-3.5 text-primary" /> Organizer & Passes
            </h2>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Organizer Name *</label>
                <Input
                  required
                  placeholder="e.g. District Cultural Samiti"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Passes / Entry Fee</label>
                <Input
                  placeholder="e.g. Free Entry or ₹ 100"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Contact Phone *</label>
                <Input
                  required
                  type="tel"
                  placeholder="e.g. +91 2876 231200"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">WhatsApp Number</label>
                <Input
                  type="tel"
                  placeholder="e.g. 912876231200"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" /> Details & Banner
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Event Overview *</label>
              <Textarea
                required
                rows={3}
                placeholder="Describe the event, target audience, schedule highlights, chief guests..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl text-xs bg-muted/30 border-border/70 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Highlights (Comma separated)
              </label>
              <Input
                placeholder="e.g. Live Dayro, Folk Dance, Food Stalls, Handicrafts"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 text-center">
              <UploadCloud className="mx-auto size-7 text-muted-foreground/80 mb-1" />
              <p className="text-xs font-semibold text-foreground">Upload Event Poster & Gallery</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">High-resolution banner PNG or JPG</p>
            </div>
          </Card>

          <Button type="submit" size="default" className="w-full h-11 rounded-xl text-xs font-bold shadow-xs">
            Submit Event
          </Button>
        </form>
      )}
    </div>
  );
}
