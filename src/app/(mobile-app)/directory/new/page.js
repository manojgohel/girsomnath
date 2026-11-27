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
  UploadCloud,
  Loader2,
  AlertCircle,
  Link2,
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
  ComboboxEmpty,
} from "@/components/ui/combobox";
import { TALUKAS as TALUKA_OPTIONS } from "@/lib/constants";
import { OperatingHoursInput } from "@/components/operating-hours-input";
import {
  createDirectoryAction,
  resolveSlugForNameAction,
  checkSlugAvailabilityAction,
} from "@/actions/directory-actions";

const CATEGORY_OPTIONS = [
  "CA",
  "Advocates",
  "Shops",
  "Medical Stores",
  "Hospitals",
  "Shopping Malls",
  "Govt Offices",
  "Garages",
  "Temples",
];

export default function AddContactPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [resultStatus, setResultStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Shops",
    taluka: "Veraval",
    town: "Veraval",
    phone: "",
    altPhone: "",
    whatsapp: "",
    email: "",
    timing: "09:00 AM - 08:00 PM",
    address: "",
    description: "",
    services: "",
  });

  const handleNameBlur = async () => {
    if (!formData.name.trim() || formData.slug) return;
    setCheckingSlug(true);
    const res = await resolveSlugForNameAction(formData.name);
    setFormData((prev) => ({ ...prev, slug: res.slug }));
    setSlugStatus(res.isUnique ? "available" : "assigned-nanoid");
    setCheckingSlug(false);
  };

  const handleSlugBlur = async () => {
    if (!formData.slug.trim()) return;
    setCheckingSlug(true);
    const res = await checkSlugAvailabilityAction(formData.slug);
    if (res.available) {
      setSlugStatus("available");
    } else {
      setFormData((prev) => ({ ...prev, slug: res.suggestedSlug }));
      setSlugStatus("assigned-nanoid");
    }
    setCheckingSlug(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const res = await createDirectoryAction(
        {
          ...formData,
          taluka: formData.taluka || formData.town || "Veraval",
          town: formData.town || formData.taluka || "Veraval",
        },
        { fromAdmin: false }
      );

      if (res.success) {
        setResultStatus("pending");
        setTimeout(() => {
          router.push("/directory");
        }, 1800);
      } else {
        setErrorMessage(res.error || "Failed to submit listing");
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
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

      {resultStatus ? (
        <Card className="p-6 border-border/80 bg-card text-center space-y-2.5 shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-sm font-bold text-foreground">
            Contact Submitted for Admin Approval
          </h2>
          <p className="text-xs text-muted-foreground">
            Your listing has been submitted for verification. It will appear on the public directory once reviewed and approved by the admin panel.
          </p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {errorMessage && (
            <div className="flex items-center gap-2 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-xs text-destructive">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

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
                onBlur={handleNameBlur}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                  <Link2 className="size-3 text-primary" /> URL Slug
                </label>
                {checkingSlug ? (
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Loader2 className="size-2.5 animate-spin" /> Checking availability...
                  </span>
                ) : slugStatus === "available" ? (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Available
                  </span>
                ) : slugStatus === "assigned-nanoid" ? (
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                    ✓ Made unique with ID
                  </span>
                ) : null}
              </div>

              <div className="flex items-center rounded-xl bg-muted/30 border border-border/70 px-3 text-xs text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20">
                <span className="shrink-0 select-none text-[11px]">/directory/</span>
                <input
                  type="text"
                  placeholder="somnath-agro-equipment"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                    })
                  }
                  onBlur={handleSlugBlur}
                  className="h-9.5 w-full bg-transparent text-xs text-foreground outline-hidden pl-1"
                />
              </div>
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
                  value={formData.taluka}
                  onValueChange={(val) =>
                    val && setFormData({ ...formData, taluka: val, town: val })
                  }
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
              <OperatingHoursInput
                value={formData.timing}
                onChange={(val) => setFormData({ ...formData, timing: val })}
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
              <p className="text-xs font-semibold text-foreground">Standard Listing Icon</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Assigned automatically based on selected category
              </p>
            </div>
          </Card>

          <Button
            type="submit"
            disabled={submitting}
            size="default"
            className="w-full h-11 rounded-xl text-xs font-bold shadow-xs gap-1.5"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {submitting ? "Submitting for Approval..." : "Submit Contact for Approval"}
          </Button>
        </form>
      )}
    </div>
  );
}
