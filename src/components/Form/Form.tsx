import React, { useEffect, useState } from "react";
import styles from "./form.module.scss";
import { useTelegram } from "../../hooks/useTelegram";

export const Form: React.FC = () => {
  const [country, setCountry] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [subject, setSubject] = useState<string>("physical");

  const { tg } = useTelegram();

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
  };

  const handleChangeSubject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value);
  };

  return (
    <div className={styles.form}>
      <h3>Введите ваши данные </h3>
      <input
        className={styles.input}
        type="text"
        placeholder="Страна"
        value={country}
        onChange={handleChangeCountry}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Улица"
        value={street}
        onChange={handleChangeStreet}
      />
      <select
        value={subject}
        onChange={handleChangeSubject}
        className={styles.select}
        name=""
        id=""
      >
        <option value="physical">Физ. Лицо</option>
        <option value="legal">Юр. Лицо</option>
      </select>
    </div>
  );
};
