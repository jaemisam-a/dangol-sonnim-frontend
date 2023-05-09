import { create } from "zustand";

import addDevtools from "src/store/devtools";

/** 사장님 페이지의 현재 선택된 가게를 전역변수로 지정 */
type StoreState = {
  currentStoreId: string;
  setCurrentStoreId: (storeId: string) => void;
};

const store = (set: any) => ({
  currentStoreId: "",
  setCurrentStoreId: (storeId: string) => set(() => ({ currentStoreId: storeId })),
});

const useCurrentStore = create<StoreState>()(addDevtools(store));

export default useCurrentStore;
