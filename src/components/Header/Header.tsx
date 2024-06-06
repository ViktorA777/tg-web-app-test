import React from "react";
import styles from "./header.module.scss";
import { Button } from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";

export const Header: React.FC = () => {
  const { user, onClose } = useTelegram();

  return (
    <header className={styles.header}>
      <h1>HELLO</h1>
      <Button text="Закрыть" onClick={onClose} />
      <span className={styles.user}>{user}</span>
    </header>
  );
};
