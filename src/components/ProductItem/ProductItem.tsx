import React from "react";
import { IProductItem } from "../../types/types";
import styles from "./productitem.module.scss";
import { Button } from "../Button/Button";

interface IProductItemProps extends Omit<IProductItem, "id"> {
  onAdd: () => void;
}

export const ProductItem: React.FC<IProductItemProps> = ({
  imageUrl,
  title,
  price,
  onAdd,
}) => {
  return (
    <div className={styles.product}>
      <img src={imageUrl} alt="" />
      <span>{title}</span>
      <span className={styles.price}>{price} руб.</span>
      <div>
        <Button onClick={onAdd}>Добавить</Button>
      </div>
    </div>
  );
};
