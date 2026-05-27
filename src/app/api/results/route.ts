import { NextRequest, NextResponse } from "next/server";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRoastResults } from "@/lib/roast-results";

export async function GET(req: NextRequest) {
  // Await connection immediately opts this route into dynamic rendering,
  // preventing Next.js from prerendering it and tripping over cookies()
  await connection();

  const url = new URL(req.url);

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") ?? undefined;

    const results = await getRoastResults(user.id, cursor);

    return NextResponse.json(results);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
