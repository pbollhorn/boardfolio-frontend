import { useState } from "react";
import { useLocation } from "react-router-dom";
import facade from "../util/apiFacade.js";

export default function MyGameList() {
  const location = useLocation();
  const initialList = location.state?.list?.customList || [];
  const [games, setGames] = useState(initialList);
  const [error, setError] = useState(null);

  const listID = location.state?.list?.listID;
  const listName = location.state?.list?.name;
  const username = location.state?.list?.user?.username; // adjust if different
  const isPublic = location.state?.list?.isPublic;

  const removeGame = (gameID) => {
    setGames(prevGames => prevGames.filter(game => game.gameId !== gameID));
  };

  const updateList = async (e) => {
  e.preventDefault();
  try {
    // Map games to the backend format
    const mappedGames = games.map(game => ({
      bgg_API_ID: game.gameId, // backend expects this
      title: game.title,
      description: game.description,
      minNoOfPlayers: game.minNoOfPlayers,
      maxNoOfPlayers: game.maxNoOfPlayers,
      minAge: game.minAge,
      releaseYear: game.releaseYear,
      genres: game.genres,
      image: game.image,
      thumbnail: game.thumbnail
    }));

    const updatedListData = {
      listID: listID,
      name: listName,
      customList: mappedGames,
    };

    await facade.updateList(username, { gameList: updatedListData }, isPublic);
    alert("List updated!");
  } catch (err) {
    console.error("Error updating list", err);
    setError("Error updating list: " + err.message);
  }
};

  return (
    <div>
      <h2>Edit List: {listName}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {games.map(game => (
          <li key={game.gameId}>
            {game.title}
            <button onClick={() => removeGame(game.gameId)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={updateList}>Submit Updated List</button>
    </div>
  );
}
