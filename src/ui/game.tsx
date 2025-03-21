"use client";

import Board from "@/ui/board";
import Button from "@/ui/button";
import Select from "@/ui/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { findMove, getWinner, Mark } from "@/lib/logic";
import styles from "./game.module.scss";

type Role = "human" | "computer";

const clean = () => Array<Mark | undefined>(9).fill(undefined);

export default function Game() {
  const [board, setBoard] = useState(clean);
  const [players, setPlayers] = useState<Record<Mark, Role>>({
    X: "human",
    O: "computer",
  });
  const [player, setPlayer] = useState<Mark>("X");

  const reset = () => setBoard(clean);

  const moves = useMemo(
    () =>
      board
        .map((value, index) => (value ? undefined : index))
        .filter((index) => index !== undefined),
    [board],
  );

  const winner = useMemo(() => getWinner(board), [board]);

  const isGameOver = useMemo(
    () => winner || moves.length === 0,
    [moves.length, winner],
  );

  const switchPlayer = useCallback(
    () => setPlayer((current) => (current === "X" ? "O" : "X")),
    [],
  );

  const makeMove = useCallback(
    (index: number) => {
      setBoard((current) =>
        current.map((value, position) => (index === position ? player : value)),
      );
      switchPlayer();
    },
    [player, switchPlayer],
  );

  useEffect(() => {
    if (players[player] === "human" || isGameOver) return;
    makeMove(findMove(player, board, moves));
  }, [board, isGameOver, makeMove, moves, player, players]);

  return (
    <>
      <div className={styles.controls}>
        <Button onClick={reset}>Reset</Button>
        <Select
          onChange={(event) => {
            setPlayers({ X: players.X, O: event.target.value as Role });
            reset();
          }}
        >
          {(["computer", "human"] satisfies Role[]).map((role) => (
            <option key={role} value={role}>
              Playing with {role}
            </option>
          ))}
        </Select>
      </div>
      <Board
        state={board}
        winner={winner}
        onClick={
          players[player] === "human" && !isGameOver ? makeMove : undefined
        }
      />
    </>
  );
}
