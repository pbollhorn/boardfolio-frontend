import { useState } from "react";
import { useLocation } from "react-router-dom";
import facade from "../util/apiFacade.js";

export default function MyGameList() {
  const location = useLocation();
  const initialList = location.state?.list?.customList || [];
  const [games, setGames] = useState(initialList);
  const [listName, setListName] = useState(location.state?.list?.name || "");
  const [isPublic, setIsPublic] = useState(
    location.state?.list?.isPublic || false
  );
  const [error, setError] = useState(null);

  const listID = location.state?.list?.listID;
  const username = location.state?.list?.user?.username; // adjust if different

  const removeGame = (gameID) => {
    setGames((prevGames) => prevGames.filter((game) => game.gameId !== gameID));
  };

  const updateList = async (e) => {
    e.preventDefault();
    try {
      // Map games to the backend format
      const mappedGames = games.map((game) => ({
        bgg_API_ID: game.gameId, // backend expects this
        title: game.title,
        description: game.description,
        minNoOfPlayers: game.minNoOfPlayers,
        maxNoOfPlayers: game.maxNoOfPlayers,
        minAge: game.minAge,
        releaseYear: game.releaseYear,
        genres: game.genres,
        image: game.image,
        thumbnail: game.thumbnail,
      }));

      const updatedListData = {
        listID: listID,
        name: listName,
        customList: mappedGames,
      };

      await facade.updateList(
        username,
        { gameList: updatedListData },
        isPublic
      );
      alert("List updated!");
    } catch (err) {
      console.error("Error updating list", err);
      setError("Error updating list: " + err.message);
    }
  };

  return (
    <div>
      <h2>Edit List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>
          List Name:{" "}
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </label>
      </div>

      <ul>
        {games.map((game) => (
          <li key={game.gameId}>
            {game.title}
            <button onClick={() => removeGame(game.gameId)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>
        <label>
          Public:{" "}
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
      </div>

      <button onClick={updateList}>Submit Updated List</button>
    </div>
  );
}
