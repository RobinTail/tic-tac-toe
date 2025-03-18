import type { Field } from "@/lib/logic";
import clsx from "clsx";
import styles from "./board.module.scss";

export default function Board({
  state,
  onClick,
  winner,
}: {
  state: Field;
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
