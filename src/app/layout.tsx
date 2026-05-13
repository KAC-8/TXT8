import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: 'TXT8 - Get Your Official Honorary Certificate in Seconds.',
  description: 'TXT8 - صكوك التقدير الفاخرة | Claim Your Legendary Title',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-inter bg-obsidian text-white">{children}</body>
    </html>
  );
}
