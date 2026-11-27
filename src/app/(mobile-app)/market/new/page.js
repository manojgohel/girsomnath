"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Coins,
  Tag,
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
import { TALUKAS, MARKET_TYPES, MARKET_CATEGORIES } from "@/lib/constants";

export default function PostMarketItemPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "Rent",
    category: "Agro Machinery",
    price: "",
    location: "Kodinar",
    seller: "",
    phone: "",
    whatsapp: "",
    description: "",
    features: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/market");
    }, 1200);
  };

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2">
      <div className="flex items-center justify-between">
        <Link
          href="/market"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Market
        </Link>
      </div>

      <PageHeader
        title="Post Item for Sale or Rent"
        description="List equipment, land, properties, boats or machinery in Gir Somnath."
        icon={ShoppingBag}
      />

      {submitted ? (
        <Card className="p-6 border-border/80 bg-card text-center space-y-2 shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="size-6" />
          </div>
          <h2 className="text-sm font-bold text-foreground">Market Listing Published</h2>
          <p className="text-xs text-muted-foreground">
            Your item has been submitted to the marketplace. Redirecting...
          </p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Tag className="size-3.5 text-primary" /> Listing Overview
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Item / Property Title *</label>
              <Input
                required
                placeholder="e.g. John Deere Tractor 5050D with Rotavator"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Listing Type *</label>
                <Combobox
                  items={MARKET_TYPES}
                  value={formData.type}
                  onValueChange={(val) => val && setFormData({ ...formData, type: val })}
                >
                  <ComboboxInput
                    placeholder="Select Type"
                    className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No type found.</ComboboxEmpty>
                    <ComboboxList>
                      {MARKET_TYPES.map((t) => (
                        <ComboboxItem key={t} value={t}>
                          For {t}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Category *</label>
                <Combobox
                  items={MARKET_CATEGORIES}
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
                      {MARKET_CATEGORIES.map((c) => (
                        <ComboboxItem key={c} value={c}>
                          {c}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Price / Rent *</label>
                <Input
                  required
                  placeholder="e.g. ₹ 1,400 / day or ₹ 25 Lakh"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Location (Taluka) *</label>
                <Combobox
                  items={TALUKAS.map((t) => t.name)}
                  value={formData.location}
                  onValueChange={(val) => val && setFormData({ ...formData, location: val })}
                >
                  <ComboboxInput
                    placeholder="Select Taluka"
                    className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No taluka found.</ComboboxEmpty>
                    <ComboboxList>
                      {TALUKAS.map((taluka) => (
                        <ComboboxItem key={taluka.id} value={taluka.name}>
                          {taluka.name}
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
              <Coins className="size-3.5 text-primary" /> Seller & Contact Information
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Seller / Owner Name *</label>
              <Input
                required
                placeholder="e.g. Patel Agro Equipment"
                value={formData.seller}
                onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Phone Number *</label>
                <Input
                  required
                  type="tel"
                  placeholder="e.g. +91 98790 11223"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">WhatsApp Number</label>
                <Input
                  type="tel"
                  placeholder="e.g. 919879011223"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
                />
              </div>
            </div>
          </Card>

          <Card className="p-4 border-border/80 bg-card shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" /> Specifications & Photos
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Detailed Description *</label>
              <Textarea
                required
                rows={3}
                placeholder="Condition, model year, horsepower, paperwork, land revenue titles..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="rounded-xl text-xs bg-muted/30 border-border/70 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Features & Specs (Comma separated)
              </label>
              <Input
                placeholder="e.g. 50 HP Engine, 42 Blades, Clear 7/12 Records"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="h-9.5 rounded-xl text-xs bg-muted/30 border-border/70"
              />
            </div>

            <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-4 text-center">
              <UploadCloud className="mx-auto size-7 text-muted-foreground/80 mb-1" />
              <p className="text-xs font-semibold text-foreground">Upload Item Photos & Views</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Clear photos from front and sides</p>
            </div>
          </Card>

          <Button type="submit" size="default" className="w-full h-11 rounded-xl text-xs font-bold shadow-xs">
            Publish Marketplace Item
          </Button>
        </form>
      )}
    </div>
  );
}
