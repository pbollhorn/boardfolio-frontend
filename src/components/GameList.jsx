export default function GameList({ list }) {
  if (!list || !list.customList?.length) {
    return <p>No games found</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Game Title</th>
        </tr>
      </thead>
      <tbody>
        {list.customList.map((game) => (
          <tr key={game.gameID}>
            <td>{game.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
