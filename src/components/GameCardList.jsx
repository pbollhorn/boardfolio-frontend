export default function GameCardList({ list }) {
  return (
    <>
      {list.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </>
  );
}
