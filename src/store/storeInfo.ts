import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  name: string;
  category: "KOREAN" | "BUNSIK" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";
  description: string;
  roadAddr: string; // 도로명 주소
  siNm: string; // 시
  sggNm: string; // 시군구
  emdNm: string; // 읍면동
  detailedAddress: string; // 상세 주소
  businessHours: {
    weeks: string;
    hours: string;
  }[];
  tags: string[];
  registerNumber: string;

  setGlobalStoreInfo: (
    key: string,
    value: string | string[] | { weeks: string; hours: string }[]
  ) => void;

  resetStoreInfo: () => void;
}

const store = (set: any) => ({
  name: "",
  category: "KOREAN",
  description: "",
  roadAddr: "",
  siNm: "",
  sggNm: "",
  emdNm: "",
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
    value: string | string[] | { weeks: string; hours: string }[]
  ) => set(() => ({ [key]: value })),

  resetStoreInfo: () =>
    set(() => ({
      name: "",
      category: "KOREAN",
      description: "",
      roadAddr: "",
      siNm: "",
      sggNm: "",
      emdNm: "",
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
