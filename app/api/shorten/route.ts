import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/services/supabase";
import { customAlphabet } from "nanoid";
import { urlSchema } from "@/app/helpers/validations";
import generateUrl from "@/app/helpers/generateUrl";
import es from "@/app/locale/es.json";
import en from "@/app/locale/en.json";

const messages = { es, en };
const nanoidRandom = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  3
);

export async function POST(req: NextRequest) {
  try {
    const {
      url,
      lang = "en",
      userId = null,
    } = (await req.json()) as {
      url: string;
      lang?: "es" | "en";
      userId?: string | null;
    };

    const parsed = urlSchema(messages[lang].Validations).safeParse(url);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const normalizedUrl = parsed.data;

    let link = generateUrl(normalizedUrl);

    const { data: existing } = await supabase
      .from("links")
      .select("id")
      .eq("id", link)
      .single();

    if (existing) {
      link += nanoidRandom();
    }

    const { error } = await supabase
      .from("links")
      .insert({
        id: link,
        long_url: normalizedUrl,
        user_id: userId ?? null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      shorten: `${process.env.NEXT_PUBLIC_BASE_URL}/${link}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
