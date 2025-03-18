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

export type Mark = "X" | "O";
export type Field = Array<Mark | undefined>;

export const getWinner = (board: Field) =>
  wins.find((places) => {
    const values = places.map((place) => board[place]).join("");
    return values === "XXX" || values === "OOO";
  });

const rateMove = (move: number, value: Mark, board: Field) => {
  const variants = wins.filter((places) => places.includes(move));
  return {
    attackScore: Math.max(
      ...variants.map((places) =>
        places.reduce(
          (agg, place) =>
            board[place] ? (board[place] === value ? agg + 1 : agg - 1) : agg,
          0,
        ),
      ),
    ),
    defendScore: Math.max(
      ...variants.map(
        (places) =>
          places.filter((place) => board[place] && board[place] !== value)
            .length,
      ),
    ),
  };
};

export const findMove = (value: Mark, board: Field, moves: number[]) => {
  const options = moves.map((move) => ({
    move,
    ...rateMove(move, value, board),
  }));
  const bestAttack = options.toSorted(
    (a, b) => b.attackScore - a.attackScore,
  )[0];
  const bestDefense = options.toSorted(
    (a, b) => b.defendScore - a.defendScore,
  )[0];
  const [attack, attackScore] = [bestAttack.move, bestAttack.attackScore];
  const [defend, defendScore] = [bestDefense.move, bestDefense.defendScore];
  return attackScore > 1 ? attack : defendScore > 1 ? defend : attack;
};
