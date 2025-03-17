import styles from "./board.module.scss";
import clsx from "clsx";

export type Mark = "X" | "O";
export const size = 3 * 3;

export default function Board({
  state,
  onClick,
}: {
  state: Array<Mark | undefined>;
  onClick: (index: number) => void;
}) {
  return (
    <div className={styles.board}>
      {state.map((item, index) => (
        <div
          key={index}
          className={clsx(styles.cell, item && styles[item])}
          onClick={item ? undefined : () => onClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
