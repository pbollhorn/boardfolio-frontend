import GameList from "./GameList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { data } from "../resources/data.js";
import { fetchData } from "../util/fetchData";
import facade from "../util/apiFacade";
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

  //   TODO: insert URL for fetching GameLists for a user here!
  //   const URL = "INSERT_URL_HERE" + username;

  // fetches the user's list of gameLists
  function getUserListOfGameLists(callback) {
    fetchData(URL, callback);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(setGames);
    }
  }, [username]);

  // const userListOfGameLists = data;

  if (!isLoggedIn) {
    return (
      <div>
        <h2>You must first log in to see your user page!</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome {username}!</h1>
      <br />
      <table>
        <thead>
          <tr>
            <th>List Name</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {games.map((gameList) => (
            <tr key={gameList.listID}>
              <td>
                <Link
                  to={`/${username}/mylists/${gameList.listID}`}
                  state={{ list: gameList }}
                >
                  {gameList.name}
                </Link>
              </td>
              <td>{gameList.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to={`/${username}/mylists/newlist`}>
        <button id="createList">Create List</button>
      </Link>

      <Outlet />
    </div>
  );
}
