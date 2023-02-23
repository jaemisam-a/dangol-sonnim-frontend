import { create } from "zustand";

import addDevtools from "src/store/devtools";

/**
 * FIXME:
 * 소셜로그인 후 로그인 상태 변경하기
 * 로그인한 유저 정보도 state로 저한
 * */

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

const useLoginStore = create<StoreState>()(addDevtools(store));

export default useLoginStore;
