import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "wplacegrasswonder.memorial - 宠物纪念网站",
  description: "为失去宠物的主人提供温暖、尊重、永久的纪念空间",
  keywords: ["宠物纪念", "宠物悼念", "彩虹桥", "宠物纪念页", "怀念宠物"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
