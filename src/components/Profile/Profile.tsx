import React, { useState } from "react";
import styles from "./profile.module.scss";
import { Button } from "../Button/Button";
import { Avatar } from "@mui/material";

export interface IProfile {
  id: string;
  title: string;
}

export const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editField, setEditField] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
  });

  const handleEdit = (field: string) => {
    setEditField(field);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveChanges = () => {
    setEditField("");
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <Avatar
          src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
          onClick={() => document.getElementById("fileInput")?.click()}
        />
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={handleFileChange}
        />
      </div>
      <h2>Мой профиль</h2>
      <div className={styles.content}>
        <div className={styles.profile}>
          <div>
            Имя:{" "}
            {editField !== "name" ? (
              <span className={styles.name}>{userData.name}</span>
            ) : (
              <input
                className={styles.input}
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            )}
          </div>
          <Button onClick={() => handleEdit("name")}>Изменить</Button>
        </div>
        <div className={styles.profile}>
          <div>
            Фамилия:{" "}
            {editField !== "surname" ? (
              <span className={styles.name}>{userData.surname}</span>
            ) : (
              <input
                className={styles.input}
                type="text"
                name="surname"
                value={userData.surname}
                onChange={handleChange}
              />
            )}
          </div>
          <Button onClick={() => handleEdit("surname")}>Изменить</Button>
        </div>
        <div className={styles.profile}>
          <div>
            Email:{" "}
            {editField !== "email" ? (
              <span className={styles.name}>{userData.email}</span>
            ) : (
              <input
                className={styles.input}
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            )}
          </div>
          <Button onClick={() => handleEdit("email")}>Изменить</Button>
        </div>
      </div>
      {editField && <Button onClick={saveChanges}>Сохранить</Button>}
    </div>
  );
};
