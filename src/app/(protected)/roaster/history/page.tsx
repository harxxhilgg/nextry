import { createClient } from "@/lib/supabase/server";
import { getRoastResults } from "@/lib/roast-results";
import RoastHistoryClient from "@/components/roaster/roast-history-client";

export default async function RoastHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Unauthorized</div>;
  }

  const initialResultsRaw = await getRoastResults(user.id);

  const initialResults = initialResultsRaw.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
  }));

  return <RoastHistoryClient initialResults={initialResults} />;
}