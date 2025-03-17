import { Mark } from "@/ui/board";

const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getWinner = (board: Array<Mark | undefined>) =>
  wins.find(
    (places) =>
      places.every((place) => board[place] === "X") ||
      places.every((place) => board[place] === "O"),
  );

const rateAttack = (
  move: number,
  value: Mark,
  board: Array<Mark | undefined>,
) =>
  wins
    .filter((places) => places.includes(move))
    .map((places) =>
      places.reduce(
        (agg, place) =>
          board[place] ? (board[place] === value ? agg + 1 : agg - 1) : agg,
        0,
      ),
    );

const rateDefend = (
  move: number,
  value: Mark,
  board: Array<Mark | undefined>,
) =>
  wins
    .filter((places) => places.includes(move))
    .map(
      (places) =>
        places.filter((place) => board[place] && board[place] !== value).length,
    );

export const findMove = (
  value: Mark,
  board: Array<Mark | undefined>,
  moves: number[],
) => {
  const options = moves.map((move) => {
    return [
      move,
      Math.max(...rateAttack(move, value, board)),
      Math.max(...rateDefend(move, value, board)),
    ];
  });
  const attacks = options.toSorted((a, b) => b[1] - a[1]);
  const defends = options.toSorted((a, b) => b[2] - a[2]);
  const [attack, attackScore] = [attacks[0][0], attacks[0][1]];
  const [defend, defendScore] = [defends[0][0], defends[0][2]];
  return attackScore > 1 ? attack : defendScore > 1 ? defend : attack;
};
