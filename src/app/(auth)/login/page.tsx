import { LoginButton } from "@/components/auth/login-button";
import { LoginLogo } from "@/components/auth/login-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user && !error) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-0.5 sm:gap-2">
      <LoginLogo />

      <Card className="w-full max-w-80 sm:max-w-sm">
        <CardHeader className="text-center gap-3">
          <CardTitle>Welcome Back</CardTitle>

          <CardDescription>
            Login with your Google, Github or Discord account
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-2 w-full max-w-sm mx-auto">
          <LoginButton />
        </CardContent>
      </Card>

      <p className="text-secondary text-sm my-3 w-full max-w-xs text-center">
        By Loggin in, you agree to our{" "}
        <Link
          href="/terms"
          className="underline underline-offset-3 hover:text-primary duration-200 transition-colors"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/policy"
          className="underline underline-offset-3 hover:text-primary duration-200 transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
