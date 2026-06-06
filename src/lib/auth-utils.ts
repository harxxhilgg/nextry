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
    if (!user) {
      return {
        isAdmin: false,
        reason: "DENIED_UNAUTH",
        user: null,
      };
    }

    if (!user.email) {
      return {
        isAdmin: false,
        reason: "DENIED_UNAUTH",
        user,
      };
    }

    // Try to fetch their role from prisma
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { role: true },
    });

    // Valid supabase user, but not in prisma yet
    if (!dbUser) {
      return {
        isAdmin: false,
        reason: "DENIED_ROLE",
        user,
      };
    }

    if (dbUser.role === "ADMIN") {
      return { isAdmin: true, reason: "GRANTED", user };
    } else {
      return { isAdmin: false, reason: "DENIED_ROLE", user };
    }
  } catch (error) {
    // If the db crashes or network drops, swallow the error and securely kick 'em out instead of showing 500 crash page
    console.error("Auth Exception: ", error);

    return { isAdmin: false, reason: "DENIED_UNAUTH", user: null };
  }
}
