import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
        className={`${inter.variable} ${poppins.variable} antialiased font-inter bg-slate-900 text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
