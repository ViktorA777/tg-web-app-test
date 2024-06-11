import styles from "./button.module.scss";

interface TButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<TButtonProps> = (props) => {
  return <button {...props} className={styles.button} />;
};
