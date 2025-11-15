import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Mentor | Weather app",
  description:
    "A modern weather application built with Next.js, TypeScript, and the Open-Meteo API. Search for any location to view current weather, 7-day forecast, and hourly conditions.",
  icons: { icon: "/assets/images/favicon-32x32.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
