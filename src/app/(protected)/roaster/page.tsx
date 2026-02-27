import AIChat from "@/components/roaster/ai-chat";

export default async function GenAIPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-10">
        Roaster
      </h1>

      <main className="flex flex-col gap-10 px-4 max-w-2xl mx-auto">
        <AIChat />
      </main>
    </>
  );
}
