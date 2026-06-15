import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

// Helper function - returns true if path is /admin or /admin/*
function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

// Extract users IP Address
function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) return forwarded.split(",")[0].trim();

  return request.headers.get("x-real-ip");
}

export async function proxy(request: NextRequest) {
  // Default response, continues to requested page
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  /*
    - Supabase server client which can read/write cookies
    - Used to check if user is logged in via Supabase Auth
  */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Must await to refresh session
  // Get Authenticated User - and store into authData
  const { data: authData } = await supabase.auth.getUser();

  // Get current URL path
  const pathname = request.nextUrl.pathname;

  //! ONLY APPLIES TO /admin & /admin/* ROUTES - OTHER ROUTES GOES UN-CHECKED
  if (isAdminPath(pathname)) {
    // Get email of current user
    const email = authData.user?.email ?? null;

    if (email) {
      // Get userdata from User table using that email
      const user = await prisma.user.findUnique({ where: { email } });

      /*
        - If user is and user role is not admin then it will increment warningCount with +1
        - After it will add an log in adminAccessLog table
      */
      if (user && user.role !== "ADMIN") {
        await prisma.$transaction([
          prisma.user.update({
            where: { id: user.id },
            data: { warningCount: { increment: 1 } },
          }),
          prisma.adminAccessLog.create({
            data: {
              email: user.email,
              userId: user.id,
              ipAddress: getIp(request),
              userAgent: request.headers.get("user-agent"),
              status: "DENIED_ROLE",
            },
          }),
        ]);

        // Then finally it'll redirect user to /unauthorized route
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      // Check if user is banned or not (boolean)
      if (user?.isBanned) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } else {
      // There is no email in req
      await prisma.adminAccessLog.create({
        data: {
          email: null,
          userId: null,
          ipAddress: getIp(request),
          userAgent: request.headers.get("user-agent"),
          status: "DENIED_UNAUTH",
        },
      });

      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return response;
}

/*
  - This middleware runs for every page except
  - _next/static, _next/image, favicon.ico and image files
  - Can add other routes which are not to check like this |admin|admin/*|
*/
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
