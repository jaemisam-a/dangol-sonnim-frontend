import { NextApiResponse, NextApiRequest } from "next";

export type StoreData = {
  id: string;
  name: string;
  category: string;
  description: string;
  images: { src: string; alt: string }[];
  location: { address: string; shortAddress: string; detail: string };
  openHour: string;
  menus: { id: string; name: string; price: number; img: string }[];
  subs: {
    id: string;
    name: string;
    count: number;
    description: string;
    price: number;
    isMain: boolean;
    tags: string[];
  }[];
};

type StoreType = StoreData[];

const store = [
  {
    id: "jghs",
    name: "정갈한솥",
    category: "1",
    description: "“오늘 뭐먹지?” 고민 무조건 오면 해결!",
    images: [{ src: "/images/dummy/cheetah.jpg", alt: "dd" }],
    location: {
      address: "서울 구로구 디지털로26길 111 지하 1층 002호",
      shortAddress: "서울 구로구",
      detail: "서울대입구역 6번 출구에서 50m",
    },
    openHour: "10시에 영업시작",
    menus: [
      { id: "jghsmenu2314", name: "메밀막국수", price: 8500, img: "/images/dummy/pizza.png" },
      { id: "jghsmenu9098", name: "불고기비빔밥", price: 9500, img: "/images/dummy/pizza.png" },
    ],
    subs: [
      {
        id: "jghs!12314",
        name: "모든 메뉴 사이즈업",
        count: 5,
        description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
        price: 3500,
        isMain: true,
        tags: ["사이드디쉬추가", "사이즈업"],
      },
      {
        id: "jghs!4985",
        name: "계란 추가 or 새우튀김 제공(5회권)",
        count: 5,
        description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
        price: 3500,
        isMain: false,
        tags: ["사이드디쉬추가", "사이즈업"],
      },
    ],
  },
  {
    id: "tbspz",
    name: "더본즈피자",
    category: "5",
    description: "“오늘 뭐먹지?” 고민 무조건 오면 해결!",
    images: [{ src: "/images/dummy/cheetah.jpg", alt: "dd" }],
    location: {
      address: "서울 구로구 디지털로26길 111 지하 1층 002호",
      shortAddress: "서울 구로구",
      detail: "서울대입구역 6번 출구에서 50m",
    },
    openHour: "10시에 영업시작",
    menus: [
      { id: "tbspzmenu1234", name: "하와이언피자", price: 10000, img: "/images/dummy/pizza.png" },
      { id: "tbspzmenu4566", name: "포테이토피자", price: 12000, img: "/images/dummy/pizza.png" },
    ],
    subs: [
      {
        id: "tbspz!3928",
        name: "모든 메뉴 사이즈업",
        count: 5,
        description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
        price: 3500,
        isMain: true,
        tags: ["사이드디쉬추가", "사이즈업"],
      },
      {
        id: "tbspz!0909",
        name: "사이드메뉴 증정",
        count: 5,
        description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
        price: 3500,
        isMain: false,
        tags: ["사이드디쉬추가", "사이즈업"],
      },
    ],
  },
  {
    id: "mstf",
    name: "무스타파케밥",
    category: "5",
    description: "터키아저씨가 직접 만들어주는 케밥",
    images: [{ src: "/images/dummy/cheetah.jpg", alt: "dd" }],
    location: {
      address: "서울 구로구 디지털로26길 111 지하 1층 002호",
      shortAddress: "서울 구로구",
      detail: "서울대입구역 6번 출구에서 50m",
    },
    openHour: "10시에 영업시작",
    menus: [
      { id: "mstf1234", name: "되너케밥", price: 10000, img: "/images/dummy/pizza.png" },
      { id: "mstf4568", name: "항아리케밥", price: 12000, img: "/images/dummy/pizza.png" },
    ],
    subs: [
      {
        id: "mstf!3928",
        name: "모든 메뉴 사이즈업",
        count: 5,
        description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
        price: 3500,
        isMain: true,
        tags: ["사이드디쉬추가", "사이즈업"],
      },
      {
        id: "mstf!0909",
        name: "사이드메뉴 증정",
        count: 5,
        description: "쿠폰 소지시 최대 5회까지 전 메뉴 사이즈업 가능. 방문 1번당 최대 2번",
        price: 3500,
        isMain: false,
        tags: ["사이드디쉬추가", "사이즈업"],
      },
    ],
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<StoreType>) {
  res.status(200).json(store);
}
