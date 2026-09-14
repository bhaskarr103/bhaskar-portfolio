import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import Header from "@/components/layout/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Bhaskar Rajaura — Autonomous Systems & Drone Vision Engineer",
  description:
    "M.Tech UAS Engineer at IIT Kanpur specializing in autonomous aerial railway inspection, computer vision (TEP-Net, SegFormer), ROS2, and CosysAirSim simulation.",
  keywords: [
    "Bhaskar Rajaura",
    "IIT Kanpur",
    "Unmanned Aerial Systems",
    "Drone Vision",
    "CosysAirSim",
    "ROS2",
    "TEP-Net",
    "Aerospace Engineer",
    "Autonomous Robotics",
    "Control Barrier Functions",
  ],
  authors: [{ name: "Bhaskar Rajaura" }],
  openGraph: {
    title: "Bhaskar Rajaura — Autonomous Systems & Drone Vision Engineer",
    description:
      "Awwwards-level scrollytelling portfolio showcasing autonomous drone vision, railway inspection, and aerospace engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#0A0A0A] text-[#EDEDED] antialiased selection:bg-[#00F0FF] selection:text-[#0A0A0A]`}
      >
        <SmoothScroll>
          {/* Subtle noise/grain texture overlay across all dark sections */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Precision custom cursor on desktop */}
          <CustomCursor />

          {/* Sticky and floating pill navigation */}
          <Header />

          {/* Main content */}
          <main className="relative z-10">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
