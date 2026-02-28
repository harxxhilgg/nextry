import { NUQSTest } from "@/components/dashboard/nuqs-test";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default async function TempPage() {
  return (
    <div className="flex flex-col px-2 gap-20">
      <div className="flex flex-col max-w-lg gap-2">
        <div className="flex justify-between text-secondary mx-1">
          <Label>0</Label>
          <Label>1</Label>
          <Label>2</Label>
        </div>

        <Slider defaultValue={[50]} max={100} step={50} />
      </div>

      <div className="flex max-w-lg">
        <NUQSTest />
      </div>
    </div>
  );
}
