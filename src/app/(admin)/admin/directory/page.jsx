"use client";

import { Suspense, useState, useEffect, useCallback, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  AlertCircle,
  Building2,
  Phone,
  Eye,
  Check,
  X,
  Link2,
} from "lucide-react";
import { AdminAppSidebar } from "@/components/admin-app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  TALUKAS as TALUKA_OPTIONS,
  DIRECTORY_CATEGORY_OPTIONS as CATEGORIES,
  STATUS_FILTERS,
} from "@/lib/constants";
import { OperatingHoursInput } from "@/components/operating-hours-input";
import {
  getAllDirectoryAdminAction,
  updateDirectoryStatusAction,
  updateDirectoryItemAction,
  createDirectoryAction,
  deleteDirectoryAction,
  resolveSlugForNameAction,
  checkSlugAvailabilityAction,
} from "@/actions/directory-actions";

function AdminDirectoryContent() {
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [taluka, setTaluka] = useState("All");
  const [status, setStatus] = useState("All");
  const [isPending, startTransition] = useTransition();

  const [editItem, setEditItem] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [checkingSlug, setCheckingSlug] = useState(false);

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
    status: "approved",
  });

  const loadData = useCallback(() => {
    startTransition(async () => {
      const res = await getAllDirectoryAdminAction({
        page,
        limit: 10,
        search,
        category,
        taluka,
        status,
      });
      setData(res);
    });
  }, [page, search, category, taluka, status]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleQuickStatus = async (id, newStatus) => {
    setActionLoading(true);
    await updateDirectoryStatusAction(id, newStatus);
    setActionLoading(false);
    loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this directory listing?")) return;
    setActionLoading(true);
    await deleteDirectoryAction(id);
    setActionLoading(false);
    loadData();
  };

  const handleOpenEdit = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name || "",
      slug: item.slug || "",
      category: item.category || "Shops",
      taluka: item.taluka || "Veraval",
      town: item.town || item.taluka || "Veraval",
      phone: item.phone || "",
      altPhone: item.altPhone || "",
      whatsapp: item.whatsapp || "",
      email: item.email || "",
      timing: item.timing || "09:00 AM - 08:00 PM",
      address: item.address || "",
      description: item.description || "",
      services: Array.isArray(item.services) ? item.services.join(", ") : "",
      status: item.status || "approved",
    });
  };

  const handleOpenCreate = () => {
    setEditItem(null);
    setFormData({
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
      status: "approved",
    });
    setIsCreateOpen(true);
  };

  const handleNameBlur = async () => {
    if (!formData.name.trim() || formData.slug) return;
    setCheckingSlug(true);
    const res = await resolveSlugForNameAction(formData.name, editItem?.id);
    setFormData((prev) => ({ ...prev, slug: res.slug }));
    setCheckingSlug(false);
  };

  const handleSlugBlur = async () => {
    if (!formData.slug.trim()) return;
    setCheckingSlug(true);
    const res = await checkSlugAvailabilityAction(formData.slug, editItem?.id);
    if (!res.available) {
      setFormData((prev) => ({ ...prev, slug: res.suggestedSlug }));
    }
    setCheckingSlug(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    if (editItem) {
      await updateDirectoryItemAction(editItem.id, {
        ...formData,
        services: formData.services.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setEditItem(null);
    } else {
      await createDirectoryAction(
        {
          ...formData,
          services: formData.services.split(",").map((s) => s.trim()).filter(Boolean),
        },
        { fromAdmin: true }
      );
      setIsCreateOpen(false);
    }

    setActionLoading(false);
    loadData();
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminAppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-vertical:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">Gir Somnath District</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Directory Management</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <Button
            size="sm"
            onClick={handleOpenCreate}
            className="h-8.5 rounded-xl px-3 text-xs font-semibold gap-1.5 bg-primary text-primary-foreground shadow-xs"
          >
            <Plus className="size-3.5" /> Add Listing
          </Button>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-2xs">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="Search by name, slug, phone, town..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="h-9.5 pl-9 rounded-xl text-xs bg-muted/40"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                  className="h-9.5 rounded-xl border border-input bg-card px-3 text-xs font-medium text-foreground outline-hidden focus:ring-2 focus:ring-ring"
                >
                  {STATUS_FILTERS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>

                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="h-9.5 rounded-xl border border-input bg-card px-3 text-xs font-medium text-foreground outline-hidden focus:ring-2 focus:ring-ring"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((cat) => {
                    const id = typeof cat === "object" ? cat.id : cat;
                    const name = typeof cat === "object" ? cat.name : cat;
                    if (id === "all" || name === "All") return null;
                    return (
                      <option key={id} value={name}>
                        {name}
                      </option>
                    );
                  })}
                </select>

                <select
                  value={taluka}
                  onChange={(e) => {
                    setTaluka(e.target.value);
                    setPage(1);
                  }}
                  className="h-9.5 rounded-xl border border-input bg-card px-3 text-xs font-medium text-foreground outline-hidden focus:ring-2 focus:ring-ring"
                >
                  <option value="All">All Talukas</option>
                  {TALUKA_OPTIONS.map((tal) => (
                    <option key={tal.id} value={tal.name}>
                      {tal.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t">
              <span className="flex items-center gap-2">
                Found {data.total} listings
                {isPending && <Loader2 className="size-3 animate-spin text-primary" />}
              </span>

              {(search || category !== "All" || taluka !== "All" || status !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setTaluka("All");
                    setStatus("All");
                    setPage(1);
                  }}
                  className="text-primary font-medium hover:underline text-xs"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-card shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 border-b text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Listing Details</th>
                    <th className="px-4 py-3">URL Slug</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Taluka & Town</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.items.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                        {isPending ? "Loading directory..." : "No directory listings found"}
                      </td>
                    </tr>
                  ) : (
                    data.items.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative size-10 shrink-0 overflow-hidden rounded-xl border bg-muted/30">
                              <Image
                                src={item.image || "/images/directory/shops.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-foreground text-sm truncate">
                                  {item.name}
                                </span>
                                {item.verified && (
                                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                )}
                              </div>
                              <span className="text-[11px] text-muted-foreground line-clamp-1">
                                {item.address}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <Link
                            href={`/directory/${item.slug || item.id}`}
                            target="_blank"
                            className="font-mono text-[11px] text-primary hover:underline flex items-center gap-1"
                          >
                            <Link2 className="size-3" />
                            <span className="truncate max-w-[120px]">{item.slug || item.id}</span>
                          </Link>
                        </td>

                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-[10px] font-medium">
                            {item.category}
                          </Badge>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{item.taluka}</span>
                            <span className="text-[11px] text-muted-foreground">{item.town}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <a
                              href={`tel:${item.phone}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {item.phone}
                            </a>
                            {item.email && (
                              <span className="text-[11px] text-muted-foreground truncate max-w-[120px]">
                                {item.email}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          {item.status === "approved" ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px]">
                              Approved
                            </Badge>
                          ) : item.status === "rejected" ? (
                            <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[10px]">
                              Rejected
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px]">
                              Pending
                            </Badge>
                          )}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {item.status !== "approved" && (
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                title="Approve Listing"
                                onClick={() => handleQuickStatus(item.id, "approved")}
                                disabled={actionLoading}
                                className="size-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg"
                              >
                                <Check className="size-4" />
                              </Button>
                            )}

                            {item.status !== "rejected" && (
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                title="Reject Listing"
                                onClick={() => handleQuickStatus(item.id, "rejected")}
                                disabled={actionLoading}
                                className="size-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                              >
                                <X className="size-4" />
                              </Button>
                            )}

                            <Button
                              size="icon-sm"
                              variant="ghost"
                              title="Edit Listing"
                              onClick={() => handleOpenEdit(item)}
                              className="size-8 rounded-lg"
                            >
                              <Pencil className="size-3.5" />
                            </Button>

                            <Button
                              size="icon-sm"
                              variant="ghost"
                              title="Delete Listing"
                              onClick={() => handleDelete(item.id)}
                              disabled={actionLoading}
                              className="size-8 text-destructive hover:bg-destructive/10 rounded-lg"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {data.totalPages > 1 && (
              <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground">
                <span>
                  Showing Page {data.page} of {data.totalPages} ({data.total} total)
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1 || isPending}
                    className="h-8 rounded-xl px-2.5 text-xs gap-1"
                  >
                    <ChevronLeft className="size-3.5" /> Previous
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                    disabled={page >= data.totalPages || isPending}
                    className="h-8 rounded-xl px-2.5 text-xs gap-1"
                  >
                    Next <ChevronRight className="size-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Sheet
          open={isCreateOpen || !!editItem}
          onOpenChange={(open) => {
            if (!open) {
              setIsCreateOpen(false);
              setEditItem(null);
            }
          }}
        >
          <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {editItem ? "Edit Directory Listing" : "Add New Directory Listing"}
              </SheetTitle>
              <SheetDescription>
                {editItem
                  ? "Update details, URL slug and status for this district directory item."
                  : "Create and publish a verified merchant, hospital, or service contact."}
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSave} className="space-y-4 px-6 py-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Entity Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onBlur={handleNameBlur}
                  placeholder="e.g. Veraval Agro Machinery"
                  className="h-9 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                    <Link2 className="size-3 text-primary" /> URL Slug *
                  </label>
                  {checkingSlug && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Loader2 className="size-2.5 animate-spin" /> Checking...
                    </span>
                  )}
                </div>
                <div className="flex items-center rounded-xl bg-muted/40 border border-input px-3 text-xs text-muted-foreground focus-within:ring-2 focus-within:ring-ring">
                  <span className="select-none text-[11px]">/directory/</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      })
                    }
                    onBlur={handleSlugBlur}
                    placeholder="veraval-agro-machinery"
                    className="h-9 w-full bg-transparent text-xs text-foreground outline-hidden pl-1 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="h-9 w-full rounded-xl border border-input bg-card px-3 text-xs"
                  >
                    {CATEGORIES.map((c) => {
                      const id = typeof c === "object" ? c.id : c;
                      const name = typeof c === "object" ? c.name : c;
                      if (id === "all" || name === "All") return null;
                      return (
                        <option key={id} value={name}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Taluka *</label>
                  <select
                    value={formData.taluka}
                    onChange={(e) =>
                      setFormData({ ...formData, taluka: e.target.value, town: e.target.value })
                    }
                    className="h-9 w-full rounded-xl border border-input bg-card px-3 text-xs"
                  >
                    {TALUKA_OPTIONS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Phone *</label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98250 12345"
                    className="h-9 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="h-9 w-full rounded-xl border border-input bg-card px-3 text-xs"
                  >
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">WhatsApp</label>
                  <Input
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="919825012345"
                    className="h-9 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@business.com"
                    className="h-9 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Operating Hours</label>
                <OperatingHoursInput
                  value={formData.timing}
                  onChange={(val) => setFormData({ ...formData, timing: val })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Street Address *</label>
                <Input
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Station Road, Near Bus Stand"
                  className="h-9 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Description</label>
                <Textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of entity services..."
                  className="rounded-xl text-xs resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Services (comma separated)
                </label>
                <Input
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                  placeholder="Sales, Repairs, Delivery"
                  className="h-9 rounded-xl text-xs"
                />
              </div>

              <SheetFooter className="px-0 pt-4">
                <Button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full h-10 rounded-xl text-xs font-bold gap-1.5"
                >
                  {actionLoading && <Loader2 className="size-4 animate-spin" />}
                  {editItem ? "Save Changes" : "Create Listing"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AdminDirectoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-xs text-muted-foreground">
          Loading directory...
        </div>
      }
    >
      <AdminDirectoryContent />
    </Suspense>
  );
}
