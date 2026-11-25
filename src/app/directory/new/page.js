"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Phone,
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
import { TALUKAS as TALUKA_OPTIONS } from "@/lib/constants";

const CATEGORY_OPTIONS = [
  "CA",
  "Advocates",
  "Shops",
  "Medical Stores",
  "Hospitals",
  "Shopping Malls",
  "Govt Offices",
  "Garages",
  "Temples"
];

export default function AddContactPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Shops",
    town: "Veraval",
    phone: "",
    altPhone: "",
    whatsapp: "",
    email: "",
    timing: "",
    address: "",
    description: "",
    services: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/directory");
    }, 1200);
  };

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Directory
        </Link>
      </div>

      <PageHeader
        title="Add New Contact"
        description="List your business, profession or utility service in Gir Somnath."
        icon={Building2}
      />

      {submitted ? (
        <Card className="p-6 border-border/80 bg-card text-center space-y-2 shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Contact Submitted Successfully</h2>
          <p className="text-xs text-muted-foreground">
            Your listing has been submitted for district verification. Redirecting...
          </p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Building2 className="size-3.5 text-primary" /> Business / Professional Info
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Business / Entity Name *
              </label>
              <Input
                required
                placeholder="e.g. Somnath Agro Equipment & Spares"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Category *</label>
                <Combobox
                  items={CATEGORY_OPTIONS}
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
                      {CATEGORY_OPTIONS.map((cat) => (
                        <ComboboxItem key={cat} value={cat}>
                          {cat}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Taluka *</label>
                <Combobox
                  items={TALUKA_OPTIONS}
                  value={formData.town}
                  onValueChange={(val) => val && setFormData({ ...formData, town: val })}
                >
                  <ComboboxInput
                    placeholder="Select Taluka"
                    className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No taluka found.</ComboboxEmpty>
                    <ComboboxList>
                      {TALUKA_OPTIONS.map((taluka) => (
                        <ComboboxItem key={taluka} value={taluka}>
                          {taluka}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Operating Hours</label>
              <Input
                placeholder="e.g. 09:00 AM - 08:00 PM (Mon - Sat)"
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Phone className="size-3.5 text-primary" /> Communication & Contacts
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Primary Phone Number *</label>
              <Input
                required
                type="tel"
                placeholder="e.g. +91 98250 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Alternate Phone</label>
                <Input
                  type="tel"
                  placeholder="e.g. +91 2876 220140"
                  value={formData.altPhone}
                  onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">WhatsApp Number</label>
                <Input
                  type="tel"
                  placeholder="e.g. 919825012345"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Official Email</label>
              <Input
                type="email"
                placeholder="e.g. contact@business.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full Street Address *</label>
              <Input
                required
                placeholder="e.g. Harbor Road, Near APMC Market"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Details & Gallery
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Overview & Description</label>
              <Textarea
                rows={3}
                placeholder="Brief summary of products, services, specialization or facilities..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl text-xs bg-muted/30 border-border/70 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Services (Comma separated)
              </label>
              <Input
                placeholder="e.g. Wholesale Supply, 24x7 Emergency, Free Delivery"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 text-center">
              <UploadCloud className="mx-auto size-7 text-muted-foreground/80 mb-1" />
              <p className="text-xs font-semibold text-foreground">Upload Business Logo & Photos</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG or SVG up to 5MB</p>
            </div>
          </Card>

          <Button type="submit" size="default" className="w-full h-11 rounded-xl text-xs font-bold shadow-xs">
            Submit Contact Listing
          </Button>
        </form>
      )}
    </div>
  );
}
