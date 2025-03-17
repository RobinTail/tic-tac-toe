import styles from "./button.module.scss";

export default function Button({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={styles.btn}>
      {children}
    </button>
  );
}
