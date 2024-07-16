import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
        <main className="p-5">
          {children}
        </main>
      </body>
    </html>
  );
}
