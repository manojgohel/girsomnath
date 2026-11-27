"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Phone, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sendOtpAction, verifyOtpAction } from "@/actions/auth-actions";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const res = await sendOtpAction(phone);
    setLoading(false);

    if (res.success) {
      setStep("otp");
      setInfo(res.message);
      if (res.demoOtp) {
        setOtp(res.demoOtp);
      }
    } else {
      setError(res.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await verifyOtpAction(phone, otp);
    setLoading(false);

    if (res.success) {
      if (res.user.role === "admin" && callbackUrl.startsWith("/admin")) {
        router.push(callbackUrl);
      } else if (callbackUrl && callbackUrl !== "/") {
        router.push(callbackUrl);
      } else {
        router.push("/");
      }
      router.refresh();
    } else {
      setError(res.error || "Invalid OTP");
    }
  };

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 py-8">
      <Card className="w-full max-w-sm border-border/80 bg-card p-6 shadow-sm rounded-2xl space-y-5">
        <div className="text-center space-y-2">
          <div className="mx-auto relative size-14 overflow-hidden rounded-2xl border border-amber-600/30 bg-background shadow-xs">
            <Image
              src="/icons/icon-192x192.png"
              alt="Gir Somnath Logo"
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Sign In to Gir Somnath</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Enter your mobile number to receive a 4-digit OTP
            </p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-2.5 text-xs text-destructive border border-destructive/20">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {info && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-2.5 text-xs text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{info}</span>
          </div>
        )}

        {step === "phone" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                <span>Mobile Number</span>
                <span className="text-[10px] text-muted-foreground">10 Digits</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-semibold text-muted-foreground">
                  +91
                </span>
                <Input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98251 11223"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  className="h-10 pl-11 rounded-xl text-xs bg-muted/30 border-border/70 font-mono tracking-wider"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || phone.length < 10}
              className="w-full h-10 rounded-xl text-xs font-bold shadow-xs"
            >
              {loading ? "Sending OTP..." : "Send 4-Digit OTP"}
              <ArrowRight className="size-3.5 ml-1.5" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">Enter 4-Digit OTP</label>
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-[11px] font-semibold text-primary hover:underline"
                >
                  Change Number
                </button>
              </div>
              <Input
                type="text"
                required
                maxLength={4}
                autoFocus
                placeholder="0 0 0 0"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                className="h-11 text-center font-mono text-base font-bold tracking-widest rounded-xl bg-muted/30 border-border/70"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || otp.length < 4}
              className="w-full h-10 rounded-xl text-xs font-bold shadow-xs"
            >
              {loading ? "Verifying..." : "Verify & Sign In"}
              <ShieldCheck className="size-3.5 ml-1.5" />
            </Button>
          </form>
        )}

        <div className="border-t border-border/60 pt-3 text-center space-y-1">
          <p className="text-[11px] text-muted-foreground">
            Admin access: use phone <strong>9999999999</strong> for auto-admin assignment
          </p>
          <Link href="/" className="inline-block text-[11px] text-primary hover:underline font-medium">
            ← Return to Homepage
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[85vh] items-center justify-center p-4">
          <div className="w-full max-w-sm h-80 rounded-2xl bg-muted/40 animate-pulse" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
