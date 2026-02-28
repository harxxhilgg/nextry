import { DeleteRoastButton } from "@/components/roaster/delete-roast-button";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function RoastItem({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const { resultId } = await params;

  const roast = await prisma.roastResult.findUnique({
    where: { id: resultId },
  });

  if (!roast) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">{roast.name}</h1>

        <p className="text-secondary text-sm max-w-prose">{roast.bio || ""}</p>

        <div className="flex items-center gap-3 text-sm text-secondary">
          <span className="capitalize">Intensity: {roast.intensity}</span>
          <span>•</span>
          <span>{new Date(roast.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mt-10 space-y-5">
        <p className="text-sm font-medium text-secondary uppercase tracking-wide">
          Result
        </p>

        {roast.result.map((item, index) => (
          <p
            key={index}
            className="leading-relaxed text-[15px] text-foreground/90"
          >
            {item}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <DeleteRoastButton id={resultId} />
      </div>
    </div>
  );
}
