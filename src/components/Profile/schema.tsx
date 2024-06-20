import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    //  .matches(/^[A-Za-zА-Яа-я]+$/, "В имени должны быть только буквы")
    .max(20, "Имя должно быть не более 20 символов"),
  surname: yup
    .string()
    //  .matches(/^[A-Za-zА-Яа-я]+$/, "В фамилии должны быть только буквы")
    .max(20, "Фамилия должна быть не более 20 символов"),
  email: yup
    .string()
    .email("Введите валидный email")
    .max(20, "Email должен быть не более 20 символов"),
});
