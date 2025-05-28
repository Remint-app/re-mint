import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SolanaProvider } from "@/components/SolanaProvider";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "ReMint",
  description: "After purchasing a product or service, the buyer receives an NFT-based receipt containing transaction details and warranty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SolanaProvider>
          <Navbar/> {children}</SolanaProvider>
      </body>
    </html>
  );
}
