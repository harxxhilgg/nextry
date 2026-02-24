import { CopyBtn } from "@/components/dashboard/copy-btn";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col px-2 gap-20">
      <p className="font-semibold tracking-wide">
        Hellowww!, {user?.user_metadata.name}.
      </p>

      <div className="flex flex-col max-w-lg gap-2">
        <div className="flex justify-between text-secondary mx-1">
          <Label>0</Label>
          <Label>1</Label>
          <Label>2</Label>
        </div>

        <Slider
          defaultValue={[50]}
          max={100}
          step={50}
        />
      </div>

      <div>
        <CopyBtn />
      </div>
    </div>
  );
}
