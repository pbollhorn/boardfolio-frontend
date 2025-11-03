import GameListItem from "./GameListItem.jsx";

export default function GameList({ list }) {
  if (list.length === 0) {
    return <p>No games found</p>;
  }

  return (
    <>
      {list.map((e) => (
        <GameListItem key={e.id} gameData={e} />
      ))}
    </>
  );
}
