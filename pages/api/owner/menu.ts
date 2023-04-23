import axios from "axios";

type MenuDataType = {
  name: string;
  price: number;
  multipartFile: File;
};

export const getMenu = async (menuId: number) => {
  const queryKey = `/api/v1/menu/find/${menuId}`;
  const response = await axios.get(queryKey);
  return response.data;
};

export const deleteMenu = async (menuId: number) => {
  const queryKey = `/api/v1/menu/delete/${menuId}?_csrf=7c642c77-b814-462d-bb24-a0220d6f996a`;
  const response = await axios.delete(queryKey);
  return response.data;
};

export const updateMenu = async (menuData: { menuId: number } & MenuDataType) => {
  const queryKey = "/api/v1/menu/update";
  const response = await axios.put(queryKey, menuData);
  return response.data;
};

export const createMenu = async (menuData: { storeId: number } & MenuDataType) => {
  const queryKey = "/api/v1/menu/create";
  const response = await axios.post(queryKey, menuData);
  return response.data;
};
