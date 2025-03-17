import Game from "@/ui/game";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Tic-tac-toe</h1>
      <Game />
    </main>
  );
}
