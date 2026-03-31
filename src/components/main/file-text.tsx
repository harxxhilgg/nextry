import { geistMono } from "@/lib/fonts";

export function FileText({ file }: { file?: string }) {
  return (
    <span className={`${geistMono.className} text-black dark:text-white px-1 rounded backdrop-blur-xl`}>
      {file}
    </span>
  );
}
