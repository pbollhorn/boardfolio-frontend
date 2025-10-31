import NoPoster from "../assets/NoPoster.png";

export default function GameCard({ gameData }) {
  return (
    <div>
      <img
        //   className={styles.posterImage}
        src={
          gameData.posterPath
            ? "https://image.tmdb.org/t/p/w154" + gameData.posterPath
            : NoPoster
        }
      />{" "}
      {gameData.title}
    </div>
  );
}
