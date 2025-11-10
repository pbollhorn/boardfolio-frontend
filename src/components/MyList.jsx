import GameList from "./GameList";
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../util/fetchData";
import { useEffect, useState } from "react";

export default function MyList() {
  const { isLoggedIn, username } = useAuth(); //TODO: we need login for this to work
  const { userListOfGameLists, setUserListOfGameLists } = useState([]);

  //   TODO: insert URL for fetching GameLists for a user here!
  //   const URL = "INSERT URL HERE" + username;

  // fetches the user's list of gameLists
  function getUserListOfGameLists(callback) {
    fetchData(URL, callback);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(setUserListOfGameLists);
    }
  }, [username]);

  useEffect(() => {
    getUserListOfGameLists((data) => {
      setUserListOfGameLists(data);
    });
  }, []);

  //   Early return if user is not logged in
  if (!isLoggedIn) {
    return (
      <div class="container">
        <h2>You must first log in to see this page!</h2>
      </div>
    );
  }

  // Calls the GameList component that renders the list of games
  return (
    <>
      <div class="container">
        <h1>Welcome {username}!</h1>
        <br />
        {/* TODO: add css to the table */}
        <table>
          <tbody>
            {userListOfGameLists.map((gameList) => (
              <tr key={gameList.listID}>
                <td>{gameList.name}</td>
                <td>{gameList.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
