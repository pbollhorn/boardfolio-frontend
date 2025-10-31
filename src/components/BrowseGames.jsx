import { useState, useEffect } from "react";
import GameCardList from "./GameCardList.jsx";

export default function BrowseGames() {
  const [gameList, setGameList] = useState([]);

  // useEffect
  useEffect(() => {
    async function fun() {
      try {
        const games = await fetchGames();
        setGameList(games);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    }
    fun(); // Call the async function
  }, []); // Runs on mount

  return (
    <>
      <h1>Browse Games</h1>
      <GameCardList list={gameList}/>
    </>
  );
}

async function fetchGames() {
  const response = await fetch(
    "https://movie.jcoder.dk/api/movies/search?title=critters"
  );
  const data = await response.json();
  return data;
}
