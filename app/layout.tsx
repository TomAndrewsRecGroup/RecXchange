import "@/app/globals.css";
import { Inter } from "next/font/google";
import React from "react";
// Import your components
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
    <html lang="en" className="dark">
      <body 
        className={`${inter.className} bg-black min-h-screen relative mesh-background antialiased`}
      >
        {/* Global UI Overlays */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9rqg49/image/upload/v1695123456/noise_z7p5vj.png')]" />
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#312fd7]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#c71df1]/10 blur-[120px] rounded-full" />
        </div>

        {/* 1. Header is placed here so it stays on top of everything */}
        <Header />

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* 2. Main content area - pt-20 ensures it doesn't hide under the header */}
          <main className="flex-grow pt-20">
            {children}
          </main>
          
          {/* 3. Footer is placed at the bottom of the stack */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
