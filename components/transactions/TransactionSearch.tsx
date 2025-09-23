"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { useDebouncedSearchParam } from "@/hooks/useDebouncedSearchParam";

export default function TransactionSearch() {
  const { setParam, searchParams } = useUpdateQueryParams();
  const search = useDebouncedSearchParam({
    initialValue: searchParams.get("query") || "",
    setParam: (val) => setParam("query", val),
    getParam: () => searchParams.get("query"),
  });

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search transactions..."
        className="pl-8"
        value={search.term}
        onChange={search.handleChange}
      />
    </>
  );
}
