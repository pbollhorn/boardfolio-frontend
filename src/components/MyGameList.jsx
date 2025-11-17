import { useState } from "react";
import { useLocation } from "react-router-dom";
import facade from "../util/apiFacade.js";
import { useAuth } from "../context/useAuth.js";
import { useParams } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MyGameList() {
  const location = useLocation();
  const initialList = location.state?.list?.customList || [];
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  const { username: routeUsername } = useParams();

  // Initialize state from location.state
  const [games, setGames] = useState(initialList);
  const [listName, setListName] = useState(location.state?.list?.name || "");
  const [isPublic, setIsPublic] = useState(
    location.state?.list?.public ?? false
  );

  // Separate collection from custom lists
  const sortedGames = [...games].sort((a, b) => a.listID - b.listID);
  const collection = sortedGames[0]; // the lowest ID is the collection

  // console.log(`${JSON.stringify(collection)}`);
  // console.log(`${JSON.stringify(games)}`);
  // console.log(`${JSON.stringify(initialList)}`);

  // fetches the user's list of gameLists
  function getUserListOfGameLists(username) {
    facade.getUserLists(username).then(setGames);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(username);
    }
  }, [username]);

  const [error, setError] = useState(null);

  const listID = location.state?.list?.listID;

  const removeGame = (gameID) => {
    setGames((prevGames) => prevGames.filter((game) => game.gameId !== gameID));
  };

  const updateList = async (e) => {
    e.preventDefault();
    try {
      const mappedGames = games.map((game) => ({
        bgg_API_ID: game.gameId,
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
        listID,
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

  function deleteList(listID) {
    // opens a window that requires confirmation
    const ok = window.confirm("Are you sure you want to delete this list?");
    if (!ok) return; // user canceled

    facade.removeList(listID);
    navigate(`/${username}/mylists`);
  }

  const safeUser = username?.toLowerCase();
  const safeRouteUser = routeUsername?.toLowerCase();

  // If username from token doesn't matches URL then show list or list is private
  // Then it doesn't show the list
  if ((!isLoggedIn || safeUser !== safeRouteUser) && !isPublic) {
    return (
      <div>
        <LoginForm />
        <h2
        // className= TODO: Styling
        >
          This list is private!
        </h2>
      </div>
    );
  }

  // edit mode for owner of list
  if (isLoggedIn && safeUser == safeRouteUser) {
    return (
      <div>
        <LoginForm />
        <h2>Edit List</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label>
            List Name:{" "}
            <input
              type="text"
              placeholder={listName}
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </label>
        </div>

        <ul>
          {games ? (
            <div>
              <p>This list is empty!</p>
            </div>
          ) : (
            <div>
              {games.map((game) => (
                <li key={game.gameId}>
                  {game.title}
                  <button onClick={() => removeGame(game.gameId)}>
                    Remove
                  </button>
                </li>
              ))}
            </div>
          )}
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
        {collection && listID !== collection.listID && (
          <button onClick={() => deleteList(listID)}>Delete</button>
        )}
      </div>
    );
  }

  // if not owner of list, but it's public
  return (
    <div>
      <LoginForm />
      <h2>
        {routeUsername}
        {"'s "}
        {listName}
      </h2>
      <ul>
        {games ? (
          <div>
            {games.map((game) => (
              <li key={game.gameId}>
                {game.title}
                <button onClick={() => removeGame(game.gameId)}>Remove</button>
              </li>
            ))}
          </div>
        ) : (
          <div>
            <p>This list is empty!</p>
          </div>
        )}
      </ul>
    </div>
  );
}
