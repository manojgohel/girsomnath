"use client";

import Link from "next/link";
import {
  Sun,
  Moon,
  User,
  Settings,
  BookmarkCheck,
  LogIn,
  PlusCircle,
  MapPin,
  Check
} from "lucide-react";
import { useTheme } from "./theme-provider";
import { useTaluka, TALUKAS_LIST } from "./taluka-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function MobileHeader() {
  const { theme, toggleTheme } = useTheme();
  const { selectedTaluka, isPickerOpen, setIsPickerOpen, selectTaluka } = useTaluka();

  const isFiltered = selectedTaluka && selectedTaluka !== "All Talukas";

  return (
    <>
      <header className="sticky top-0 z-40 w-full shrink-0 border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-14 w-full items-center justify-between px-3">
          <div className="flex items-center gap-2 min-w-0">
            <SidebarTrigger />
            <Logo />
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPickerOpen(true)}
              aria-label="Select Taluka"
              className={`h-8 gap-1 rounded-full px-2.5 text-xs font-medium transition-all ${isFiltered
                  ? "border-primary bg-primary/10 text-primary hover:bg-primary/20"
                  : "border-border/80 bg-muted/40 text-foreground hover:bg-muted"
                }`}
            >
              <MapPin className={`size-3.5 shrink-0 ${isFiltered ? "text-primary" : "text-muted-foreground"}`} />
              <span className="max-w-[70px] truncate text-[11px]">
                {selectedTaluka}
              </span>
            </Button>

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
              <DropdownMenuTrigger
                aria-label="User profile menu"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-muted outline-none transition-colors"
              >
                <Avatar className="size-7">
                  <AvatarFallback className="bg-secondary text-foreground text-xs font-semibold">
                    <User className="size-3.5" />
                  </AvatarFallback>
                </Avatar>
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

      <Sheet open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl p-4 sm:max-w-md mx-auto">
          <SheetHeader className="p-0 pb-3">
            <SheetTitle className="text-sm font-bold flex items-center gap-1.5">
              <MapPin className="size-4 text-primary" /> Select Taluka
            </SheetTitle>
            <SheetDescription className="text-xs">
              Choose a taluka to filter directory, services, and district updates.
            </SheetDescription>
          </SheetHeader>

          <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
            {TALUKAS_LIST.map((taluka) => {
              const active = selectedTaluka === taluka;
              return (
                <Button
                  key={taluka}
                  type="button"
                  variant={active ? "default" : "outline"}
                  onClick={() => selectTaluka(taluka)}
                  className={`h-10 justify-between rounded-xl px-3 text-xs font-medium ${active
                      ? "shadow-xs"
                      : "border-border/80 bg-background hover:bg-muted"
                    }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className={`size-3.5 shrink-0 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    <span className="truncate">{taluka}</span>
                  </span>
                  {active && <Check className="size-3.5 shrink-0" />}
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
