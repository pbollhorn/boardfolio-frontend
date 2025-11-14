import { useLocation } from "react-router-dom";

export default function GameList() {
  const location = useLocation();

  // Try to get list from state (if you navigated from MyList)
  let list = location.state?.list;

  // Fallback: find it by listID (if user refreshed or navigated directly)

  if (!list) {
    return <p>List not found</p>;
  }

  if (!list.customList?.length) {
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
