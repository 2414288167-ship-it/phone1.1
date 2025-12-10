"use client";

import React from "react";
import { AIProvider } from "@/context/AIContext";
import { MyThemeProvider } from "@/lib/MyTheme";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AIProvider>
      <MyThemeProvider>
        {/* 外层容器：深色背景(md屏幕)，手机上浅灰 */}
        <div className="flex justify-center w-full h-[100dvh] overflow-hidden bg-[#f3f4f6] md:bg-[#050a1f]">
          {/* 内层容器：手机模拟器 */}
          <div
            className="w-full max-w-[500px] h-full flex flex-col relative shadow-2xl bg-[#f3f4f6]"
            // 👇👇👇 核心修改在这里 👇👇👇
            // 使用 style 直接设置安全距离，比 Tailwind 写法更稳定
            style={{
              paddingTop: "env(safe-area-inset-top)", // 避开顶部刘海/灵动岛
              paddingBottom: "env(safe-area-inset-bottom)", // 避开底部手势小黑条
            }}
          >
            {/* 内容区域 */}
            <div className="w-full h-full flex flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </MyThemeProvider>
    </AIProvider>
  );
}
