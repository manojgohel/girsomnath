"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { getCurrentUserAction } from "@/actions/auth-actions";

export function MobileHeader() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { selectedTaluka, isPickerOpen, setIsPickerOpen, selectTaluka } = useTaluka();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUserAction();
      setCurrentUser(user);
    }
    checkAuth();
  }, []);

  const isFiltered = selectedTaluka && selectedTaluka !== "All Talukas";

  const handleProfileClick = () => {
    if (currentUser) {
      router.push("/profile");
    } else {
      router.push("/login?callbackUrl=/profile");
    }
  };

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

            <button
              type="button"
              onClick={handleProfileClick}
              aria-label="User profile"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-muted outline-none transition-colors"
            >
              <Avatar className="size-7">
                <AvatarFallback
                  className={`text-xs font-semibold ${
                    currentUser
                      ? "bg-primary text-primary-foreground font-bold"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  <User className="size-3.5" />
                </AvatarFallback>
              </Avatar>
            </button>
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
              const active = selectedTaluka === taluka.name || selectedTaluka === taluka.id;
              return (
                <Button
                  key={taluka.id}
                  type="button"
                  variant={active ? "default" : "outline"}
                  onClick={() => selectTaluka(taluka.name)}
                  className={`h-10 justify-between rounded-xl px-3 text-xs font-medium ${active
                      ? "shadow-xs"
                      : "border-border/80 bg-background hover:bg-muted"
                    }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className={`size-3.5 shrink-0 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    <span className="truncate">{taluka.name}</span>
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
