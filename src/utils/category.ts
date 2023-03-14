export const categories = [
  { id: "1", name: "한식" },
  { id: "2", name: "분식" },
  { id: "3", name: "중식" },
  { id: "4", name: "일식" },
  { id: "5", name: "양식" },
  { id: "6", name: "카페" },
];

export const categoryIdToString = (categoryId: string): string => {
  switch (categoryId) {
    case "1":
      return "한식";
    case "2":
      return "분식";
    case "3":
      return "중식";
    case "4":
      return "일식";
    case "5":
      return "양식";
    default:
      return "기타";
  }
};
