import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");

    if (page) {
      // Get Views for specific page
      const views = await redis.get(`views:${page}`);
      return NextResponse.json({
        page,
        views: views ? Number(views) : 0,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Get all pages (use pattern matching)
      const keys = await redis.keys("views:*");
      const allViews: Record<string, number> = {};

      for (const key of keys) {
        const pageName = key.replace("views:", "");
        const views = await redis.get(key);
        allViews[pageName] = views ? Number(views) : 0;
      }

      return NextResponse.json({
        pages: allViews,
        totalViews: Object.values(allViews).reduce((a, b) => a + b, 0),
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error fetching views: ", error);

    return NextResponse.json(
      {
        error: "Failed to fetch view counts",
      },
      { status: 500 },
    );
  }
}

// POST: Increment view count for a page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;

    if (!page) {
      return NextResponse.json(
        { error: "Page name is required" },
        { status: 400 },
      );
    }

    // Increment view count and get the new value
    const newCount = await redis.incr(`views:${page}`);

    // Optional: Set expiry if you want to reset after some time
    // await redis.expire(`views:${page}`, 86400); // 24 hours

    return NextResponse.json({
      success: true,
      page,
      views: newCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return NextResponse.json(
      {
        error: "Failed to increment view count",
      },
      { status: 500 },
    );
  }
}
