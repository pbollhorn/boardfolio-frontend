import { useLocation, useParams } from "react-router-dom";
import facade from "../util/apiFacade";
import { useState, useEffect } from "react";

export default function GameList() {
  const location = useLocation();
  const initialList = location.state?.list;
  const { user, listID } = useParams();
  const [hasChanges, setHasChanges] = useState(false);

  const [listName, setListName] = useState(initialList?.name || "");
  const [gameList, setGameList] = useState(() =>
    initialList?.customList ? Array.from(initialList.customList) : []
  );
  const [isPublic, setIsPublic] = useState(initialList?.public || false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullList, setFullList] = useState(initialList);

  useEffect(() => {
    if (!initialList && listID && user) {
      setLoading(true);
      facade
        .getListByID(user, listID)
        .then((list) => {
          setFullList(list);
          setListName(list.name);
          setGameList(list.customList ? Array.from(list.customList) : []);
          setIsPublic(list.public || false);
        })
        .catch((err) => {
          console.error("Error fetching list:", err);
          setError("Failed to load list: " + err.message);
        })
        .finally(() => setLoading(false));
    }
  }, [initialList, listID, user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!fullList) {
    return <p>List not found</p>;
  }

  const cleanGamesForBackend = (games) => {
    return games.map((game) => ({
      title: game.title,
      description: game.description,
      minAge: game.minAge,
      minNoOfPlayers: game.minNoOfPlayers,
      maxNoOfPlayers: game.maxNoOfPlayers,
      releaseYear: game.releaseYear,
      genres: game.genres,
      image: game.image,
      thumbnail: game.thumbnail,
      bgg_API_ID: game.gameId,
    }));
  };

  const removeGame = (gameId) => {
    const updated = gameList.filter((game) => game.gameId !== gameId);
    setGameList(updated);
    setHasChanges(true);
  };

const updateList = async (e) => {
  e.preventDefault();
  console.log("updateList blev kaldt!");
  try {
    const cleanedGames = cleanGamesForBackend(gameList);
    const updatedListData = {
      listID: listID,
      name: listName,
      customList: cleanedGames,
      public: isPublic
    };
    
    console.log("Sender til backend:", updatedListData); // DEBUG
    
    await facade.updateList(user, { gameList: updatedListData }, isPublic);
    setHasChanges(false);
  } catch (err) {
    console.error("error updating list", err);
    setError("error updating list: " + err.message);
  }
};

  return (
    <form onSubmit={updateList}>
      <table>
        <thead>
          <tr>
            <th colSpan="3">
              <div>
                <h1>{listName || fullList.name}</h1>
                <input
                  type="text"
                  id="listname"
                  name="listname"
                  placeholder="Edit list name"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {gameList.map((game) => (
            <tr key={game.gameId}>
              <td>
                <img src={game.thumbnailURL} alt={game.title} />
              </td>
              <td>{game.title}</td>
              <td>
                <button type="button" onClick={() => removeGame(game.gameId)}>
                  remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <input
          type="checkbox"
          id="public"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <label htmlFor="public">Public</label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {hasChanges && (
        <p style={{ color: "orange" }}>Changes</p>
      )}
      <button type="submit" id="btn-submit">
        submit change
      </button>
    </form>
  );
}
