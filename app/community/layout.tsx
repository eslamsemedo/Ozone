import type { Metadata } from "next";
// import "./globals.css";
import Header from "@/components/Header"
import { ClerkProvider } from '@clerk/nextjs'




export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ClerkProvider>

        <div className='min-h-screen flex flex-col bg-[radial-gradient(circle,_#092638_2px,_#000000_2px)] [background-size:10px_10px]'>
          { /* toaster */}
          {/* header */}
          
          <header className="sticky top-0 z-50 bg-[#000000] text-[#092638]">
            <Header />
          </header>
          <div className="flex-1">
            <main className="max-w-6xl mx-auto">
              {children}
            </main>
          </div>
        </div>
    </ClerkProvider>
  );
}
