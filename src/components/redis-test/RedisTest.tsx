"use client";

import { useState } from "react";
import { getWhatStoredByKey, setRedisString, clearWhatStoredByKey, setJsonRedis, getJsonRedis } from "./actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { Spinner } from "../ui/spinner";
import { Separator } from "../ui/separator";
import { useAppSelector } from "@/lib/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "../ui/skeleton";
import { UserData, userSchema } from "@/lib/schemas";
import { toast } from "sonner";
import { hanken } from "@/lib/fonts";

export default function RedisTestPage() {
  const userId = useAppSelector((state) => state.user.id);

  const [dbValue, setDbValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [dbJSONValue, setDbJSONValue] = useState<UserData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      // name: "",
      // location: "",
      // age: 22,
    },
  });

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

  async function getJSON() {
    setLoading(true);
    // await delay(5000);

    try {
      const result = await getJsonRedis(userId!);
      setDbJSONValue(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    };
  };

  const onSubmit = async (data: UserData) => {
    toast.promise(
      async () => {
        await setJsonRedis(userId!, data);
        // do extra thing(s) here
      },
      {
        loading: "Updating data...",

        success: () => {
          reset(); // Reset the form to empty state
          getJSON(); // Fetching updated data
          return "Data has been updated!";
        },

        error: "Failed to update data!",

        closeButton: true,
        // duration: 3000,
      }
    );
  };

  return (
    <div className="space-y-10">
      <h1 className={`${hanken.className} font-semibold text-xl`}>Redis Common Strings</h1>

      {/* String Input Field */}
      <div className="w-full max-w-xl">
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
      <div className="w-full max-w-xl">
        <Field>
          <FieldLabel htmlFor="redis-demo-key">Check What is Stored in a Particular Key</FieldLabel>

          <Input
            id="redis-demo-key"
            placeholder="Enter redis string key to check what's in it..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />

          <FieldDescription>
            Enter the name of your key (Look above in parentheses) and enter it here,
          </FieldDescription>

          <FieldDescription>
            Full key would be look like <strong>{`test-string:${userId}`}</strong>
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

      <div className="w-full max-w-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="rhf-name">Name</FieldLabel>

            <Input
              id="rhf-name"
              placeholder="Name"
              {...register("name")}
            />

            {errors.name && (
              <FieldDescription className="text-red-500">
                {errors.name.message}
              </FieldDescription>
            )}
          </Field>

          {/* Age */}
          <Field>
            <FieldLabel id="rhf-age">Age</FieldLabel>

            <Input
              id="rhf-age"
              type="number"
              placeholder="Age"
              {...register("age", { valueAsNumber: true })}
            />

            {errors.age && (
              <FieldDescription className="text-red-500">
                {errors.age.message}
              </FieldDescription>
            )}
          </Field>

          {/* Location */}
          <Field>
            <FieldLabel htmlFor="rhf-location">Location</FieldLabel>

            <Input
              id="rhf-location"
              placeholder="Location"
              {...register("location")}
            />

            {errors.location && (
              <FieldDescription className="text-red-500">
                {errors.location.message}
              </FieldDescription>
            )}
          </Field>

          <div className="mt-8">
            <Button
              type="submit"
              variant="default"
              className="cursor-pointer rounded-xl w-26"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Spinner className="size-6" />
              ) : (
                <p>Save</p>
              )}
            </Button>
          </div>
        </form>
      </div>

      <Button
        variant="outline"
        onClick={getJSON}
        disabled={loading}
        className="cursor-pointer rounded-xl"
      >
        Get JSON
      </Button>

      {loading ? (
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-60" />
        </div>
      ) : (
        <div>
          <p>Name: {dbJSONValue?.name}</p>
          <p>Age: {dbJSONValue?.age}</p>
          <p>Location: {dbJSONValue?.location}</p>
        </div>
      )}
    </div>
  );
}