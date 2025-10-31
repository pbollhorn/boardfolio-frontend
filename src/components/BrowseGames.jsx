import { useState, useEffect } from "react";
import GameCardList from "./GameCardList.jsx";

export default function BrowseGames() {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    // Define an async function
    async function fun() {
      try {
        const response = await fetch(
          "https://movie.jcoder.dk/api/movies/search?title=critters"
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const payload = await response.json();
        setGameList(payload);
      } catch (error) {
        alert(`An error occurred:\n${error.message}`);
      }
    }
    fun(); // Call the async function
  }, []); // Runs on mount

  return (
    <>
      <h1>Browse Games</h1>
      <GameCardList list={gameList} />
    </>
  );
}
