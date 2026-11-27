import { Suspense } from "react";
import { redirect } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getCurrentUserAction } from "@/actions/auth-actions";

export const metadata = {
  title: "Gir Somnath - Admin Panel",
  description: "Administrative dashboard for Gir Somnath District Community Portal",
};

async function AdminGuard({ children }) {
  const user = await getCurrentUserAction();

  if (!user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (user.role !== "admin") {
    redirect("/unauthorized");
  }

  return children;
}

export default function AdminLayout({ children }) {
  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-xs text-muted-foreground">
              Verifying admin access...
            </div>
          }
        >
          <AdminGuard>{children}</AdminGuard>
        </Suspense>
      </div>
    </TooltipProvider>
  );
}
