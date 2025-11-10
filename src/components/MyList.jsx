import GameList from "./GameList";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function MyList() {
  const username = "casper";
  const isLoggedIn = true;

  //   TODO: insert URL for fetching GameLists for a user here!
  //   const URL = "INSERT URL HERE" + username;

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

  const userListOfGameLists = [
    {
      listID: 1,
      name: "My Favorite RPGs PRIVATE",
      customList: [
        { gameID: 101, title: "The Witcher 3: Wild Hunt" },
        { gameID: 102, title: "Skyrim" },
        { gameID: 103, title: "Baldur's Gate 3" },
      ],
      createdDate: "2024-02-15T12:00:00",
      isPublic: false,
      user: { username: "casper" },
    },
    {
      listID: 2,
      name: "Boardgames PUBLIC",
      customList: [
        { gameID: 104, title: "Boardgame1" },
        { gameID: 105, title: "Boardgame2" },
        { gameID: 106, title: "Boardgame3" },
      ],
      createdDate: "2025-03-15T12:00:00",
      isPublic: true,
      user: { username: "casper" },
    },
  ];

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
                <Link to={`${gameList.listID}`}>{gameList.name}</Link>
              </td>
              <td>{gameList.createdDate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Outlet />
    </div>
  );
}
