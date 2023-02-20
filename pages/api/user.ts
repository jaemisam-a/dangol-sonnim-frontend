import { NextApiRequest, NextApiResponse } from "next";

type paymentType = { price: number; paymentDate: string; frequency: number };

type userType = {
  id: string;
  nickname: string;
  loginInfo: string;
  avatar: string;
  phone: string;
  pick: string[];
  subs: { storeId: string; subsId: string; useCount: number; lastPayDate: string }[];
  paymentHistory: {
    storeId: string;
    subsId: string;
    prevPayment: paymentType[];
    nextPayment: paymentType;
  }[];
  recentQuery: string[];
  defaultLocation: string;
}[];

const user = [
  {
    id: "cheetahmom!1234",
    nickname: "치타맘",
    loginInfo: "kakao",
    avatar: "/images/dummy/cheetah.jpg",
    phone: "01012345678",
    pick: ["jghs", "mstf"],
    subs: [
      { storeId: "jghs", subsId: "jghs!12314", useCount: 2, lastPayDate: "2023-02-10" },
      { storeId: "tbspz", subsId: "tbspz!3928", useCount: 3, lastPayDate: "2023-02-20" },
    ],
    paymentHistory: [
      {
        storeId: "jghs",
        subsId: "jghs!12314",
        prevPayment: [
          { price: 3500, paymentDate: "2022-12-12", frequency: 1 },
          { price: 3500, paymentDate: "2022-01-12", frequency: 2 },
        ],
        nextPayment: { price: 3500, paymentDate: "2022-02-12", frequency: 3 },
      },
      {
        storeId: "tbspz",
        subsId: "tbspz!3928",
        prevPayment: [
          { price: 3500, paymentDate: "2022-12-12", frequency: 1 },
          { price: 3500, paymentDate: "2022-01-12", frequency: 2 },
        ],
        nextPayment: { price: 3500, paymentDate: "2022-02-12", frequency: 3 },
      },
    ],
    recentQuery: ["사이드 디쉬", "파스타", "김밥"],
    defaultLocation: "guro231!",
  },
  {
    id: "hoochoolove",
    nickname: "후추추",
    loginInfo: "naver",
    avatar: "/images/dummy/cheetah.jpg",
    phone: "01123456666",
    pick: ["tbspz", "mstf"],
    subs: [
      { storeId: "jghs", subsId: "jghs!12314", useCount: 2, lastPayDate: "2023-02-10" },
      { storeId: "tbspz", subsId: "tbspz!3928", useCount: 3, lastPayDate: "2023-02-20" },
    ],
    paymentHistory: [
      {
        storeId: "jghs",
        subsId: "jghs!12314",
        prevPayment: [
          { price: 3500, paymentDate: "2022-12-12", frequency: 1 },
          { price: 3500, paymentDate: "2022-01-12", frequency: 2 },
        ],
        nextPayment: { price: 3500, paymentDate: "2022-02-12", frequency: 3 },
      },
      {
        storeId: "tbspz",
        subsId: "tbspz!3928",
        prevPayment: [
          { price: 3500, paymentDate: "2022-12-12", frequency: 1 },
          { price: 3500, paymentDate: "2022-01-12", frequency: 2 },
        ],
        nextPayment: { price: 3500, paymentDate: "2022-02-12", frequency: 3 },
      },
    ],
    recentQuery: ["사이드 디쉬", "파스타", "김밥"],
    defaultLocation: "gangnam2312",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<userType>) {
  res.status(200).json(user);
}
