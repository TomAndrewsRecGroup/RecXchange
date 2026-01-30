import "@/app/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RecXchange | The Recruiter Xchange",
  description: "Connect, Collaborate, and Scale with the Xchange Engine.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body 
        className={`${inter.className} bg-black min-h-screen antialiased overflow-x-hidden`}
      >
        {/* Background Layer: Fixed and Full Width */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9rqg49/image/upload/v1695123456/noise_z7p5vj.png')]" />
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#312fd7]/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#c71df1]/15 blur-[120px] rounded-full" />
        </div>

        {/* Navigation: Fixed z-index ensures it stays on top */}
        <Header />

        {/* Content Wrapper: 
            - flex-col + min-h-screen keeps footer at the bottom.
            - w-full ensures it spans the entire browser width.
        */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {/* Increased pt-24 to ensure clearance for the large CTA header.
              w-full ensures the inner content can span the whole screen.
          */}
          <main className="flex-grow w-full pt-24">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
