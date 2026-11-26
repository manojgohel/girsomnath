"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function NavAdminMenu({ items }) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
        Management
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={isActive}
                render={<Link href={item.url} />}
                className="h-9 font-medium"
              >
                {Icon && <Icon className="size-4" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
