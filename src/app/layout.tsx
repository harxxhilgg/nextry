import { Metadata } from "next";
import "./globals.css";
import { geist } from "@/lib/fonts";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Nextry",
  description:
    "Next.js template with supabase authentication, storage, prisma, page routes, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider attribute="class" enableSystem>
          <TooltipProvider>
            <NuqsAdapter>
              {children}
              <Analytics />
            </NuqsAdapter>
            <Toaster position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
