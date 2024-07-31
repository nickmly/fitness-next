import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navigation/Navbar";
import { Toaster } from "@/components/ui/toaster";

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
      <body className={notoSans.className}>
        <Navbar />
        <main className="flex justify-center m-5 lg:mx-10 ">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
