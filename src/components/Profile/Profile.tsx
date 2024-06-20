import { useState } from "react";
import styles from "./profile.module.scss";
import {
  Avatar,
  Button,

} from "@mui/material";

import { IEditField, IUserDataState } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { schema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileField } from "./ProfileField/ProfileField";

export const Profile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<IUserDataState>({
    name: "",
    surname: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState<IEditField>({
    name: true,
    surname: true,
    email: true,
  });

  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<IUserDataState>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IUserDataState> = (data) => {
    const updatedData: Partial<IUserDataState> = {};
    const updatedEditing: Partial<IEditField> = {};

    for (const key in data) {
      if (
        isEditing[key as keyof IEditField] &&
        data[key as keyof IUserDataState] !==
          formData[key as keyof IUserDataState]
      ) {
        updatedData[key as keyof IUserDataState] =
          data[key as keyof IUserDataState];
        updatedEditing[key as keyof IEditField] = false;
      } else {
        updatedEditing[key as keyof IEditField] =
          isEditing[key as keyof IEditField];
      }
    }

    setFormData((prevData) => ({ ...prevData, ...updatedData }));
    setIsEditing((prev) => ({ ...prev, ...updatedEditing }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleEdit = (field: string) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };

  const handleDelete = (field: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: "" }));
    setIsEditing({ ...isEditing, [field]: true });
    setValue(field as keyof IUserDataState, "");
    clearErrors(field as keyof IUserDataState);
  };

  const { name, surname, email } = formData;

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.content}>
        <ProfileField
          control={control}
          name={"name"}
          label="Имя"
          user={name}
          isEditing={isEditing.name}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          placeholder="Введите имя"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <ProfileField
          control={control}
          name="surname"
          label="Фамилия"
          user={surname}
          isEditing={isEditing.surname}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          placeholder="Введите фамилию"
          error={!!errors.surname}
          helperText={errors.surname?.message}
        />
        <ProfileField
          control={control}
          name="email"
          label="Email"
          user={email}
          isEditing={isEditing.email}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          placeholder="Введите email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Button variant="contained" type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  );
};
