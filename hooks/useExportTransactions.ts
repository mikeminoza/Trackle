"use client";

import { AxiosError } from "axios";
import { AxiosInstance } from "@/lib/axios";
import { useState } from "react";

type ExportFormat = "xlsx" | "json";

interface ExportError {
  message: string;
  status?: number;
}

export function useExportTransactions() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportTransactions = async (userId: string, format: ExportFormat = "xlsx") => {
    if (!userId) {
      setError("User ID is missing.");
      return;
    }

    try {
      setIsExporting(true);
      setError(null);

      const response = await AxiosInstance.get<Blob>("/export", {
        params: { userId, format },
        responseType: "blob",
        validateStatus: (status) => status < 500,
      });

      if (response.status === 204) {
        return { success: false, empty: true };
      }

      if (response.status !== 200 || !response.data || response.data.size === 0) {
        setError("Failed to export transactions.");
        return { success: false };
      }

      const mimeType =
        format === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/json";

      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `transactions_${new Date().toISOString().slice(0, 10)}.${format}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<ExportError>;
      if (err.response) {
        if (err.response.status === 404) {
          setError("No transactions found to export.");
        } else {
          setError(err.response.data?.message || "Failed to export transactions.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
      return { success: false };
    } finally {
      setIsExporting(false);
    }
  };

  return { exportTransactions, isExporting, error };
}
