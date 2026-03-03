import prisma from "@/lib/prisma";

export async function getRoastResults(userId: string, cursor?: string) {
  return prisma.roastResult.findMany({
    where: { userId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 20,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    select: {
      id: true,
      name: true,
      intensity: true,
      createdAt: true,
    },
  });
}
