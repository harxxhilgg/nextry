"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import z from "zod";

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

// (/)get-in-touch form
const contactSchema = z.object({
  name: z.string().min(3).max(20),
  phone: z.string().max(15).optional().or(z.literal("")),
  email: z.email(),
  message: z.string().min(2).max(300),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function sendContactMessage(data: ContactFormData) {
  const validatedData = contactSchema.parse(data);

  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!discordWebhookUrl) {
    console.error("Missing DISCORD_WEBHOOK_URL");

    throw new Error("Server configuration error");
  }

  const discordResponse = await sendToDiscord(validatedData, discordWebhookUrl);

  if (!discordResponse.ok) {
    const errorText = await discordResponse.text();

    console.error("Discord webhook failed:", errorText);

    throw new Error("Failed to send notification");
  }

  return {
    success: true,
  };
}

async function sendToDiscord(
  data: ContactFormData,
  webhookUrl: string,
): Promise<Response> {
  const discordPayload = {
    embeds: [
      {
        title: `New Message from ${data.name}`,
        color: 0x5865f2,

        fields: [
          {
            name: "Name",
            value: data.name,
            inline: false,
          },
          {
            name: "Email",
            value: data.email,
            inline: true,
          },
          {
            name: "Phone",
            value: data.phone || "Not Provided",
            inline: true,
          },
          {
            name: "Message",
            value: data.message,
            inline: false,
          },
        ],

        timestamp: new Date().toISOString(),

        footer: {
          text: "Contact Support - Nextry",
        },
      },
    ],
  };

  return fetch(webhookUrl, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(discordPayload),
  });
}
