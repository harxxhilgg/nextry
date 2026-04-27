import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Create a rate limiter that allows 3 reqs per 10sec
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "10s"),
});

export async function GET(request: NextRequest) {
  // Get IP address for rate limiting
  const ip = request.headers.get("x-forwarded-for") || "anonymous";

  // Check if rate limit is exceeded
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error: "Too many requests",
        limit,
        resetIn: Math.ceil((reset - Date.now()) / 1000),
        remaining,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      },
    );
  }

  // Increment a global counter
  const totalRequests = await redis.incr("total_api_requests");

  return NextResponse.json({
    message: "Hello from Next.js with Upstash Redis!",
    timestamp: new Date().toISOString(),
    rateLimit: {
      limit,
      remaining,
      reset: new Date(reset).toISOString(),
    },
    stats: {
      totalRequestsToThisEndpoint: totalRequests,
    },
  });
}
