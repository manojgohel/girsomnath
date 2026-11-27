import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-8">
      <Card className="w-full max-w-sm border-border/80 bg-card p-6 shadow-sm rounded-2xl text-center space-y-4">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <ShieldAlert className="size-6" />
        </div>
        <div>
          <h1 className="text-base font-bold text-foreground">Access Restricted</h1>
          <p className="text-xs text-muted-foreground mt-1">
            This section is reserved for verified administrators of Gir Somnath District Portal.
          </p>
        </div>
        <div className="pt-2 flex flex-col gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/login?callbackUrl=/admin" />}
            size="default"
            className="w-full h-10 rounded-xl text-xs font-bold"
          >
            Sign In with Admin Account
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/" />}
            variant="outline"
            size="default"
            className="w-full h-10 rounded-xl text-xs font-semibold"
          >
            <ArrowLeft className="size-3.5 mr-1" /> Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
