import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InsightsState {
  visible: boolean;
  toggle: () => void;
  setVisible: (value: boolean) => void;
}

export const useInsightsStore = create<InsightsState>()(
  persist(
    (set) => ({
      visible: true,
      toggle: () => set((state) => ({ visible: !state.visible })),
      setVisible: (value) => set({ visible: value }),
    }),
    {
      name: "insights-visibility",
    }
  )
);
