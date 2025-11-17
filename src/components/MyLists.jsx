import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth.js";
import { useParams } from "react-router-dom";
import LoginForm from "./LoginForm.jsx";
import facade from "../util/apiFacade.js";
import { formatArrayDate } from "../util/formatingDate.js";

export default function MyList() {
  const { isLoggedIn, username } = useAuth();
  const { username: routeUsername } = useParams();
  const [games, setGames] = useState([]);

  // fetches the user's list of gameLists
  function getUserListOfGameLists(username) {
    facade.getUserLists(username).then(setGames);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(username);
    }
  }, [username]);

  // Shows message if user is not logged in
  if (!isLoggedIn) {
    return (
      <div>
        <h2>You must first log in to see your user lists!</h2>
        <LoginForm />
      </div>
    );
  }

  // if username in URL doesn't match username from token
  // meaning you're logged in as one user trying to view another's page, not allowed!
  //TODO: are usernames uniqueness case sensitive? I've set it as non-casesensitive for now
  if (username.toLowerCase() !== routeUsername.toLowerCase()) {
    return (
      <div>
        <h2
        // className= TODO: Styling
        >
          You do not have permission to view this page!
        </h2>
      </div>
    );
  }

  // Separate collection from custom lists
  const sortedGames = [...games].sort((a, b) => a.listID - b.listID);
  const collection = sortedGames[0]; // the lowest ID is the collection
  const customLists = sortedGames.slice(1); // the rest are custom lists

  return (
    <div className="container">
      <LoginForm />
      <h1>My Collection</h1>
      <br />
      {collection && collection.length > 0 ? (
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
        <p>Looks like your collection is empty!</p>
      )}

      <h1>{username}'s Custom Lists</h1>
      <br />
      {customLists ? (
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
