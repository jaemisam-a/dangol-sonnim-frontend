export const categories = [
  { id: "KOREAN", name: "한식" },
  { id: "BUNSIK", name: "분식" },
  { id: "CHINESE", name: "중식" },
  { id: "JAPANESE", name: "일식" },
  { id: "WESTERN", name: "양식" },
  { id: "CAFE", name: "카페" },
];

type CategoryType = "KOREAN" | "BUNSIK" | "CHINESE" | "JAPANESE" | "WESTERN" | "CAFE";

export const categoryIdToString = (categoryId: CategoryType): string => {
  switch (categoryId) {
    case "KOREAN":
      return "한식";
    case "BUNSIK":
      return "분식";
    case "CHINESE":
      return "중식";
    case "JAPANESE":
      return "일식";
    case "WESTERN":
      return "양식";
    default:
      return "카페";
  }
};
