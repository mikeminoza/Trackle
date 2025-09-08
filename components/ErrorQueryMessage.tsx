import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function ErrorQueryMessage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-6">
      <div className="flex items-center justify-center rounded-full">
        <AlertCircle className="w-10 h-10 text-red-400" />
      </div>
      <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
      <Button
        className="mt-4 px-6 py-3  font-semibold rounded-lg transition"
        onClick={() => router.push("/")}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
