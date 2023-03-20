import { create } from "zustand";

import addDevtools from "src/store/devtools";

/**
 * ToastUI 생성
 * message에 값이 생기면 toastUI가 나타남
 * 이후 확인버튼 클릭 시 사라짐
 * type으로 warning icon을 넣고 뺼 수 있음
 */

type MessageType = "info" | "warning";

interface StoreState {
  message: string;
  type?: MessageType;
  setMessage: (message: string, type?: MessageType) => void;
}
const store = (set: any) => ({
  message: "",
  setMessage: (message: string, type?: MessageType) => set(() => ({ message, type })),
});

const useToastStore = create<StoreState>()(addDevtools(store));

export default useToastStore;
