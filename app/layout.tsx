import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import { AlertTriangle, CheckCircle, Info, Loader2, XCircle } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Trackle",
    template: "Trackle | %s",
  },
  description:
    "Trackle is a modern personal finance and budgeting app that helps you manage transactions, set budgets, and gain AI-powered spending insights.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ReactQueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                className: "bg-gray-900 text-white border-none",
              }}
              icons={{
                success: <CheckCircle className="h-4 w-4 text-green-500" />,
                info: <Info className="h-4 w-4 text-blue-500" />,
                warning: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
                error: <XCircle className="h-4 w-4 text-red-500" />,
                loading: <Loader2 className="h-4 w-4 animate-spin text-gray-500" />,
              }}
            />
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
