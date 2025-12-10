import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    // @ts-ignore
    const { login_qr_key, login_qr_create } = await import(
      "NeteaseCloudMusicApi"
    );
    const keyRes = await login_qr_key({});
    const key = keyRes.body.data.unikey;
    const qrRes = await login_qr_create({ key, qrimg: true });
    return NextResponse.json({ key, qrimg: qrRes.body.data.qrimg });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
