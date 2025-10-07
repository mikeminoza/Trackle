"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        <h1 className="text-2xl font-semibold">Authentication Error</h1>
        <p className="text-muted-foreground">
          Something went wrong while signing you in. Please try again or use another login method.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">Back to Login</Button>
          </Link>
          <Link href="/" className="w-full">
            <Button variant="outline" className="w-full">
              Go to Homepage
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Error Code: <span className="font-mono text-destructive">auth-code-error</span>
        </p>
      </div>
    </div>
  );
}
