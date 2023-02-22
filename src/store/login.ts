import { create } from "zustand";

/**
 * FIXME:
 * 소셜로그인 후 로그인 상태 변경하기
 * 로그인한 유저 정보도 state로 저한
 * */

interface LoginState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const useLoginStore = create<LoginState>((set) => ({
  isLogin: false,
  login: () => set((state) => ({ isLogin: true })),
  logout: () => set((state) => ({ isLogin: false })),
}));

export default useLoginStore;
