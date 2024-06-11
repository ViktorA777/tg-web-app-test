import React, { useCallback, useEffect, useState } from "react";
import { getProducts } from "../../api/productService";
import { ProductItem } from "../ProductItem/ProductItem";
import { useQuery } from "@tanstack/react-query";
import styles from "./product.module.scss";
import { IProductItem } from "../../types/types";
import { useTelegram } from "../../hooks/useTelegram";
import { getTotalPrice } from "../../utils/utils";
import axios from "axios";

export const ProductList: React.FC = () => {
  const [addedProducts, setAddedProducts] = useState<IProductItem[]>([]);

  const { tg } = useTelegram();

  const { data } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  //   const onSendData = useCallback(() => {
  //     const dataForSend = {
  //       products: addedProducts,
  //       totalPrice: getTotalPrice(addedProducts),
  //       queryId
  //     };
  //     axios.post("http://localhost:5173", JSON.stringify(dataForSend), {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   }, []);

  //   useEffect(() => {
  //     tg.onEvent("mainButtonClicked", onSendData);

  //     return () => {
  //       tg.offEvent("mainButtonClicked", onSendData);
  //     };
  //   }, [onSendData]);

  const onAdd = (product: IProductItem) => {
    const alreadyAdded = addedProducts.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedProducts.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedProducts, product];
    }

    setAddedProducts(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div className={styles.list}>
      {data?.map((item) => (
        <ProductItem
          key={item.id}
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
          onAdd={() => onAdd(item)}
        />
      ))}
    </div>
  );
};
