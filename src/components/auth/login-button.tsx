"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "../ui/button";
import {
  DiscordLogoIcon,
  GithubLogoIcon,
  GoogleLogoIcon,
} from "@phosphor-icons/react";

export function LoginButton() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleDiscordLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onClick={handleGoogleLogin}
        className="cursor-pointer font-semibold relative pl-10"
      >
        <GoogleLogoIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
        <span className="mx-auto">Sign in with Google</span>
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={handleGitHubLogin}
        className="cursor-pointer font-semibold relative pl-10"
      >
        <GithubLogoIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
        <span className="mx-auto">Sign in with GitHub</span>
      </Button>

      <Button
        variant="default"
        size="lg"
        onClick={handleDiscordLogin}
        className="cursor-pointer font-semibold relative pl-10 text-primary bg-[#5865F2] hover:bg-[#5865F295]"
      >
        <DiscordLogoIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
        <span className="mx-auto">Sign in with Discord</span>
      </Button>
    </>
  );
}
