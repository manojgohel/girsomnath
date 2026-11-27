import { Suspense } from "react";
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
import { DIRECTORY_DATA } from "@/lib/directory-data";
import { EVENTS_DATA } from "@/lib/events-data";
import { MARKET_DATA } from "@/lib/market-data";
import { ADS_DATA } from "@/lib/classifieds-data";
import { SIGHTS_DATA } from "@/lib/sights-data";

function AdminPageContent() {
  const stats = [
    { title: "Directory Listings", value: DIRECTORY_DATA.length, change: "Active merchants & services" },
    { title: "Upcoming Events", value: EVENTS_DATA.length, change: "District festivals & expos" },
    { title: "Marketplace Items", value: MARKET_DATA.length, change: "Tractors, gear & rentals" },
    { title: "Classified Ads", value: ADS_DATA.length, change: "Rojgar, jobs & properties" },
    { title: "Top Sights", value: SIGHTS_DATA.length, change: "Pilgrimage & tourist spots" },
    { title: "Talukas Covered", value: 6, change: "Veraval, Talala, Kodinar..." },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminAppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin">
                    Gir Somnath District
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.title} className="rounded-xl border bg-card p-4 shadow-xs">
                <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                <div className="text-2xl font-bold mt-1 text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {stats.slice(3, 6).map((stat) => (
              <div key={stat.title} className="rounded-xl border bg-card p-4 shadow-xs">
                <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                <div className="text-2xl font-bold mt-1 text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.change}</div>
              </div>
            ))}
          </div>

          <div className="min-h-[50vh] flex-1 rounded-xl border bg-card p-4 shadow-xs">
            <h2 className="text-sm font-bold text-foreground mb-2">Recent System & Moderation Log</h2>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• District Portal PWA operational and caching active.</p>
              <p>• Automatic Taluka switcher set to standard 6 talukas with Veraval (HQ).</p>
              <p>• Clean separation between Mobile App shell and Admin Panel.</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-xs text-muted-foreground">
          Loading dashboard...
        </div>
      }
    >
      <AdminPageContent />
    </Suspense>
  );
}
