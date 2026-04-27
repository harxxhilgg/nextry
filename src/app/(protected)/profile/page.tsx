"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Suspense } from "react";
import ProfileSkeleton from "./loading";
import { useAppSelector } from "@/lib/store/hooks";

export default function Page() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <Profile />
    </Suspense>
  );
}

export function Profile() {
  const user = useAppSelector((state) => state.user);

  if (!user || (!user.isLoaded && !user.id)) {
    return <ProfileSkeleton />;
  }

  const joined = user.created_at
    ? format(new Date(user.created_at), "MMMM yyyy")
    : null;

  const name =
    user.user_metadata?.full_name ||
    (user.email ? user.email.split("@")[0] : null) ||
    "User Fallback";

  return (
    <Card className="max-w-xl bg-transparent border-none shadow-none">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{name}</h2>

          {joined && (
            <p className="text-sm text-muted-foreground">Joined {joined}</p>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
