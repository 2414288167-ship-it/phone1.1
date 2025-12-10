import type { Metadata, Viewport } from "next"; // 引入 Viewport 类型
import { Inter } from "next/font/google";
import "./globals.css";

import { UnreadProvider } from "@/context/UnreadContext";
import { AIProvider } from "@/context/AIContext";
import ClientLayout from "@/components/ClientLayout";
// 👇 引入刚才新建的注册组件
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const inter = Inter({ subsets: ["latin"] });

// 👇 配置 Viewport (Next.js 14+ 推荐写法)
export const viewport: Viewport = {
  themeColor: "#10a37f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 像原生 App 一样禁止缩放
};

// 👇 配置 Metadata，关联 manifest
export const metadata: Metadata = {
  title: "AI Chat App",
  description: "Chat App",
  manifest: "/manifest.json", // 👈 关键：链接 manifest
  icons: {
    icon: "/favicon.ico",
    apple: "/icon-192.png", // iOS 图标
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AI Chat",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        {/* 👇 插入注册组件，让 Service Worker 生效 */}
        <ServiceWorkerRegister />

        <UnreadProvider>
          <AIProvider>
            <ClientLayout>{children}</ClientLayout>
          </AIProvider>
        </UnreadProvider>
      </body>
    </html>
  );
}
