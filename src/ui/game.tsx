"use client";

import Board, { Mark, size } from "@/ui/board";
import { useState } from "react";

const clean = () => Array<Mark | undefined>(size).fill(undefined);

export default function Game() {
  const [board, setBoard] = useState(clean);
  const [player, setPlayer] = useState<Mark>("X");

  const reset = () => setBoard(clean);

  const switchPlayer = () =>
    setPlayer((current) => (current === "X" ? "O" : "X"));

  const makeMove = (index: number) => {
    setBoard((current) => {
      current[index] = player;
      return current;
    });
    switchPlayer();
  };

  return <Board state={board} onClick={makeMove} />;
}
