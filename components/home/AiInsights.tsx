"use client";

import React from "react";
import { InsightsPayload } from "@/types/ai";
import { AiInsight as AiInsightType } from "@/types/db";
import { useAiInsightQuery } from "@/lib/queries/useAiInsightQuery";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAlertVariant } from "@/lib/utils/getAlertVariant";

interface AiInsightsProps {
  userId?: string;
  payload: InsightsPayload;
}

export default function AiInsight({ userId, payload }: AiInsightsProps) {
  const hasPayloadData =
    payload &&
    (payload.financialSummary ||
      payload.aggregates ||
      payload.spendingBreakdown ||
      payload.budgets);

  const {
    data: insights,
    isLoading,
    isError,
  } = useAiInsightQuery(userId, payload, {
    enabled: !!userId && !!hasPayloadData,
  });

  if (!userId || !hasPayloadData) return null;
  if (isLoading || isError) return;

  return (
    <div className="space-y-3">
      {insights?.map((insight: AiInsightType, index: number) => {
        const { variant, Icon } = getAlertVariant(insight.type);

        return (
          <Alert key={index} variant={variant}>
            <Icon className="w-5 h-5" />
            <AlertDescription>{insight.message}</AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}
