import { useState } from "react";
import GameCardList from "../components/GameList.jsx";

export default function SearchGames() {
  const [gameList, setGameList] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchGameList() {
    if (!searchTerm) {
      setStatusMessage("Please enter a search term.");
      return;
    }

    setStatusMessage("Searching...");
    try {
      const response = await fetch(
        `https://movie.jcoder.dk/api/movies/search?title=${encodeURIComponent(searchTerm)}`
      );
      if (response.ok) {
        const payload = await response.json();
        setGameList(payload);
        setStatusMessage(payload.length === 0 ? "No games found." : null);
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

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={fetchGameList}>
          Search
        </button>
      </div>

      {statusMessage ? (
        <p>{statusMessage}</p>
      ) : (
        gameList.length > 0 && <GameCardList list={gameList} />
      )}
    </div>
  );
}
