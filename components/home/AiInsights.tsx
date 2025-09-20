"use client";

import { InsightsPayload } from "@/types/ai";
import { AiInsight as AiInsightType } from "@/types/db";
import { useAiInsightQuery } from "@/lib/queries/useAiInsightQuery";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getAlertVariant } from "@/lib/utils/getAlertVariant";
import { MotionEffect } from "../animate-ui/effects/motion-effect";
import AiInsightSkeleton from "../skeletons/AiInsightSkeleton";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useInsightsStore } from "@/store/useInsightStore";
import ErrorAiInsights from "../ErrorAiInsights";

interface AiInsightsProps {
  userId?: string;
  payload: InsightsPayload;
}

export default function AiInsight({ userId, payload }: AiInsightsProps) {
  const { visible, toggle } = useInsightsStore();

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
  if (isLoading) return <AiInsightSkeleton />;
  if (isError) return <ErrorAiInsights />;

  return (
    <div className="space-y-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="flex items-center ml-auto h-6 w-auto px-2 py-1 text-xs gap-1"
      >
        {visible ? (
          <>
            <EyeOff className="w-3 h-3" />
            <span>Hide Insights</span>
          </>
        ) : (
          <>
            <Eye className="w-3 h-3" />
            <span>Show Insights</span>
          </>
        )}
      </Button>

      {/* Insights list */}
      {visible && (
        <div className="space-y-3">
          {insights?.map((insight: AiInsightType, index: number) => {
            const { variant, Icon } = getAlertVariant(insight.type);

            return (
              <MotionEffect
                key={index}
                slide={{ direction: "down" }}
                fade
                zoom
                inView
                delay={0.2 + index * 0.1}
              >
                <Alert variant={variant} className="relative pr-10">
                  <Icon className="w-5 h-5" />
                  <AlertDescription>{insight.message}</AlertDescription>
                </Alert>
              </MotionEffect>
            );
          })}
        </div>
      )}
    </div>
  );
}
