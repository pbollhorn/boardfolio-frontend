import { useState, useRef } from "react";
import GameList from "../components/GameList.jsx";

export default function SearchGames() {
  const [gameList, setGameList] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Please enter a search term"
  );
  const [category, setCategory] = useState("");
  const searchTermRef = useRef(null);

  async function fetchGameList(event) {
    event.preventDefault();

    const searchTerm = searchTermRef.current.value;
    if (!searchTerm) {
      setStatusMessage("Please enter a search term");
      return;
    }

    try {
      const response = await fetch(
        `https://movie.jcoder.dk/api/movies/search?title=${encodeURIComponent(
          searchTerm
        )}`
      );

      if (response.ok) {
        let payload = await response.json();

        if (category !== "") {
          payload = payload.filter((game) => game.genre?.includes(category));
        }

        setGameList(payload);
        setStatusMessage(null);
      } else {
        setStatusMessage(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      setStatusMessage(`An error occurred:\n${error.message}`);
    }
  }

  return (
    <div className="container">
      <h1>Search for Games</h1>

      <form onSubmit={fetchGameList} className="w-75 mb-2">
        <div className="input-group mb-2">
          <input
            type="search"
            ref={searchTermRef}
            placeholder="Search for games..."
            onChange={fetchGameList}
            className="form-control"
          />
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-search-heart"></i>
          </button>
        </div>

        <div className="mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              fetchGameList();
            }}

            // Dummy options for categories, replace with real ones when available.
            // Right now the API does not support categories for games, becuase it's a movie API. :/
          >
            <option value="">All categories</option>
            <option value="Action">Adventure</option>
            <option value="RPG">Animals</option>
            <option value="Strategy">Dice</option>
            <option value="Shooter">Fantasy</option>
            <option value="Sports">Horror</option>
          </select>
        </div>
      </form>

      {statusMessage ? <p>{statusMessage}</p> : <GameList list={gameList} />}
    </div>
  );
}
