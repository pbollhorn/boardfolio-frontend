import GameList from "./GameList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { data } from "../resources/data.js";

export default function MyList() {
  const username = "casper";
  const isLoggedIn = true;

  //   TODO: insert URL for fetching GameLists for a user here!
  //   const URL = "INSERT_URL_HERE" + username;

  // fetches the user's list of gameLists
  //   function getUserListOfGameLists(callback) {
  //     fetchData(URL, callback);
  //   }

  //   useEffect(() => {
  //     if (username) {
  //       getUserListOfGameLists(setUserListOfGameLists);
  //     }
  //   }, [username]);

  //   useEffect(() => {
  //     getUserListOfGameLists((data) => {
  //       setUserListOfGameLists(data);
  //     });
  //   }, []);

  const userListOfGameLists = data;

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
          {userListOfGameLists.map((gameList) => (
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
