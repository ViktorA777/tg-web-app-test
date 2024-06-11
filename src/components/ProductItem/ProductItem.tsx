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
      <div>
        <img src={imageUrl} alt="" />
      </div>
      <div>{title}</div>
      <div>
        <span className={styles.price}>{price} руб.</span>
      </div>
      <Button onClick={onAdd}>Добавить</Button>
    </div>
  );
};
