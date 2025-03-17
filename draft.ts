type Value = "X" | "O";
const board = Array<Value | undefined>(9);

const cleanBoard = () => void board.fill(undefined);

const printState = () =>
  console.log(
    board
      .map(
        (value, index) =>
          `${value || " "}|${(index + 1) % 3 === 0 ? "\n" : ""}`,
      )
      .join(""),
  );

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

const getWinner = () => {
  const variant = wins.find(
    (places) =>
      places.every((place) => board[place] === "X") ||
      places.every((place) => board[place] === "O"),
  );
  return variant ? board[variant[0]] : undefined;
};

const getMoves = () =>
  board
    .map((value, index) => (value ? undefined : index))
    .filter((index) => index !== undefined);

const rateAttack = (move: number, value: Value) =>
  wins
    .filter((places) => places.includes(move))
    .map((places) =>
      places.reduce(
        (agg, place) =>
          board[place] ? (board[place] === value ? agg + 1 : agg - 1) : agg,
        0,
      ),
    );

const rateDefend = (move: number, value: Value) =>
  wins
    .filter((places) => places.includes(move))
    .map(
      (places) =>
        places.filter((place) => board[place] && board[place] !== value).length,
    );

const findMove = (value: Value, moves: number[]) => {
  const options = moves.map((move) => {
    return [
      move,
      Math.max(...rateAttack(move, value)),
      Math.max(...rateDefend(move, value)),
    ];
  });
  const attacks = options.toSorted((a, b) => b[1] - a[1]);
  const defends = options.toSorted((a, b) => b[2] - a[2]);
  const [attack, attackScore] = [attacks[0][0], attacks[0][1]];
  const [defend, defendScore] = [defends[0][0], defends[0][2]];
  return attackScore > 1 ? attack : defendScore > 1 ? defend : attack;
};

cleanBoard();
let player: Value = "X";
const switchPlayer = () => (player = player === "X" ? "O" : "X");
while (!getWinner()) {
  const moves = getMoves();
  if (moves.length === 0) break; // draw
  const move = findMove(player, moves);
  board[move] = player;
  printState();
  switchPlayer();
}
