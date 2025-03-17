import styles from "./select.module.scss";

export default function Select({
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...rest} className={styles.ctl}>
      {children}
    </select>
  );
}
