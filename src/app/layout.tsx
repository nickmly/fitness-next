import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navigation/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nextFitness",
  description: "Fitness logging app built in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(notoSans.className, 'flex flex-col h-screen')}>
        <Navbar />
        <main className="flex justify-center flex-auto flex-shrink-0">
          {children}
        </main>
        <footer className="flex w-full h-40 justify-center items-center bg-black/50 flex-shrink-0">
          This site is for demonstration purposes only.
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
