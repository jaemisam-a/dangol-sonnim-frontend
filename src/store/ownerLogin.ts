import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

const getInitialIsLogin = () => {
  if (typeof window !== "undefined") {
    const storedIsLogin = window.localStorage.getItem("isOwnerLogin");
    return storedIsLogin === "true";
  }
  return false;
};

const store = (set: any) => ({
  isLogin: getInitialIsLogin(),
  login: () => {
    window.localStorage.setItem("isOwnerLogin", "true");
    set(() => ({ isLogin: true }));
  },
  logout: () => {
    window.localStorage.setItem("isOwnerLogin", "false");
    window.localStorage.removeItem("ownerAccessToken");
    set(() => ({ isLogin: false }));
  },
});

const useOwnerLoginStore = create<StoreState>()(addDevtools(store));

export default useOwnerLoginStore;
