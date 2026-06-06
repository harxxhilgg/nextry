"use server";

import { checkIsAdmin } from "@/lib/auth-utils";
import { supabaseAdmin } from "@/lib/supabase/admin";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteUser(userIdToDelete: string) {
  // Ensure admin before deleting
  await requireAdminUserId();

  try {
    // Delete from supabase auth first
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(userIdToDelete);

    if (authError) {
      console.error("Supabase Auth Delete Error: ", authError);

      return {
        success: false,
        error: "Failed to delete from Auth",
      };
    }

    // Delete user from prisma
    await prisma.user.delete({
      where: { id: userIdToDelete },
    });

    // Refresh the admin page to remove them from the list
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Failed to delete user",
    };
  }
}

export async function forceLogoutUser(targetUserId: string) {
  await requireAdminUserId();

  try {
    for (const tableName of ["sessions", "refresh_tokens"] as const) {
      const tableExists = await prisma.$queryRaw<Array<{ exists: boolean }>>`
        SELECT to_regclass(${`auth.${tableName}`}) IS NOT NULL AS "exists"
      `;

      if (!tableExists[0]?.exists) {
        continue;
      }

      await prisma.$executeRawUnsafe(
        `DELETE FROM auth.${tableName} WHERE user_id = $1`,
        targetUserId,
      );
    }

    revalidatePath("/admin/logs/access");

    return {
      success: true,
      message: "User sessions revoked successfully.",
    };
  } catch (error) {
    console.error("Failed to force logout user:", error);

    return {
      success: false,
      error: "Failed to force logout user",
    };
  }
}

export async function deleteLog(logId: string, logType: "access" | "action") {
  await requireAdminUserId();

  try {
    let deletedLog;

    if (logType === "access") {
      deletedLog = await prisma.adminAccessLog.delete({
        where: {
          id: logId,
        },
      });
    } else if (logType === "action") {
      deletedLog = await prisma.adminActionsLog.delete({
        where: {
          id: logId,
        },
      });
    }

    revalidatePath(`/admin/logs/${logType}`);

    return {
      success: true,
      data: deletedLog,
      message: `${logType === "access" ? "Access" : "Action"} Log deleted successfully.`,
    };
  } catch (error) {
    console.error(`Failed to delete ${logType} log:`, error);

    return {
      success: false,
      message: `Failed to delete ${logType} log.`,
    };
  }
}

type AdminActionInput = {
  targetUserId: string;
  reason?: string | null;
};

async function requireAdminUserId() {
  const auth = await checkIsAdmin();
  if (!auth.isAdmin || !auth.user) {
    throw new Error("Unauthorized");
  }

  return auth.user.id;
}

export async function warnUser({ targetUserId }: AdminActionInput) {
  const adminUserId = await requireAdminUserId();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: targetUserId },
      data: { warningCount: { increment: 1 } },
    }),
    prisma.adminActionsLog.create({
      data: {
        adminUserId,
        targetUserId,
        action: "WARN",
      },
    }),
  ]);

  revalidatePath("/admin/logs/action");
}

export async function resetWarnings({ targetUserId }: AdminActionInput) {
  const adminUserId = await requireAdminUserId();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: targetUserId },
      data: { warningCount: 0 },
    }),
    prisma.adminActionsLog.create({
      data: {
        adminUserId,
        targetUserId,
        action: "RESET_WARNINGS",
      },
    }),
  ]);

  revalidatePath("/admin/logs/action");
}

export async function permBanUser({ targetUserId, reason }: AdminActionInput) {
  const adminUserId = await requireAdminUserId();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: targetUserId },
      data: {
        isBanned: true,
        bannedAt: new Date(),
        bannedReason: reason ?? "PERM_BAN",
      },
    }),
    prisma.adminActionsLog.create({
      data: {
        adminUserId,
        targetUserId,
        action: "PERM_BAN",
        reason: reason ?? null,
      },
    }),
  ]);

  revalidatePath("/admin/logs/action");
}

export async function unbanUser({ targetUserId }: AdminActionInput) {
  const adminUserId = await requireAdminUserId();

  await prisma.$transaction([
    prisma.user.update({
      where: { id: targetUserId },
      data: {
        isBanned: false,
        bannedAt: null,
        bannedReason: null,
      },
    }),
    prisma.adminActionsLog.create({
      data: {
        adminUserId,
        targetUserId,
        action: "UNBAN",
      },
    }),
  ]);

  revalidatePath("/admin/logs/action");
}
