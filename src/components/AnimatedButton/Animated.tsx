import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import styles from './animated.module.scss'


export const AddButton = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(!isAdding);
  };

  return (
    <div className={styles.main}>
      <button  className={styles.button} onClick={handleClick}>Добавить</button>

     
    </div>
  );
};
