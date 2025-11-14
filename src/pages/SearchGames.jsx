import { useState, useRef } from "react";
import GameList from "../components/GameList.jsx";

export default function SearchGames() {
  const [gameList, setGameList] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Please enter a search term"
  );
  const searchTermRef = useRef(null);

  async function fetchGameList(event) {
    event.preventDefault();

    const searchTerm = searchTermRef.current.value;
    if (!searchTerm) {
      setStatusMessage("Please enter a search term");
      return;
    }

    setStatusMessage("Searching...");
    try {
      const response = await fetch(
        `https://movie.jcoder.dk/api/movies/search?title=${encodeURIComponent(
          searchTerm
        )}`
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
      <h1>Search for Games</h1>

      <form onSubmit={fetchGameList}>
        {/* <div className="search-container"> */}
        <div className="input-group w-75">
          <input
            type="search"
            ref={searchTermRef}
            placeholder="Search for games..."
            onChange={fetchGameList}
          />
          <button type="submit" className="btn btn-primary">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>
      </form>
      {statusMessage ? <p>{statusMessage}</p> : <GameList list={gameList} />}
    </div>
  );
}
