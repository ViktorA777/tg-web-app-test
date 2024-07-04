import { IProductItem } from "../types/types";
import { instanse } from "./instance";

export const getProducts = async () => {
  const { data } = await instanse.get<IProductItem[]>("/foods");

  return data;
};
