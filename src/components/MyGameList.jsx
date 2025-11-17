import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import facade from "../util/apiFacade.js";
import { useAuth } from "../context/useAuth.js";
import LoginForm from "./LoginForm.jsx";

export default function MyGameList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username: routeUsername } = useParams();
  const { isLoggedIn, username: authUsername, username } = useAuth();

  const listID = location.state?.list?.listID;

  // Local state
  const [games, setGames] = useState([]);
  const [listName, setListName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState(null);

  const safeAuthUser = authUsername?.toLowerCase();
  const safeRouteUser = routeUsername?.toLowerCase();

  // Fetch the list from location.state or backend
  useEffect(() => {
    if (listID) {
      // Prefer location.state if available
      const listFromState = location.state?.list;
      if (listFromState) {
        setGames(listFromState.customList || []);
        setListName(listFromState.name || "");
        setIsPublic(listFromState.public ?? false);
      } else {
        // Fallback: fetch from backend
        facade.getListById(listID).then((list) => {
          setGames(list.customList || []);
          setListName(list.name || "");
          setIsPublic(list.public ?? false);
        });
      }
    }
  }, [listID, location.state]);

  // Remove a game
  const removeGame = (gameId) => {
    setGames((prevGames) => prevGames.filter((game) => game.gameId !== gameId));
  };

  const [customLists, setCustomLists] = useState([]);

  // fetches the user's list of gameLists
  function getUserListOfGameLists(username) {
    facade.getUserLists(username).then(setCustomLists);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(username);
    }
  }, [username]);

  // Update the list
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
        authUsername,
        { gameList: updatedListData },
        isPublic
      );
      alert("List updated!");
    } catch (err) {
      console.error("Error updating list", err);
      setError("Error updating list: " + err.message);
    }
  };

  // Separate collection from custom lists
  const sortedGames = [...customLists].sort((a, b) => a.listID - b.listID);
  const collection = sortedGames[0]; // the lowest ID is the collection

  // Delete the list
  const deleteList = () => {
    const ok = window.confirm("Are you sure you want to delete this list?");
    if (!ok) return;

    facade.removeList(listID);
    navigate(`/${authUsername}/mylists`);
  };

  // Access control: show login if not owner and list is private
  if ((!isLoggedIn || safeAuthUser !== safeRouteUser) && !isPublic) {
    return (
      <div>
        <LoginForm />
        <h2>This list is private!</h2>
      </div>
    );
  }

  // Owner edit mode
  if (isLoggedIn && safeAuthUser === safeRouteUser) {
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
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </label>
        </div>

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

        <ul>
          {games.length === 0 ? (
            <p>This list is empty!</p>
          ) : (
            games.map((game) => (
              <div>
                <li key={game.gameId}>
                  <img src={game.thumbnailURL} alt={game.title} />
                  {game.title}{" "}
                  <button onClick={() => removeGame(game.gameId)}>
                    Remove
                  </button>
                </li>
              </div>
            ))
          )}
        </ul>

        <button onClick={updateList}>Submit Updated List</button>
        {collection && listID !== collection.listID && (
          <button onClick={() => deleteList(listID)}>Delete</button>
        )}
      </div>
    );
  }

  // Viewer mode for public list
  return (
    <div>
      <LoginForm />
      <h2>
        {routeUsername}'s {listName}
      </h2>

      <ul>
        {games.length === 0 ? (
          <p>This list is empty!</p>
        ) : (
          games.map((game) => <li key={game.gameId}>{game.title}</li>)
        )}
      </ul>
    </div>
  );
}
