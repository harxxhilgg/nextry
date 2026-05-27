"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addLocation(formData: FormData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "User not found." };

    const name = formData.get("name") as string;
    const location = formData.get("location") as string;

    await prisma.location.create({
      data: {
        name,
        location,
        createdBy: user.user_metadata.full_name,
      },
    });

    revalidatePath("/locations");

    return { success: true, error: null };
  } catch (error) {
    console.error("Failed to add location: ", error);

    return {
      success: false,
      error: "Failed to add location. Please try again.",
    };
  }
}

export async function getLocations() {
  try {
    return await prisma.location.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch locations: ", error);
    return [];
  }
}
