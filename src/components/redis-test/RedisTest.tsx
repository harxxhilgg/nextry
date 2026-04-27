"use client";

import { useState } from "react";
import { getWhatStoredByKey, setRedisString, clearWhatStoredByKey } from "./actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";
import { useAppSelector } from "@/lib/store/hooks";

export default function RedisTestPage() {
  const userId = useAppSelector((state) => state.user.id);

  const [dbValue, setDbValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [key, setKey] = useState<string>("");

  async function handleSet(value: string, userId: string) {
    setLoading(true);

    try {
      await setRedisString(value, userId);
    } catch (e) {
      console.error(e);
    }
    finally {
      setLoading(false);
    };
  };

  async function getStoredByKey(key: string) {
    setLoading(true);

    try {
      const result = await getWhatStoredByKey(key, userId!);
      setDbValue(result || "Nothing in DB!, yet");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  async function clearStoredByKey(key: string) {
    setLoading(true);

    try {
      await clearWhatStoredByKey(key, userId!);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    };
  };

  return (
    <div className="space-y-10">
      <h1 className="font-semibold text-xl">Redis Common Strings</h1>

      {/* String Input Field */}
      <div className="w-full max-w-lg">
        <Field>
          <span className="flex gap-1">
            <FieldLabel htmlFor="redis-demo-string-key">Set Redis String</FieldLabel>
            <FieldLabel className="text-muted-foreground">(key: test-string)</FieldLabel>
          </span>

          <Input
            id="redis-demo-string-key"
            placeholder="Enter string to set in Redis..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <FieldDescription>
            Your string will be stored in redis and you will be able to clear it later!
          </FieldDescription>
        </Field>
      </div>

      {/* Store to Redis Button */}
      <div className="space-x-4">
        <Button
          variant="default"
          onClick={() => handleSet(value, userId!)}
          disabled={loading}
          className="cursor-pointer rounded-xl"
        >
          Set String
        </Button>
      </div>

      {/* Check What is Stored in Each Key - Input */}
      <div className="w-full max-w-lg">
        <Field>
          <FieldLabel htmlFor="redis-demo-key">Check What is Stored in a Particular String</FieldLabel>

          <Input
            id="redis-demo-key"
            placeholder="Enter redis string key to check what's in it..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />

          <FieldDescription>
            Enter your key of redis string, you will be able to find out what in it.
          </FieldDescription>
        </Field>
      </div>

      {/* Retrieve and Clear Redis Cache - Button(s) */}
      <div className="space-x-4">
        <Button
          variant="outline"
          onClick={() => getStoredByKey(key)}
          disabled={loading}
          className="cursor-pointer rounded-xl"
        >
          Get Stored by Key
        </Button>

        <Button
          variant="destructive"
          onClick={() => clearStoredByKey(key)}
          disabled={loading}
          className="cursor-pointer rounded-xl"
        >
          Clear Stored by key
        </Button>
      </div>

      <div>
        {loading ? (
          <div>
            <Spinner className="size-6 text-secondary" />
          </div>
        ) : (
          <p>
            {dbValue ? `Result: ${dbValue}` : "Click 'Get String' to fetch!"}
          </p>
        )}
      </div>

      <Separator orientation="horizontal" />
    </div>
  );
}