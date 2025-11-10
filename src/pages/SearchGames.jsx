import { useState } from "react";
import GameCardList from "../components/GameList.jsx";
import "../styles/SearchGames.module.css";

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
      <div className="search-container">
        <h1>Search For Games</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="button" onClick={fetchGameList}>
          <i className="fa fa-search"></i> Search
        </button>
      </div>

      {/* Status message */}
      {statusMessage && <p>{statusMessage}</p>}

      {/* Display the fetched game list */}
      {gameList.length > 0 && <GameCardList games={gameList} />}
    </div>
  );
}
