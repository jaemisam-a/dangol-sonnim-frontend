import axios from "axios";

type addSubsCouponType = {
  type: "COUNT" | "MONTHLY";
  name: string;
  price: number;
  storeId: number;
  intro: string;
  isTop: boolean;
  useCount: number;
};

export const addSubsCoupon = async ({
  type,
  name,
  price,
  storeId,
  intro,
  isTop,
  useCount,
}: addSubsCouponType) => {
  const queryKey = "/api/v1/subscribe?_csrf=1a67078d-a408-4c37-ac89-b6e157b6b524";
  const response = await axios.post(queryKey, {
    type,
    name,
    price,
    storeId,
    intro,
    isTop,
    useCount,
    benefits: [{ description: "" }],
  });
  return response.data;
};

export const deleteSubs = async ({ subscribeId }: { subscribeId: number }) => {
  const queryKey = `/api/v1/subscribe/${subscribeId}`;
  const response = await axios.delete(queryKey);
  return response.data;
};
