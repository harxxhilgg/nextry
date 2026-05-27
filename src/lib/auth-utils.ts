/*
  Helper function to check if the current user is an admin
*/

import prisma from "./prisma";
import { createClient } from "./supabase/server";

export async function checkIsAdmin() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If user not logged into supabase, deny access
    if (!user) return false;

    // Try to fetch from prisma
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    // If user isn't in prisma yet, deny access
    if (!dbUser) return false;

    return dbUser?.role === "ADMIN";
  } catch (error) {
    // If the db crashes or network drops, swallow the error and securely kick 'em out instead of showing 500 crash page
    console.error("Auth Exception: ", error);

    return false;
  }
}
