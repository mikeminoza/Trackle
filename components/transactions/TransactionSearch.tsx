"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function TransactionSearch() {
  const { setParam, searchParams } = useUpdateQueryParams();
  const [term, setTerm] = useState(() => searchParams.get("query") || "");

  const debouncedSetParam = useDebouncedCallback((value: string) => {
    const current = searchParams.get("query") || undefined;
    if (value !== current) {
      setParam("query", value || undefined);
    }
  }, 400);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    debouncedSetParam(e.target.value);
  };

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search transactions..."
        className="pl-8"
        value={term}
        onChange={handleChange}
      />
    </>
  );
}
