import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f1724",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "eSitesz Bio — Professional Bio Link & Digital Identity SaaS",
    template: "%s | eSitesz Bio",
  },
  description:
    "Production SaaS platform enabling creators, leaders, and organizations to create high-converting bio link pages like Hasnain Baqai and JRM Antophill with dynamic SEO, AEO, and GEO optimization.",
  keywords: [
    "Bio Link",
    "Digital Business Card",
    "Linktree Alternative",
    "eSitesz",
    "Hasnain Baqai",
    "JRM Antophill",
    "AEO Optimization",
    "Local SEO India",
  ],
  authors: [{ name: "Esitesz Technologies", url: "https://www.esitesz.com" }],
  creator: "Esitesz Technologies",
  publisher: "Esitesz",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0b0f1a] text-[#e6eef8] font-sans">
        {children}
      </body>
    </html>
  );
}
