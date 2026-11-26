import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  title: "Gir Somnath - Admin Panel",
  description: "Administrative dashboard for Gir Somnath District Community Portal",
};

export default function AdminLayout({ children }) {
  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        {children}
      </div>
    </TooltipProvider>
  );
}
