"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import Image from "next/image";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function subscribeStandalone(callback) {
  const mql = window.matchMedia("(display-mode: standalone)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getStandaloneSnapshot() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function getStandaloneServerSnapshot() {
  return true;
}

export function PwaInstallBanner() {
  const isStandalone = useSyncExternalStore(
    subscribeStandalone,
    getStandaloneSnapshot,
    getStandaloneServerSnapshot
  );

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installedManually, setInstalledManually] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstalledManually(true);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setInstalledManually(true);
      }
      setDeferredPrompt(null);
    } else {
      alert("To install, tap Share or Menu in your browser and select 'Add to Home screen'.");
    }
  };

  if (isStandalone || installedManually || dismissed) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 p-3 shadow-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="relative flex size-9 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-amber-600/30 bg-background shadow-xs">
          <Image
            src="/icons/icon-192x192.png"
            alt="Gir Somnath App Icon"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-foreground truncate">
            Install Gir Somnath App
          </span>
          <span className="text-[11px] text-muted-foreground truncate">
            Fast access, offline mode & district updates
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <Button
          size="sm"
          onClick={handleInstallClick}
          className="h-7 px-2.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
        >
          <Download className="size-3.5 mr-1" />
          Install
        </Button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-md"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
