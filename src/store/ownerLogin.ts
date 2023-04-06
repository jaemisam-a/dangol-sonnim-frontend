import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const store = (set: any) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
});

const useOwnerLoginStore = create<StoreState>()(addDevtools(store));

export default useOwnerLoginStore;
