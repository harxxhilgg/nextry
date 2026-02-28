import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    // Check Auth
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized " }, { status: 401 });
    }

    // Verify Ownership
    const roast = await prisma.roastResult.findUnique({
      where: { id },
    });

    if (!roast || roast.userId !== user.id) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    // Delete
    await prisma.roastResult.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
