import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const getInitialIsLogin = () => {
  if (typeof window !== "undefined") {
    const storedIsLogin = window.localStorage.getItem("isUserLogin");
    return storedIsLogin === "true";
  }
  return false;
};

const store = (set: any) => ({
  isLogin: getInitialIsLogin,
  login: () => {
    window.localStorage.setItem("isUserLogin", "true");
    set(() => ({ isLogin: true }));
  },
  logout: () => {
    window.localStorage.setItem("isUserLogin", "false");
    window.localStorage.removeItem("userAccessToken");
    set(() => ({ isLogin: false }));
  },
});

const useLoginStore = create<StoreState>()(addDevtools(store));

export default useLoginStore;
