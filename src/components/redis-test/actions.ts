"use server";

import { redis } from "@/lib/redis";
import { UserData, userSchema } from "@/lib/schemas";

export async function setRedisString(value: string, userId: string) {
  /*
    > test-string:${userId} = key, value = string
  */

  await redis.set(`test-string:${userId}`, value, { ex: 60 * 60 * 10 });
  return { success: true };
}

export async function getWhatStoredByKey(key: string, userId: string) {
  const data = await redis.get<string>(`${key}:${userId}`);
  return data;
}

export async function clearWhatStoredByKey(key: string, userId: string) {
  await redis.del(`${key}:${userId}`);
  return { success: true };
}

export async function setJsonRedis(userId: string, data: UserData) {
  // Server Validation
  const parsed = userSchema.parse(data);

  await redis.set(`app:user:${userId}`, parsed, {
    ex: 60 * 60 * 24,
  });

  return { success: true };
}

export async function getJsonRedis(userId: string) {
  const data = await redis.get<UserData>(`app:user:${userId}`);

  if (!data) return null;

  return data;
}

export async function trackVisitor(visitorId: string) {
  const isNew = await redis.sadd("app:visitors:set", visitorId);

  if (isNew === 1) {
    await redis.incr("app:visitor:count");
  }

  const count = await redis.get<number>("app:visitor:count");

  return count;
}
