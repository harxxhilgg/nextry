import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

// Mock data - in real app, this would come from a database
const mockPosts = [
  { id: 1, title: "First Post", content: "This is the first post" },
  { id: 2, title: "Second Post", content: "This is the second post" },
  { id: 3, title: "Third Post", content: "This is the third post" },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const forceRefresh = searchParams.get("refresh") === "true";

    const cacheKey = "posts:all";

    // Try to get from cache first (unless force refresh)
    if (!forceRefresh) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          console.log("📦 Returning cached posts");

          // Parse the cached data safely
          let parsedData;
          if (typeof cached === "string") {
            parsedData = JSON.parse(cached);
          } else {
            parsedData = cached;
          }

          return NextResponse.json({
            source: "cache",
            data: parsedData,
            timestamp: new Date().toISOString(),
          });
        }
      } catch (cacheError) {
        console.error("Cache read error:", cacheError);
        // Continue to database if cache read fails
      }
    }

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store in cache for 60 seconds
    try {
      await redis.set(cacheKey, JSON.stringify(mockPosts), { ex: 60 });
      console.log("💾 Stored posts in cache for 60 seconds");
    } catch (storeError) {
      console.error("Cache store error:", storeError);
      // Don't fail the request if caching fails
    }

    return NextResponse.json({
      source: "database",
      data: mockPosts,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Posts API error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

export async function POST() {
  try {
    await redis.del("posts:all");
    return NextResponse.json({
      message: "Cache invalidated",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cache invalidation error:", error);
    return NextResponse.json(
      { error: "Failed to invalidate cache" },
      { status: 500 },
    );
  }
}
