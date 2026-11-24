import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./app-sidebar";
import { MobileHeader } from "./mobile-header";
import { MobileFooter } from "./mobile-footer";
import { ThemeProvider } from "./theme-provider";

export function PortalLayout({ children }) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />
          <SidebarInset className="min-h-screen w-full bg-background flex flex-col items-center overflow-x-hidden sm:bg-zinc-100 dark:sm:bg-zinc-950">
            <div className="relative flex min-h-screen w-full flex-col bg-background sm:max-w-md sm:border-x sm:border-border sm:shadow-lg">
              <MobileHeader />
              <main className="flex-1 w-full pb-4 pt-1">
                {children}
              </main>
              <MobileFooter />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
