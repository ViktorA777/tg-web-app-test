import { IProductItem } from "../types/types";

export const getTotalPrice = (items: IProductItem[]) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};
