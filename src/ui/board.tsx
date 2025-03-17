import styles from "./board.module.scss";
import clsx from "clsx";

export type Mark = "X" | "O";
export const size = 3 * 3;

export default function Board({
  state,
  onClick,
  winner,
}: {
  state: Array<Mark | undefined>;
  onClick?: (index: number) => void;
  winner?: number[];
}) {
  return (
    <div
      className={clsx(
        styles.board,
        winner && [
          styles.winner,
          styles[state[winner[0]]!],
          styles[`variant-${winner.join("-")}`],
        ],
      )}
    >
      {state.map((item, index) => (
        <div
          key={index}
          className={clsx(styles.cell, item && styles[item])}
          onClick={item ? undefined : () => onClick?.(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
