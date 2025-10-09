import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { categories } from "@/constants/categories";
import { useState } from "react";

export default function CategoryFilter({
  value,
  type,
  onChange,
}: {
  value: string;
  type: "income" | "expense" | "all";
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const filteredCategories =
    type === "all" ? categories : categories.filter((c) => c.type === type);
  const selected = filteredCategories.find((c) => c.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected ? selected.label : "Select category..."}
          <ChevronsUpDown className="opacity-50 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {filteredCategories.map((cat) => (
                <CommandItem
                  key={`${cat.type}-${cat.value}`}
                  value={cat.value}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    onChange?.(currentValue);
                  }}
                >
                  {cat.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === cat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
