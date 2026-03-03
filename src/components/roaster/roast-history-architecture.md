# Roast History Architecture (Next.js App Router)

This document explains the architecture behind the Roast History feature,
including:

- `app/roast-history/page.tsx` (Server Component)
- `RoastHistoryClient.tsx` (Client Component)
- `/api/results/route.ts` (API Route)
- `lib/roast-results.ts` (Shared DB Logic)

---

# 🧠 High-Level Architecture

```
page.tsx (Server Component)
    ↓
RoastHistoryClient.tsx (Client Component)
    ↓
/api/results/route.ts (API Route)
    ↓
Database (Prisma)
```

Each layer has a single responsibility.

---

# 1️⃣ Server Component — `page.tsx`

### Responsibility

- Authenticate user
- Fetch initial 20 results
- Convert `Date` → `string`
- Pass serialized data to Client Component
- Render ready HTML (no loading flash)

---

## Code (Relevant Parts)

```tsx
import RoastHistoryClient from "./RoastHistoryClient";
import { createClient } from "@/lib/supabase/server";
import { getRoastResults } from "@/lib/roast-results";

export default async function RoastHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Unauthorized</div>;

  const rawResults = await getRoastResults(user.id);

  // IMPORTANT: Convert Date → string (RSC boundary serialization)
  const initialResults = rawResults.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));

  return <RoastHistoryClient initialResults={initialResults} />;
}
```

---

## Why This Is Important

Instead of:

```
Browser → JS loads → useEffect → API → DB → Render
```

We now have:

```
Server → DB → HTML with data → Browser
```

Benefits:

- No initial loading state
- Faster Time-To-First-Byte
- Better SEO
- Smaller client bundle
- No unnecessary internal HTTP call

---

# 2️⃣ Client Component — `RoastHistoryClient.tsx`

### Responsibility

- Manage state
- Handle infinite scroll
- Fetch additional pages only
- Pure interactivity layer

It does NOT:

- Authenticate
- Access database
- Fetch initial data

---

## Initial State Hydration

```tsx
"use client";

const [results, setResults] = useState(initialResults);

const [cursor, setCursor] = useState(
  initialResults[initialResults.length - 1]?.id ?? null,
);

const [loadingMore, setLoadingMore] = useState(false);
const [hasMore, setHasMore] = useState(initialResults.length === 20);
```

This hydrates client state with server-rendered data.

No mismatch.
No flash.

---

## Infinite Scroll Logic

```tsx
const loadMore = useCallback(async () => {
  if (!cursor || loadingMore || !hasMore) return;

  try {
    setLoadingMore(true);

    const res = await fetch(`/api/results?cursor=${cursor}`);
    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();

    setResults((prev) => [...prev, ...data]);
    setCursor(data[data.length - 1]?.id ?? null);
    setHasMore(data.length === 20);
  } finally {
    setLoadingMore(false);
  }
}, [cursor, loadingMore, hasMore]);
```

---

# 🔍 IntersectionObserver Deep Dive

You are NOT scrolling the window.

You are scrolling this container:

```tsx
<div
  ref={scrollContainerRef}
  className="h-[83vh] overflow-y-auto"
>
```

So your observer MUST use:

```tsx
useEffect(() => {
  const node = observerRef.current;
  const scrollContainer = scrollContainerRef.current;

  if (!node || !scrollContainer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    {
      root: scrollContainer, // CRITICAL
      threshold: 0.1,
    },
  );

  observer.observe(node);

  return () => observer.disconnect();
}, [loadMore]);
```

---

## Sentinel Element

```tsx
{
  hasMore && <div ref={observerRef} className="h-4" />;
}
```

This invisible element triggers loading when it becomes visible inside the scroll container.

---

# 3️⃣ API Route — `/api/results/route.ts`

### Responsibility

- Authenticate client request
- Read cursor
- Fetch paginated results
- Return JSON

Used ONLY for infinite scroll.

---

## Code (Relevant Parts)

```ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getRoastResults } from "@/lib/roast-results";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") ?? undefined;

  const results = await getRoastResults(user.id, cursor);

  return NextResponse.json(results);
}
```

---

# 4️⃣ Shared DB Logic — `lib/roast-results.ts`

Prevents duplication between:

- Server Component
- API Route

---

## Code

```ts
import prisma from "@/lib/prisma";

export async function getRoastResults(userId: string, cursor?: string) {
  return prisma.roastResult.findMany({
    where: { userId },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 20,
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    select: {
      id: true,
      name: true,
      intensity: true,
      createdAt: true,
    },
  });
}
```

---

# 📊 Pagination Strategy

Cursor-based pagination:

- Ordered by `createdAt desc, id desc`
- Uses `cursor + skip: 1`
- Stable and duplicate-safe
- Better than offset pagination

---

# 🔁 Full Data Flow

## Initial Page Load

```
Browser requests /roast-history
    ↓
Server Component runs
    ↓
Supabase auth
    ↓
Prisma query (first 20)
    ↓
HTML sent with data
    ↓
React hydrates
```

No API call.
No loading spinner.

---

## Infinite Scroll

```
User scrolls
    ↓
Sentinel enters view
    ↓
IntersectionObserver fires
    ↓
fetch(/api/results?cursor=...)
    ↓
API route authenticates
    ↓
Prisma fetches next 20
    ↓
JSON returned
    ↓
setResults([...prev, ...new])
```

---

# 🏆 Why This Architecture Is Correct

- No initial loading flash
- No internal server-to-server HTTP calls
- Proper RSC serialization
- Secure auth
- Scalable pagination
- Clean separation of concerns
- Works perfectly with App Router

---

# 🧠 Core Principles Learned

1. Server Components fetch initial data.
2. Client Components handle interactivity only.
3. Never pass `Date` objects across RSC boundary — serialize.
4. If using custom scroll containers, set `root` in IntersectionObserver.
5. Extract DB logic to shared functions.
6. Use cursor pagination for stability.
