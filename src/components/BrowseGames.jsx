import { useState, useEffect } from "react";
import GameCardList from "./GameCardList.jsx";

export default function BrowseGames() {
  const [gameList, setGameList] = useState([]);
  const [statusMessage, setStatusMessage] = useState("Loading...");

  useEffect(() => {
    // Define an async function
    async function fun() {
      try {
        const response = await fetch(
          "https://movie.jcoder.dk/api/movies/search?title=critters"
        );
        if (!response.ok) {
          setStatusMessage(`HTTP ${response.status}: ${response.statusText}`);
        }
        const payload = await response.json();
        setGameList(payload);
        setStatusMessage("");
      } catch (error) {
        setStatusMessage(`An error occurred:\n${error.message}`);
      }
    }
    fun(); // Call the async function
  }, []); // Runs on mount

  return (
    <>
      <h1>Browse Games</h1>
      {statusMessage == "" ? (
        <GameCardList list={gameList} />
      ) : (
        <p>{statusMessage}</p>
      )}
    </>
  );
}
