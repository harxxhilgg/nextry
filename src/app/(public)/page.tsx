import { AvatarIcons } from "@/components/landing/avatar-icons";
import { DocsBtn, SourceBtn } from "@/components/landing/source-btns";
import { FileText } from "@/components/main/file-text";
import { geistMono } from "@/lib/fonts";

export default async function Home() {
  return (
    <main className="flex flex-col w-full sm:justify-center">
      <section
        aria-labelledby="main-heading"
        className="flex flex-col items-center gap-16 sm:gap-20"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <AvatarIcons />

          <p
            className={`${geistMono.className} font-light text-center sm:text-left text-sm max-w-60 tracking-wide text-secondary`}
          >
            START <span className="text-primary">FREE</span>,{" "}
            <span className="text-primary">SCALE</span> WHEN YOU&apos;RE READY.
          </p>
        </div>

        <div className="max-w-3xl">
          <h1
            id="main-heading"
            className={`text-center text-3xl sm:text-6xl font-semibold leading-tight`}
          >
            Ship next.js apps with supabase & vercel faster.
          </h1>
        </div>

        <div className="w-full max-w-sm sm:max-w-xl">
          <p className="text-secondary text-sm sm:text-[16px] tracking-wide leading-relaxed mx-8 text-center">
            Add values of environment variables in <FileText file=".env" /> &
            make sure to change values in <FileText file="data.tsx" /> , etc.
          </p>
        </div>

        <div className="space-x-2">
          <SourceBtn />
          <DocsBtn />
        </div>
      </section>
    </main>
  );
}
