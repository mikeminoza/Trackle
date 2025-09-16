import { AvailableYear } from "@/types/dashboard";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface YearFilterProps {
  availableYears: AvailableYear[];
  selectedYear: number | null;
}

export default function YearFilter({ availableYears, selectedYear }: YearFilterProps) {
  const { setParam, searchParams } = useUpdateQueryParams();
  const currentYear = searchParams.get("year") || selectedYear?.toString();

  return (
    <div className="w-full">
      <Select value={String(currentYear)} onValueChange={(val) => setParam("year", val)}>
        <SelectTrigger className="w-full justify-center text-center">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {availableYears?.map((y) => (
            <SelectItem key={y.year} value={String(y.year)} className="text-center">
              {y.year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
