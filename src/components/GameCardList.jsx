import GameCard from "./GameCard.jsx";

export default function GameCardList({ list }) {
    if (list.length === 0) {
    return <p>No games found</p>;
  }
  
  return (
    <>
      {list.map((e) => (
        <GameCard key={e.id} gameData={e} />
      ))}
    </>
  );
}



