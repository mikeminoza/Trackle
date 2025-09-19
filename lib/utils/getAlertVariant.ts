import { InsightType, VariantConfig } from "@/types/ai";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

const insightVariantMap: Record<InsightType, VariantConfig> = {
  success: { variant: "success", Icon: CheckCircle },
  warning: { variant: "destructive", Icon: AlertTriangle },
  info: { variant: "default", Icon: Info },
};

export const getAlertVariant = (type: InsightType | string): VariantConfig => {
  return insightVariantMap[type as InsightType] ?? insightVariantMap.info;
};
