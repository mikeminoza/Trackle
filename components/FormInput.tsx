"use client";

import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "./ui/switch";
import { Control, FieldValues, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  variant?: "input" | "textarea" | "switch" | "password";
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  className = "text-xs lg:text-sm",
  variant = "input",
}: FormInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
            ) : variant === "password" ? (
              <div className="relative">
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={showPassword ? "text" : "password"}
                  className={className}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
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
};
