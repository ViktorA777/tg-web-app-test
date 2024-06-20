import styles from "./profilefield.module.scss";
import {
  TextField,
  StandardTextFieldProps,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { IUserDataState } from "../../../types/types";
import ClearIcon from "@mui/icons-material/Clear";

interface IProfileFieldProps extends StandardTextFieldProps {
  label: string;
  name: "name" | "surname" | "email";
  user?: string;
  isEditing?: boolean;
  control: Control<IUserDataState>;
  handleDelete: (field: string) => void;
  handleEdit: (field: string) => void;
}

export const ProfileField = ({
  label,
  name,
  user,
  isEditing,
  control,
  handleDelete,
  handleEdit,
  ...props
}: IProfileFieldProps) => {
  console.log("prop", name);
  return (
    <div className={styles.profile}>
      <label>{label}: </label>
      {isEditing ? (
        <div>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                className={styles.input}
                type="text"
                {...props}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {field.value && (
                        <IconButton onClick={() => handleDelete(name)}>
                          <ClearIcon />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
      ) : (
        <span onClick={() => handleEdit(name)} className={styles.span}>
          {user}
        </span>
      )}
    </div>
  );
};
