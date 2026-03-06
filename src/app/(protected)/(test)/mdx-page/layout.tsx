import { TableOfContents } from "@/components/test-new/table-of-contents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDX Page - Nextry",
  description: "MDX Page of Nextry, I test new things here and use it into main product.",
};

export default function MDXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-[1fr_280px] gap-12">

        <article className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>

      </div>
    </main>
  );
}
