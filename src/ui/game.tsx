"use client";

import Board, { Mark, size } from "@/ui/board";
import { useCallback, useEffect, useState } from "react";
import { findMove } from "@/lib/competitor";

type Role = "human" | "computer";

const clean = () => Array<Mark | undefined>(size).fill(undefined);

export default function Game() {
  const [board, setBoard] = useState(clean);
  const [players] = useState<Record<Mark, Role>>({ X: "human", O: "computer" });
  const [player, setPlayer] = useState<Mark>("X");

  const reset = () => setBoard(clean);

  const switchPlayer = useCallback(
    () => setPlayer((current) => (current === "X" ? "O" : "X")),
    [],
  );

  const makeMove = useCallback(
    (index: number) => {
      setBoard((current) => {
        current[index] = player;
        return current;
      });
      switchPlayer();
    },
    [player, switchPlayer],
  );

  useEffect(() => {
    if (players[player] === "human") return;
    makeMove(findMove(player, board));
  }, [board, makeMove, player, players]);

  return (
    <Board
      state={board}
      onClick={players[player] === "human" ? makeMove : undefined}
    />
  );
}
