import prisma from "@/lib/prisma";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function getIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) return forwarded.split(",")[0].trim();

  return request.headers.get("x-real-ip");
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

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

  // CRITICAL: Must await to refresh session
  const { data: authData } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (isAdminPath(pathname)) {
    const email = authData.user?.email ?? null;

    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });

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

        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      if (user?.isBanned) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } else {
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

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
