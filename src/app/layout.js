import { Roboto } from "next/font/google";
import "./globals.css";
import { PortalLayout } from "@/components/portal-layout";

const roboto = Roboto({
  variable: "--font-sans",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Gir Somnath.in - District Portal",
  description: "Directory, Events, Market and Classifieds for Gir Somnath District",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <PortalLayout>{children}</PortalLayout>
      </body>
    </html>
  );
}
