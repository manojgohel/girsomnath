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
          <SidebarInset className="min-h-screen bg-zinc-100 flex flex-col items-center dark:bg-zinc-950">
            <div className="relative flex min-h-screen w-full max-w-md flex-col bg-background shadow-xl ring-1 ring-border/50">
              <MobileHeader />
              <main className="flex-1 pb-20 pt-1">
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
