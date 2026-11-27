"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Calendar,
  ShoppingBag,
  Megaphone,
  Command,
} from "lucide-react";

import { NavAdminMenu } from "@/components/nav-admin-menu";
import { NavUser } from "@/components/nav-user";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "District Admin",
    email: "admin@girsomnath.in",
    avatar: "/icons/icon-192x192.png",
  },
  teams: [
    {
      name: "Gir Somnath District",
      logo: Command,
      plan: "Collectorate Portal",
    },
  ],
  navItems: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Directory",
      url: "/admin/directory",
      icon: PhoneCall,
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: Calendar,
    },
    {
      title: "Marketplace",
      url: "/admin/marketplace",
      icon: ShoppingBag,
    },
    {
      title: "Classified Ads",
      url: "/admin/classifieds",
      icon: Megaphone,
    },
  ],
};

function AdminHeaderContent() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarHeader className="border-b p-2 overflow-hidden flex justify-center">
      {isCollapsed ? (
        <div className="flex h-9 w-full items-center justify-center">
          <Link
            href="/admin"
            className="relative size-8 shrink-0 overflow-hidden rounded-xl border border-amber-600/30 bg-background shadow-xs hover:opacity-90"
            title="Gir Somnath Admin"
          >
            <Image
              src="/icons/icon-192x192.png"
              alt="Gir Somnath Lion Emblem"
              fill
              className="object-cover"
              sizes="32px"
            />
          </Link>
        </div>
      ) : (
        <div className="w-full overflow-hidden">
          <Logo showIcon href="/admin" tagline="Admin Control Panel" />
        </div>
      )}
    </SidebarHeader>
  );
}

export function AdminAppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <AdminHeaderContent />
      <SidebarContent>
        <NavAdminMenu items={data.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
