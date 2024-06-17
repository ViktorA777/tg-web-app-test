import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuIcon from "@mui/icons-material/Menu";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import styles from "./navigation.module.scss";

export const Navigation = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.navbar}>
      <Tabs value={value} onChange={handleChange}>
        <Tab component={Link} to="/" icon={<MenuIcon fontSize="large" />} />
        <Tab
          component={Link}
          to="/profile"
          icon={<AccountBoxIcon fontSize="large" />}
        />
        <Tab
          component={Link}
          to="/form"
          icon={<LocalPostOfficeIcon fontSize="large" />}
        />
      </Tabs>
    </div>
  );
};
