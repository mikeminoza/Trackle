import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface UseDebouncedSearchParamsOptions {
  initialValue?: string;
  delay?: number;
  setParam: (value?: string) => void;
  getParam: () => string | null;
}

export function useDebouncedSearchParam({
  initialValue = "",
  delay = 400,
  setParam,
  getParam,
}: UseDebouncedSearchParamsOptions) {
  const [term, setTerm] = useState(initialValue);

  const debouncedSetParam = useDebouncedCallback((value: string) => {
    const current = getParam() || undefined;
    if (value !== current) {
      setParam(value || undefined);
    }
  }, delay);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    debouncedSetParam(e.target.value);
  };

  return { term, handleChange, setTerm };
}
