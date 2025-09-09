"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function TransactionSearch() {
  const [term, setTerm] = useState("");
  const [debouncedTerm] = useDebounce(term, 400);
  const { setParam, searchParams } = useUpdateQueryParams();

  useEffect(() => {
    const existing = searchParams.get("query") || "";
    setTerm(existing);
  }, [searchParams]);

  useEffect(() => {
    setParam("query", debouncedTerm || undefined);
  }, [debouncedTerm, setParam]);

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search transactions..."
        className="pl-8"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </>
  );
}
