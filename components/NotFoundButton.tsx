"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundButton() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Button asChild>
        <Link href="/">
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </Button>

      <Button variant="outline" onClick={handleGoBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Go Back
      </Button>
    </>
  );
}
