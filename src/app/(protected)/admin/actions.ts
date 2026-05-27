"use server";

import { checkIsAdmin } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export async function deleteUser(userIdToDelete: string) {
  // Ensure admin before deleting
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  try {
    // Supabase admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    // Delete from supabase auth first
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(userIdToDelete);

    if (authError) {
      console.error("Supabase Auth Delete Error: ", authError);

      return {
        success: false,
        error: "Failed ot delete from Auth",
      };
    }

    // Delete user from prisma
    await prisma.user.delete({
      where: { id: userIdToDelete },
    });

    // Refresh the admin page to remove them from the list
    revalidatePath("/admin");

    return { sucess: true };
  } catch (error) {
    console.error(error);

    return {
      sucess: false,
      error: "Failed to delete user",
    };
  }
}
