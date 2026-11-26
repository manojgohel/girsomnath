"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Calendar,
  ShoppingBag,
  Megaphone,
  Command
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

export function AdminAppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b p-2 group-data-[collapsible=icon]:p-2">
        <Logo showIcon href="/admin" tagline="Admin Control Panel" collapsed />
      </SidebarHeader>
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
