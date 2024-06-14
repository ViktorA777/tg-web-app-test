import styles from "./button.module.scss";

interface TButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button = (props: TButtonProps) => {
  return <button {...props} className={styles.button} />;
};
