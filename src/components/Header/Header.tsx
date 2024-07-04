import React, { useState } from "react";
import styles from "./header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Navigation } from "../Navigation/Navigation";

const dataForMainNavigation = [
  { icon: <MenuIcon fontSize="large" />, to: "/", id: 1 },
  { icon: <AccountBoxIcon fontSize="large" />, to: "/profile", id: 2 },
  { icon: <LocalPostOfficeIcon fontSize="large" />, to: "/form", id: 3 },
];

export const Header: React.FC = () => {
  const [mainNavigationValue, setMainNavigationValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setMainNavigationValue(newValue);
  };

  return (
    <header className={styles.header}>
      <Navigation
        data={dataForMainNavigation}
        onChange={handleChange}
        value={mainNavigationValue}
      />
    </header>
  );
};
