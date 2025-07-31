// app/api/send-to-n8n/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const res = await fetch("https://mikki-khan.app.n8n.cloud/webhook/0fab3db0-796d-402a-9e19-3c30f03a1186/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Failed to contact AI agent." }, { status: 500 });
  }
}
