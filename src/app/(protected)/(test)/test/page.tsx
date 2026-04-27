import { GradientTextSection } from "@/components/test-new/gradient-text";
import { NUQSTest } from "@/components/test-new/nuqs-test";
import { TextPressureSection } from "@/components/test-new/text-pressure";
import { TextTypeSection } from "@/components/test-new/text-type";
import { DecryptedTextSection } from "@/components/test-new/decrypted-text";
import { ScrollVelocitySection } from "@/components/test-new/scroll-velocity";
import { AntiGravitySection } from "@/components/test-new/anti-gravity";
import { LogoLoopSection } from "@/components/test-new/logo-loop";
import { SilkSection } from "@/components/test-new/silk-bg";
import { ImageCarousel } from "@/components/test-new/image-carousel";
import { DrawerEx } from "@/components/test-new/drawer-ex";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TestPage() {
  return (
    <div className="flex flex-col items-center gap-20 pb-60">
      <div className="flex w-md justify-center">
        <Link href="/test/testwo">
          <Button size="lg" variant="outline" className="cursor-pointer rounded-2xl w-40 h-12">
            Go to /testwo
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-xl">
        <NUQSTest />
      </div>

      <div className="max-w-5xl">
        <TextPressureSection />
      </div>

      <div className="max-w-5xl">
        <TextTypeSection />
      </div>

      <div className="max-w-5xl">
        <GradientTextSection />
      </div>

      <div className="max-w-5xl">
        <DecryptedTextSection />
      </div>

      <div className="max-w-3xl">
        <ScrollVelocitySection />
      </div>

      <div className="w-full max-w-3xl h-120 border-2 border-accent rounded-lg">
        <AntiGravitySection />
      </div>

      <div className="max-w-xl sm:max-w-6xl">
        <LogoLoopSection />
      </div>

      <div className="w-full max-w-4xl h-150">
        <SilkSection />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <p className="text-2xl font-semibold">Carousel Example</p>
        <ImageCarousel />
      </div>

      <div className="w-full max-w-4xl space-y-6">
        <p className="text-2xl font-semibold">Drawer</p>
        <DrawerEx />
      </div>
    </div>
  );
}
