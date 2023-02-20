import { NextApiRequest, NextApiResponse } from "next";

type CategoryType = {
  id: string;
  name: string;
}[];

const category = [
  { id: "1", name: "한식" },
  { id: "2", name: "분식" },
  { id: "3", name: "중식" },
  { id: "4", name: "일식" },
  { id: "5", name: "양식" },
  { id: "6", name: "카페" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<CategoryType>) {
  res.status(200).json(category);
}
