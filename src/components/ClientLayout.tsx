"use client";

import React from "react";
import { AIProvider } from "@/context/AIContext";
// 👇👇👇 1. 注意这里一定要有花括号 { } 👇👇👇
import { MyThemeProvider } from "@/lib/MyTheme";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. 结构必须是：AI 包 Theme，Theme 包 Children
    <AIProvider>
      <MyThemeProvider>
        {/* 👇👇👇 新增代码开始：全屏固定容器 👇👇👇 */}

        {/* 外层容器：占满屏幕 (100dvh)，禁止整体滚动 (overflow-hidden)，背景深色 */}
        <div className="flex justify-center w-full h-[100dvh] overflow-hidden bg-[#050a1f]">
          {/* 内层容器：限制最大宽度 (手机模式)，并在手机上全屏 */}
          <div className="w-full max-w-[500px] h-full flex flex-col relative shadow-2xl bg-[#050a1f]">
            {/* 内容区域：让具体的页面内容填满容器 */}
            <div className="w-full h-full flex flex-col">{children}</div>
          </div>
        </div>

        {/* 👆👆👆 新增代码结束 👆👆👆 */}
      </MyThemeProvider>
    </AIProvider>
  );
}
