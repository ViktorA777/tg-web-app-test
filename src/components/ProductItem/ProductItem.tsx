import React from "react";
import { IProductItem } from "../../types/types";

// import { Button } from "../Button/Button";
import { Button } from "@mui/material";

import styles from "./productitem.module.scss";

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
      <div className={styles.btn}>
        <Button variant="contained" onClick={onAdd}>
          Добавить
        </Button>
      </div>
    </div>
  );
};
