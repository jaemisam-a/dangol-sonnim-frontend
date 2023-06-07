export const getOrderNumber = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}${month}${day}`;

  const min = 100000000;
  const max = 999999999;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return `ORD${formattedDate}-${randomNumber.toString()}`;
};
