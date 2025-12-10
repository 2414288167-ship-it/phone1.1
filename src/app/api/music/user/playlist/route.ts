import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { cookie } = await request.json();
    if (!cookie)
      return NextResponse.json({ error: "No cookie" }, { status: 401 });

    // @ts-ignore
    const { user_account, user_playlist, playlist_track_all } = await import(
      "NeteaseCloudMusicApi"
    );
    const userRes = await user_account({ cookie });
    const userId = userRes.body.account?.id;
    if (!userId) return NextResponse.json({ error: "User not found" });

    // 获取用户第一个歌单（通常是我喜欢的音乐）
    const playlistRes = await user_playlist({ uid: userId, limit: 1, cookie });
    const playlistId = playlistRes.body.playlist[0].id;

    // 获取歌单内所有歌曲详情 (限制前50首，防止请求过慢)
    const tracksRes = await playlist_track_all({
      id: playlistId,
      limit: 50,
      cookie,
    });

    return NextResponse.json({ songs: tracksRes.body.songs });
  } catch (e) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
