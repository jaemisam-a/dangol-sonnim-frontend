import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}
const getInitialIsLogin = () => {
  if (typeof window !== "undefined") {
    const storedIsLogin = window.localStorage.getItem("isLogin");
    return storedIsLogin === "true";
  }
  return false;
};

const store = (set: any) => ({
  isLogin: getInitialIsLogin(),
  login: () => {
    window.localStorage.setItem("isLogin", "true");
    set(() => ({ isLogin: true }));
  },
  logout: () => {
    window.localStorage.setItem("isLogin", "false");
    window.localStorage.setItem("accessToken", "");
    set(() => ({ isLogin: false }));
  },
});

const useOwnerLoginStore = create<StoreState>()(addDevtools(store));

export default useOwnerLoginStore;
