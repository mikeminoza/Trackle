import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorAiInsights() {
  return (
    <Alert variant="destructive" className="border-red-500/50">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <div>
        <AlertTitle className="text-sm font-medium">Error</AlertTitle>
        <AlertDescription className="text-xs">
          Couldn’t load insights. Please try again later.
        </AlertDescription>
      </div>
    </Alert>
  );
}
