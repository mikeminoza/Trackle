import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "./ui/switch";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  variant?: "input" | "textarea" | "switch";
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  className = "text-xs lg:text-sm",
  variant = "input",
}: FormInputProps<T>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="w-full flex-1">
        {label && <FormLabel className="text-xs ms-1">{label}</FormLabel>}
        <FormControl>
          {variant === "textarea" ? (
            <Textarea {...field} placeholder={placeholder} className={className} />
          ) : variant === "switch" ? (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              className={className}
            />
          ) : (
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              className={className}
              onChange={(e) => {
                const value = e.target.value;
                if (type === "number") {
                  field.onChange(value === "" ? "" : Number(value));
                } else {
                  field.onChange(value);
                }
              }}
              value={field.value}
            />
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
