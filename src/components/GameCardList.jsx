import GameCard from "./GameCard.jsx";

export default function GameCardList({ list }) {
  return (
    <>
      {list.map((e) => (
        // <p key={e.id}>{e.title}</p>
        <GameCard key={e.id} gameData={e} />
      ))}
    </>
  );
}
