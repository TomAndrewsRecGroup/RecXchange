import "@/app/globals.css";
import { Inter } from "next/font/google";
import React from "react";
// We keep the Footer here so it stays global, but remove the Header import if not used
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
      <body className={`${inter.className} bg-black min-h-screen antialiased overflow-x-hidden`}>
        {/* Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9rqg49/image/upload/v1695123456/noise_z7p5vj.png')]" />
          <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#312fd7]/15 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#c71df1]/15 blur-[120px] rounded-full" />
        </div>

        {/* HEADER REMOVED FROM HERE 
            (Assuming you are calling <Header /> inside your individual page files)
        */}

        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <main className="flex-grow w-full">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  );
}
