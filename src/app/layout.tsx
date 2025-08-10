import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 'Growth' is self-hosted via globals.css @font-face under --font-growth

export const metadata: Metadata = {
  title: "AR Trading PLC - Digital Marketing Solutions",
  description:
    "Transform your business with cutting-edge digital marketing strategies. AR Trading PLC delivers innovative solutions for modern enterprises.",
  keywords: "digital marketing, trading, business solutions, AR Trading PLC",
  authors: [{ name: "AR Trading PLC" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased font-growth bg-slate-900 text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
