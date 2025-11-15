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
  title: {
    default: "彩虹桥纪念 - 为您的宠物建立永恒的纪念空间",
    template: "%s | 彩虹桥纪念",
  },
  description:
    "为失去宠物的主人提供温暖、尊重、永久的纪念空间。创建纪念页，上传照片，点亮蜡烛，献上鲜花，留下思念。让爱与回忆永存。",
  keywords: [
    "宠物纪念",
    "宠物悼念",
    "彩虹桥",
    "宠物纪念页",
    "怀念宠物",
    "宠物追思",
    "宠物纪念馆",
    "宠物墓园",
    "虚拟蜡烛",
    "宠物留言",
  ],
  authors: [{ name: "wplacegrasswonder.memorial" }],
  creator: "wplacegrasswonder.memorial",
  publisher: "wplacegrasswonder.memorial",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wplacegrasswonder.memorial"
  ),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    title: "彩虹桥纪念 - 为您的宠物建立永恒的纪念空间",
    description:
      "为失去宠物的主人提供温暖、尊重、永久的纪念空间。让爱与回忆永存。",
    siteName: "彩虹桥纪念",
  },
  twitter: {
    card: "summary_large_image",
    title: "彩虹桥纪念 - 为您的宠物建立永恒的纪念空间",
    description:
      "为失去宠物的主人提供温暖、尊重、永久的纪念空间。让爱与回忆永存。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // 在实际部署时添加 Google Search Console 验证码
    // google: 'your-verification-code',
  },
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
