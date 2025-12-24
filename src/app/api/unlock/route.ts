import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = (await req.json()) as { key?: string };

  const expected = process.env.ACCESS_KEY;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ACCESS_KEY missing" },
      { status: 500 }
    );
  }

  if (!key || key !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });

  // Cookie semplice (non HttpOnly così puoi anche leggerlo in client, ma puoi metterlo HttpOnly se vuoi)
  res.cookies.set("access_granted", "1", {
    httpOnly: true, // meglio così
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 giorni
  });

  return res;
}
