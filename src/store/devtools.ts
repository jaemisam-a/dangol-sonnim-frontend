import { devtools } from "zustand/middleware";

const addDevtools = (store: (set: any) => any) => {
  const storeWithDevTools = process.env.NODE_ENV === "development" ? devtools(store) : store;
  return storeWithDevTools;
};

export default addDevtools;
