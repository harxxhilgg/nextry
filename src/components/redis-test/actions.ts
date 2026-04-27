"use server";

import { redis } from "@/lib/redis";

// Set
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
