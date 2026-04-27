import { Redis } from "@upstash/redis";

// Create Redis client from environment variables
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helper function to test connection
export async function testRedisConnection() {
  try {
    const pong = await redis.ping();
    console.log("✅ Upstash Redis connected:", pong === "PONG");

    // Test setting and getting a value
    await redis.set("test-key", "Hello from Next.js!", { ex: 60 });
    const value = await redis.get("test-key");

    console.log("Test value stored/retrived: ", value);

    return true;
  } catch (error) {
    console.error("Upstash Redis connection failed: ", error);

    return false;
  }
}
