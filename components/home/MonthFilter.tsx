"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { months } from "@/constants/months";

interface MonthFilterProp {
  selectedMonth: number | null;
}

export default function MonthFilter({ selectedMonth }: MonthFilterProp) {
  const { searchParams, setParam } = useUpdateQueryParams();
  const month = searchParams.get("month") || selectedMonth?.toString();
  console.log(selectedMonth);
  return (
    <Select value={String(month)} onValueChange={(val) => setParam("month", val)}>
      <SelectTrigger className="justify-center text-center">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        {months.map((m) => (
          <SelectItem key={m.value} value={m.value} className="text-center">
            {m.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
