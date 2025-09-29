import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import NotFoundButton from "@/components/NotFoundButton";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased bg-background text-foreground flex items-center justify-center min-h-screen`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <main className="flex flex-col items-center text-center px-6">
            <div className="rounded-full bg-destructive/10 p-6">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>

            <h1 className="mt-6 text-7xl font-extrabold tracking-tight text-primary">404</h1>

            <p className="mt-4 text-lg text-muted-foreground max-w-md">
              Oops! The page you’re looking for doesn’t exist or may have been moved.
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <NotFoundButton />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
