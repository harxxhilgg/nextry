"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type RoastItem = {
  id: string;
  name: string;
  intensity: string;
  createdAt: string;
};

export default function RoastHistoryClient({
  initialResults,
}: {
  initialResults: RoastItem[];
}) {
  const [results, setResults] = useState<RoastItem[]>(initialResults);
  const [cursor, setCursor] = useState<string | null>(
    initialResults[initialResults.length - 1]?.id ?? null
  );
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(initialResults.length === 20);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (!cursor || loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const res = await fetch(`/api/results?cursor=${cursor}`);

      if (!res.ok) throw new Error("Failed to fetch more");

      const data: RoastItem[] = await res.json();

      setResults((prev) => [...prev, ...data]);
      setCursor(data[data.length - 1]?.id ?? null);
      setHasMore(data.length === 20);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMore(false);
    }
  }, [cursor, loadingMore, hasMore]);

  useEffect(() => {
    const node = observerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: scrollContainer,
        threshold: 0.1,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [loadMore]);

  function formatDate(date: string) {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  }

  const noResults = results.length === 0;

  return (
    <div className={`space-y-6 ${noResults ? "flex" : ""}`}>
      {!noResults && (
        <h1 className="text-3xl font-semibold">Roast History</h1>
      )}

      {noResults && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageOpen />
            </EmptyMedia>

            <EmptyTitle>No Burns Yet</EmptyTitle>

            <EmptyDescription>
              You haven&apos;t created any burns yet. Get started by creating
              your first burn.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent className="-mt-1">
            <Button size="sm" asChild>
              <Link href="/roaster">Create Roast</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <div ref={scrollContainerRef} className="h-[83vh] overflow-y-auto space-y-3 pr-2">
        {results.map((item) => (
          <Link
            key={item.id}
            href={`/roaster/${item.id}`}
            className="block rounded-lg border p-4 hover:bg-muted transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(item.createdAt)}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {item.intensity}
              </span>
            </div>
          </Link>
        ))}

        {loadingMore &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={`more-${i}`}
              className="h-16 w-full rounded-lg"
            />
          ))}

        {hasMore && <div ref={observerRef} className="h-4" />}
      </div>
    </div>
  );
}