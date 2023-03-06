import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  selectedSubs: string[];
  selectSubs: (subs: string[]) => void;
  deselectSubs: () => void;
}

const store = (set: any) => ({
  selectedSubs: [],
  selectSubs: (subs: string[]) => set(() => ({ selectedSubs: subs })),
  deselectSubs: () => set(() => ({ selectedSubs: [] })),
});

const usePaymentStore = create<StoreState>()(addDevtools(store));

export default usePaymentStore;
