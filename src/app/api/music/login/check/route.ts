import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "No key" });
  try {
    // @ts-ignore
    const { login_qr_check } = await import("NeteaseCloudMusicApi");
    const res = await login_qr_check({ key });
    return NextResponse.json(res.body);
  } catch (e) {
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
