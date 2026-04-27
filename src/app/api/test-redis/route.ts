import { redis, testRedisConnection } from "@/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connected = await testRedisConnection();

    // Get some stats
    const totalRequests = (await redis.get("total_api_requests")) || 0;

    return NextResponse.json({
      success: connected,
      message: connected
        ? "Redis is working perfectly!"
        : "Redis connection failed",
      stats: {
        totalApiRequests: totalRequests,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
