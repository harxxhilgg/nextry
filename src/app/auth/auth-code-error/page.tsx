"use client";

import { Button } from "@/components/ui/button";
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";

type ErrorInfo = {
  error?: string;
  code?: string;
  description?: string;
};

const friendlyErrors: Record<string, string> = {
  unexpected_failure:
    "This email is already connected to another sign-in method. Try signing in using the original provider.",
  access_denied: "Access was denied. Please try again.",
  server_error: "Something went wrong during sign-in. Please try again.",
};

export default function AuthCodeError() {
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const params = new URLSearchParams(hash);

    // Some providers double encode → decode twice safely
    const rawDescription = params.get("error_description") || "";

    let decoded = rawDescription;
    try {
      decoded = decodeURIComponent(rawDescription);
      decoded = decodeURIComponent(decoded);
    } catch {
      // ignore decode errors
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrorInfo({
      error: params.get("error") ?? undefined,
      code: params.get("error_code") ?? undefined,
      description: decoded || undefined,
    });
  }, []);

  const message =
    (errorInfo.code && friendlyErrors[errorInfo.code]) ||
    errorInfo.description ||
    "There was an error signing in. Please try again.";

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-6 sm:gap-10 text-center px-6">
      <h1 className="text-3xl sm:text-6xl font-semibold tracking-tight">
        Authentication Error
      </h1>

      <p className="text-sm tracking-wide text-secondary max-w-xs sm:max-w-md">
        {message}
      </p>

      <Link href="/">
        <Button variant="outline" size="default" className="rounded-xl">
          <ArrowUUpLeftIcon />
          Go back home
        </Button>
      </Link>
    </div>
  );
}
