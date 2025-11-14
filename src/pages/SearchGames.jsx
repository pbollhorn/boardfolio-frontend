import { useState, useRef } from "react";
import GameCardList from "../components/GameList.jsx";

export default function SearchGames() {
  const [gameList, setGameList] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);
  // const [searchTerm, setSearchTerm] = useState("");
  const searchTermRef = useRef(null);

  async function fetchGameList(event) {
    event.preventDefault();

    const searchTerm = searchTermRef.current.value;

    // if (!searchTerm) {
    //   setStatusMessage("Please enter a search term.");
    //   return;
    // }

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

      <div className="search-container">
        <form onSubmit={fetchGameList}>
          <input
            type="search"
            placeholder="Search for games..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            onChange={fetchGameList}
            ref={searchTermRef}
          />
          {/* <button type="submit"> */}
          <button>
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>

      {statusMessage ? (
        <p>{statusMessage}</p>
      ) : (
        gameList.length > 0 && <GameCardList list={gameList} />
      )}
    </div>
  );
}
