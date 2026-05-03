import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import CursorGravity from "@/components/CursorGravity";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indian Voter Companion AI",
  description: "Your multilingual AI guide to the Indian electoral process.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main-content" className="sr-only focus:not-sr-only" style={{ position: 'absolute', zIndex: 9999, background: 'white', padding: '1rem', color: 'var(--navy)', fontWeight: 'bold' }}>
          Skip to content
        </a>
        <LanguageProvider>
          <div className="hero-bg">
            <div 
              className="hero-shape bg-saffron" 
              style={{ width: '400px', height: '400px', top: '-10%', left: '-5%' }}
            />
            <div 
              className="hero-shape bg-green" 
              style={{ width: '500px', height: '500px', bottom: '-20%', right: '-10%' }}
            />
          </div>
          <CursorGravity />
          <Navbar />
          <main id="main-content" style={{ position: 'relative', zIndex: 5 }}>
            {children}
          </main>
        </LanguageProvider>
        <GoogleAnalytics gaId="G-DEMO-ID" />
      </body>
    </html>
  );
}
