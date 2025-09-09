import { XCircle } from "lucide-react";

export default function NoResults({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <XCircle className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold mb-2">{message ?? "No results found"}</h3>
      <p className="text-sm text-gray-500 max-w-xs">
        Try adjusting your filters or search to find what you’re looking for.
      </p>
    </div>
  );
}
