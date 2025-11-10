import { useState, useEffect } from "react";
import GameCardList from "./GameList.jsx";

export default function BrowseGames() {
  const [gameList, setGameList] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Loading...");

  useEffect(() => {
    // Define an async function
    async function fetchGameList() {
      try {
        const response = await fetch(
          "https://movie.jcoder.dk/api/movies/search?title=critters"
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
    fetchGameList(); // Call the async function
  }, []); // Runs on mount

  return (
    <div className="container">
      <h1>Browse Games</h1>
      {statusMessage ? (
        <p>{statusMessage}</p>
      ) : (
        <GameCardList list={gameList} />
      )}
    </div>
  );
}
