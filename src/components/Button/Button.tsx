import styles from "./button.module.scss";

interface TButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button: React.FC<TButtonProps> = ({ props, text }: any) => {
  return (
    <button {...props} className={styles.button}>
      {text}
    </button>
  );
};
