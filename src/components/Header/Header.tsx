import React from "react";
import styles from "./header.module.scss";
import { Button } from "../Button/Button";
import { tg } from "../../App";

export const Header: React.FC = () => {
  const onClose = () => {
    tg.close();
  };

  return (
    <header className={styles.header}>
      <Button text="Закрыть" onClick={onClose} />
      <span className={styles.user}>{tg.initDataUnsafe?.user?.username}</span>
    </header>
  );
};
