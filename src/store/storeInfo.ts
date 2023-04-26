import { create } from "zustand";

import addDevtools from "src/store/devtools";

interface StoreState {
  name: string;
  category: string;
  description: string;
  roadAddr: string;
  siNm: string;
  sggNm: string;
  emdNm: string;
  detailedAddress: string;
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
