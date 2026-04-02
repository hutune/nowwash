import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "NowWash — Premium O2O Laundry",
  description:
    "Next-generation O2O laundry service in Vietnam. Clean, fast, and reliable.",
  keywords: ["laundry", "O2O", "NowWash", "giặt giao tận nhà"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${GeistSans.variable} dark antialiased`} suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-white/20"
      >
        {children}
      </body>
    </html>
  );
}
