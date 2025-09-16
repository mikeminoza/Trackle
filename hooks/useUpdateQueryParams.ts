"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUpdateQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  function setParam(key: string, value: string | undefined) { 
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }

  function resetParams(keys?: string[]) {
    if (keys && keys.length > 0) { 
      keys.forEach((key) => params.delete(key));
    } else { 
      params.forEach((_, key) => params.delete(key));
    }

    router.replace(`${pathname}?${params.toString()}`);
  }
  
  function hasFiltersApplied(keys?: string[]) {
    if (!keys || keys.length === 0) {
      return Array.from(searchParams.keys()).length > 0;
    }
    return keys.some((key) => searchParams.has(key));
  }

  return { setParam, searchParams, resetParams, hasFiltersApplied };
}
