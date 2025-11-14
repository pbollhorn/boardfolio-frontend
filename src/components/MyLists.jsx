import GameList from "./GameList.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { fetchData } from "../util/fetchData.js";
import facade from "../util/apiFacade.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";

export default function MyList() {
  //TODO: hardcoded variables for testing
  const username = "testUser";
  const isLoggedIn = true;

  // const [isLoggedIn, username] = useAuth();
  const [games, setGames] = useState([]);

  const dev = true;
  const BASE_URL = dev ? "http://localhost:7070/api" : ""; //TODO: set deployed URL here

  const GAMES_URL = `/list/${username}`;

  const URL = BASE_URL + GAMES_URL;

  // fetches the user's list of gameLists
  function getUserListOfGameLists(callback) {
    fetchData(URL, callback);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(setGames);
    }
  }, [username]);

  // helper method to format java localdatetime (integer array) to DD/MM/YEAR HOUR:MINUTE String
  function formatArrayDate(arr) {
    const [year, month, day, hour, minute] = arr;
    return `${String(day).padStart(2, "0")}-${String(month).padStart(
      2,
      "0"
    )}-${year} ${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  }

  // Shows message if user is not logged in
  if (!isLoggedIn) {
    return (
      <div>
        <h2>You must first log in to see your user lists!</h2>
      </div>
    );
  }

    // Separate collection from custom lists
  const sortedGames = [...games].sort((a, b) => a.listID - b.listID);
  const collection = sortedGames[0]; // the lowest ID is the collection
  const customLists = sortedGames.slice(1); // the rest are custom lists

  return (
    <div className="container">
       <h1>My Collection</h1>
      <br />
      {collection ? (
        <table>
          <tbody>
            <tr key={collection.listID}>
              <td>
                <Link
                  to={`/${username}/mylists/${collection.listID}`}
                  state={{ list: collection }}
                >
                  {collection.name}
                </Link>
              </td>
              {/* TODO: collections should have a timestamp? */}
              {/* <td>{formatArrayDate(collection.createdDate)}</td> */}
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No collection found</p>
      )}


      <h1>{username}'s Custom Lists</h1>
      <br />
      {customLists.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>List Name</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {customLists.map((gameList) => (
              <tr key={gameList.listID}>
                <td>
                  <Link
                    to={`/${username}/mylists/${gameList.listID}`}
                    state={{ list: gameList }}
                  >
                    {gameList.name}
                  </Link>
                </td>
                <td>{formatArrayDate(gameList.createdDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No custom lists yet</p>
      )}

      <br />
      <Link to={`/${username}/mylists/newlist`}>
        <button id="createList">Create List</button>
      </Link>

      <Outlet />
    </div>
  );
}
