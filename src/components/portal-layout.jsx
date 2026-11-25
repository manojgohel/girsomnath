import { Suspense } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./app-sidebar";
import { MobileHeader } from "./mobile-header";
import { MobileFooter } from "./mobile-footer";
import { ThemeProvider } from "./theme-provider";
import { TalukaProvider } from "./taluka-provider";

export function PortalLayout({ children }) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset className="h-dvh w-full bg-background flex flex-col items-center overflow-hidden sm:bg-zinc-100 dark:sm:bg-zinc-950">
            <div className="relative flex h-full w-full flex-col bg-background sm:max-w-md sm:border-x sm:border-border sm:shadow-lg overflow-hidden">
              <Suspense fallback={<div className="h-14 w-full border-b border-border/80 bg-background" />}>
                <TalukaProvider>
                  <MobileHeader />
                </TalukaProvider>
              </Suspense>
              <div className="flex-1 w-full overflow-y-auto overscroll-contain pb-4 pt-1">
                {children}
              </div>
              <MobileFooter />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
