import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  name: string;
  categoryType: "KOREAN" | "BUNSIK" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";
  comments: string;
  newAddress: string; // 도로명 주소
  sido: string; // 시
  sigungu: string; // 시군구
  bname1: string; // 읍면동
  detailedAddress: string; // 상세 주소
  businessHours: {
    weeks: string;
    hours: string;
  }[];
  tags: string[];
  registerNumber: string;

  setGlobalStoreInfo: (
    key: string,
    value: string | string[] | { weeks: string; hours: string }[],
  ) => void;

  resetStoreInfo: () => void;
}

const store = (set: any) => ({
  name: "",
  categoryType: "KOREAN",
  comments: "",
  newAddress: "",
  sido: "",
  sigungu: "",
  bname1: "",
  detailedAddress: "",
  businessHours: [
    {
      weeks: "",
      hours: "",
    },
  ],
  tags: [""],
  registerNumber: "",

  setGlobalStoreInfo: (
    key: string,
    value: string | string[] | { weeks: string; hours: string }[],
  ) => set(() => ({ [key]: value })),

  resetStoreInfo: () =>
    set(() => ({
      name: "",
      categoryType: "KOREAN",
      comments: "",
      newAddress: "",
      sido: "",
      sigungu: "",
      bname1: "",
      detailedAddress: "",
      businessHours: [
        {
          weeks: "",
          hours: "",
        },
      ],
      tags: [""],
      registerNumber: "",
    })),
});

const useMyStoreInfo = create<StoreState>()(addDevtools(store));

export default useMyStoreInfo;
