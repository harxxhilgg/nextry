"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import prisma from "@/lib/prisma";

export async function getUserById(userId: string) {
  if (!userId) {
    return {
      userId: "",
      email: null,
      name: null,
      avatarUrl: null,
      role: null,
      createdAt: null,
      lastLoginAt: null,
      loginCount: null,
      error: "Missing user id.",
    };
  }

  const [authUserResult, dbUser] = await Promise.all([
    supabaseAdmin.auth.admin.getUserById(userId),
    prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    }),
  ]);

  const { data, error } = authUserResult;

  if (error) {
    return {
      userId,
      email: null,
      name: null,
      avatarUrl: null,
      role: null,
      createdAt: null,
      lastLoginAt: null,
      loginCount: null,
      error: error.message,
    };
  }

  const name =
    (data.user?.user_metadata?.full_name as string | undefined) ??
    (data.user?.user_metadata?.name as string | undefined) ??
    null;

  const avatarUrl =
    (data.user?.user_metadata?.avatar_url as string | undefined) ??
    (data.user?.user_metadata?.picture as string | undefined) ??
    null;

  return {
    userId,
    email: data.user?.email ?? null,
    name,
    avatarUrl,
    role: dbUser?.role ?? null,
    createdAt: data.user?.created_at ?? null,
    lastLoginAt: data.user?.last_sign_in_at ?? null,
    loginCount: null,
    error: null,
  };
}
