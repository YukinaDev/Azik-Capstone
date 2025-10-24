import type { Metadata } from "next";
import { Geist, Geist_Mono, Agbalumo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const agbalumo = Agbalumo({
  variable: "--font-wolf",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Az1k",
  description:
    "Immersive designer portfolio showcasing projects, process, and contact paths with bold motion and storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${agbalumo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
