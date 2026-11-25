"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Megaphone,
  Briefcase,
  Clock,
  ShieldCheck,
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

const CLASSIFIED_CATEGORIES = ["Jobs", "Real Estate", "Services", "Notices"];

const CLASSIFIED_TAGS = ["Full-Time", "Part-Time", "Wanted", "Available", "Freelance", "Urgent"];

const TALUKAS = [
  "Veraval",
  "Somnath",
  "Talala",
  "Kodinar",
  "Una",
  "Sutrapada",
  "Gir Gadhada"
];

export default function PostClassifiedAdPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Jobs",
    tag: "Full-Time",
    compensation: "",
    location: "Veraval",
    poster: "",
    contact: "",
    whatsapp: "",
    description: "",
    requirements: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/classifieds");
    }, 1200);
  };

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/classifieds"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Classifieds
        </Link>
      </div>

      <PageHeader
        title="Post Classified Ad"
        description="Advertise jobs, rental property requests, or freelance services."
        icon={Megaphone}
      />

      {submitted ? (
        <Card className="p-6 border-border/80 bg-card text-center space-y-2 shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Classified Ad Published</h2>
          <p className="text-xs text-muted-foreground">
            Your advertisement is now live on Gir Somnath portal. Redirecting...
          </p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Megaphone className="size-3.5 text-primary" /> Ad Information
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Ad Title *</label>
              <Input
                required
                placeholder="e.g. Senior Accountant & Billing Officer Needed"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Category *</label>
                <Combobox
                  items={CLASSIFIED_CATEGORIES}
                  value={formData.category}
                  onValueChange={(val) => val && setFormData({ ...formData, category: val })}
                >
                  <ComboboxInput
                    placeholder="Select category"
                    className="h-9.5 text-xs bg-muted/30 border-border/70 rounded-xl"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No category found.</ComboboxEmpty>
                    <ComboboxList>
                      {CLASSIFIED_CATEGORIES.map((cat) => (
                        <ComboboxItem key={cat} value={cat}>
                          {cat}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Tag / Status *</label>
                <Combobox
                  items={CLASSIFIED_TAGS}
                  value={formData.tag}
                  onValueChange={(val) => val && setFormData({ ...formData, tag: val })}
                >
                  <ComboboxInput
                    placeholder="Select tag"
                    className="h-9.5 text-xs bg-muted/30 border-border/70 rounded-xl"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No tag found.</ComboboxEmpty>
                    <ComboboxList>
                      {CLASSIFIED_TAGS.map((t) => (
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
                <label className="text-xs font-semibold text-foreground">Salary / Budget *</label>
                <Input
                  required
                  placeholder="e.g. ₹ 25,000 / mo or ₹ 900 / hr"
                  value={formData.compensation}
                  onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Location (Taluka) *</label>
                <Combobox
                  items={TALUKAS}
                  value={formData.location}
                  onValueChange={(val) => val && setFormData({ ...formData, location: val })}
                >
                  <ComboboxInput
                    placeholder="Select taluka"
                    className="h-9.5 text-xs bg-muted/30 border-border/70 rounded-xl"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No taluka found.</ComboboxEmpty>
                    <ComboboxList>
                      {TALUKAS.map((taluka) => (
                        <ComboboxItem key={taluka} value={taluka}>
                          {taluka}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Briefcase className="size-3.5 text-primary" /> Advertiser & Contact
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Posted By (Name/Company) *</label>
              <Input
                required
                placeholder="e.g. Shree Somnath Seafoods"
                value={formData.poster}
                onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Contact Phone *</label>
                <Input
                  required
                  type="tel"
                  placeholder="e.g. +91 98251 11223"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">WhatsApp Number</label>
                <Input
                  type="tel"
                  placeholder="e.g. 919825111223"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Description & Criteria
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Job / Ad Description *</label>
              <Textarea
                required
                rows={3}
                placeholder="Responsibilities, property specifications, service scope, timing..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl text-xs bg-muted/30 border-border/70 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Requirements (Comma separated)
              </label>
              <Input
                placeholder="e.g. 3 Years Experience, Tally Prime, Immediate Joining"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 text-center">
              <UploadCloud className="mx-auto size-7 text-muted-foreground/80 mb-1" />
              <p className="text-xs font-semibold text-foreground">Upload Document or Poster</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Resume, flat photos or service poster</p>
            </div>
          </Card>

          <Button type="submit" size="default" className="w-full h-11 rounded-xl text-xs font-bold shadow-xs">
            Publish Classified Ad
          </Button>
        </form>
      )}
    </div>
  );
}
