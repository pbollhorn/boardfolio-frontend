import { useLocation, useParams } from "react-router-dom";
import { data } from "../resources/data.js";

export default function GameList() {
  const location = useLocation();
  const { listID } = useParams();

  // Try to get list from state (if you navigated from MyList)
  let list = location.state?.list;

  // Fallback: find it by listID (if user refreshed or navigated directly)
  if (!list) {
    list = data.find((l) => l.listID.toString() === listID);
  }

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
