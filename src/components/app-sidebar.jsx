"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  MapPin,
  Calendar,
  ShoppingBag,
  Megaphone,
  PhoneCall,
  ShieldAlert,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";

const MAIN_NAV = [
  { title: "Home", url: "/", icon: Compass },
  { title: "Contact Directory", url: "/directory", icon: PhoneCall },
  { title: "Events & Festivals", url: "/events", icon: Calendar },
  { title: "Market (Buy/Sell/Rent)", url: "/market", icon: ShoppingBag },
  { title: "Classified Ads", url: "/classifieds", icon: Megaphone },
];

import { TALUKAS } from "@/lib/constants";

const TOWNS = TALUKAS.map((name) => ({ name }));

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <Logo showIcon size="default" />
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAIN_NAV.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<Link href={item.url} />} className="h-9 font-medium">
                    <item.icon className="size-4 text-primary" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Districts & Talukas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {TOWNS.map((town) => (
                <SidebarMenuItem key={town.name}>
                  <SidebarMenuButton
                    render={<Link href={`/directory?taluka=${encodeURIComponent(town.name)}`} />}
                    className="h-8 text-xs justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-muted-foreground" />
                      <span>{town.name}</span>
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {town.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Safety & Utilities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href="/directory" />}
                  className="h-8 text-xs text-red-600 dark:text-red-400 justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="size-3.5" />
                    <span>Emergency Helplines</span>
                  </span>
                  <Badge variant="destructive" className="px-1 text-[9px]">
                    24x7
                  </Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-xs font-semibold text-foreground">Guest User</p>
            <p className="truncate text-[10px] text-muted-foreground">Sign in for local listings</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
