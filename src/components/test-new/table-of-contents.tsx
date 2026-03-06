"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article.prose h2, article.prose h3")
    ) as HTMLHeadingElement[];

    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: Number(el.tagName.replace("H", "")),
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items);

    const handleScroll = () => {
      let current = "";

      for (const heading of elements) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) {
          current = heading.id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!headings.length) return null;

  return (
    <nav className="text-sm relative">
      <p className="mb-4 font-medium text-muted-foreground">
        On this page
      </p>

      <ul className="relative pl-4 space-y-2">
        {headings.map((heading) => {
          const active = activeId === heading.id;

          return (
            <li
              key={heading.id}
              className={heading.level === 3 ? "ml-3" : ""}
            >
              <a
                href={`#${heading.id}`}
                className={`block relative transition-colors
                ${active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {active && (
                  <span className="absolute -left-4.25 top-0 h-full w-0.5 bg-foreground rounded-full" />
                )}

                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}