"use client";

import Link from "next/link";
import { Sun, Moon, User, Settings, BookmarkCheck, LogIn, PlusCircle } from "lucide-react";
import { useTheme } from "./theme-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-3">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Link href="/" className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-heading text-base font-bold tracking-tight text-foreground">
                Gir Somnath
              </span>
              <Badge variant="default" className="px-1.5 py-0 text-[10px] font-bold">
                .in
              </Badge>
            </div>
            <span className="text-[10px] leading-none text-muted-foreground">
              District Portal
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="size-8 rounded-lg"
          >
            {theme === "dark" ? (
              <Sun className="size-4 text-amber-400" />
            ) : (
              <Moon className="size-4 text-slate-700" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="User profile menu"
                className="size-8 rounded-full"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                    <User className="size-3.5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">
                <LogIn className="mr-2 size-3.5" /> Sign In / Register
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs">
                <PlusCircle className="mr-2 size-3.5" /> Post Classified Ad
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs">
                <BookmarkCheck className="mr-2 size-3.5" /> Saved Items
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs">
                <Settings className="mr-2 size-3.5" /> Preferences
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
