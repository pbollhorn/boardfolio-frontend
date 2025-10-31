import GameCard from "./GameCard.jsx";

export default function GameCardList({ list }) {
  return (
    <>
      {list.map((e) => (
        <GameCard key={e.id} gameData={e} />
      ))}
    </>
  );
}
