import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/services/supabase";
import { customAlphabet } from "nanoid";

export async function POST(req: NextRequest) {
  try {
    const { url, userId } = await req.json();

    if (!url || !url.startsWith("http")) {
      return NextResponse.json({ error: "Enlace inválido." }, { status: 400 });
    }

    const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 8);

    const short = nanoid();

    const { data, error } = await supabase
      .from("links")
      .insert({ id: short, long_url: url, user_id: userId ?? null })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      shorten: `${process.env.NEXT_PUBLIC_BASE_URL}/${short}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
