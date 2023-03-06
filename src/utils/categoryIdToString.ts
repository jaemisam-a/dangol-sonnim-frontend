const categoryIdToString = (categoryId: string): string => {
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

export default categoryIdToString;
