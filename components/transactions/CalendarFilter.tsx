"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";

export default function CalendarFilter() {
  const [open, setOpen] = React.useState(false);
  const { setParam, searchParams } = useUpdateQueryParams();

  const dateParam = searchParams.get("date") ?? undefined;
  const parsedDate = dateParam ? new Date(dateParam) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between font-normal">
          {parsedDate ? parsedDate.toLocaleDateString() : "Filter by date"}
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={parsedDate}
          captionLayout="dropdown"
          onSelect={(d) => {
            setParam("date", d ? d.toISOString().split("T")[0] : undefined);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
