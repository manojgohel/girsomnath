"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  LogOut,
  ArrowLeft,
  LayoutDashboard,
  CheckCircle2,
  Calendar,
  BookmarkCheck,
  Megaphone,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Store,
  Compass,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCurrentUserAction, logoutAction } from "@/actions/auth-actions";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUserAction();
      if (!currentUser) {
        router.push("/login?callbackUrl=/profile");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    }
    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-sm h-72 rounded-2xl bg-muted/30 animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="flex flex-col space-y-3.5 px-3.5 py-2.5">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
        <span className="text-[10.5px] font-semibold text-muted-foreground">Citizen Account</span>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-amber-600/30 bg-linear-to-b from-amber-500/15 via-orange-500/10 to-card p-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-500/50 bg-background shadow-sm">
            <Image
              src="/icons/icon-192x192.png"
              alt="User Avatar"
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="text-base font-bold text-foreground truncate">
                {user.name || "District Citizen"}
              </h1>
              <Badge
                variant={isAdmin ? "default" : "secondary"}
                className={`text-[9.5px] px-1.5 py-0 font-bold uppercase ${
                  isAdmin
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {isAdmin ? "Admin" : "Verified Citizen"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 font-mono">
              <Phone className="size-3 text-primary" /> +91 {user.phone}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-border/60 text-xs">
          <div className="rounded-xl border border-border/70 bg-background/80 p-2.5">
            <p className="text-[10px] text-muted-foreground font-medium">District Taluka</p>
            <p className="text-xs font-bold text-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="size-3 text-amber-600" /> Gir Somnath
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-background/80 p-2.5">
            <p className="text-[10px] text-muted-foreground font-medium">Security Status</p>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="size-3" /> OTP Verified
            </p>
          </div>
        </div>
      </div>

      {isAdmin && (
        <Card className="p-3.5 border-amber-500/40 bg-amber-500/10 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <LayoutDashboard className="size-3.5 text-amber-600" /> Administrator Controls
            </span>
            <Badge className="bg-amber-600 text-white text-[9px] px-1.5 py-0 font-bold">
              Access Granted
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Manage district listings, moderate user postings, approve events, and oversee classifieds.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/admin" />}
            size="default"
            className="w-full h-10 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
          >
            <LayoutDashboard className="size-4 mr-1.5" /> Launch Admin Dashboard
          </Button>
        </Card>
      )}

      <div className="space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          Citizen Services
        </span>

        <Card className="p-2 border-border/80 bg-card shadow-xs divide-y divide-border/60">
          <Link
            href="/classifieds/new"
            className="flex items-center justify-between p-2.5 hover:bg-muted/40 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Megaphone className="size-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Post Classified Ad</p>
                <p className="text-[10px] text-muted-foreground">Jobs, property lease, vehicles</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>

          <Link
            href="/directory/new"
            className="flex items-center justify-between p-2.5 hover:bg-muted/40 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Store className="size-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Add Business / Service</p>
                <p className="text-[10px] text-muted-foreground">List shop, medical store, office</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>

          <Link
            href="/events/new"
            className="flex items-center justify-between p-2.5 hover:bg-muted/40 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Calendar className="size-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Submit Community Event</p>
                <p className="text-[10px] text-muted-foreground">Fairs, aarti, mandal announcements</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>

          <Link
            href="/sights"
            className="flex items-center justify-between p-2.5 hover:bg-muted/40 transition-colors rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Compass className="size-4.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Top Sights & Guide</p>
                <p className="text-[10px] text-muted-foreground">Temples, Gir Lion Safari, beaches</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </Link>
        </Card>
      </div>

      <div className="pt-1">
        <Button
          variant="outline"
          size="default"
          onClick={handleLogout}
          className="w-full h-10 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10 border-destructive/30"
        >
          <LogOut className="size-3.5 mr-1.5" /> Sign Out
        </Button>
      </div>
    </div>
  );
}
