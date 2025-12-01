import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/useAuth.js";
import { useParams } from "react-router-dom";
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
        <Link to="/login" className="btn btn-primary btn-sm">
          Go to Login
        </Link>
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

  // TODO: lists should show number of games in a column
  return (
    <div className="container">
      <div className="card mt-4 mb-4">
        <h2 class="card-title text-center py-4">{username}</h2>
      </div>
      <h5>My Collection</h5>
      {collection ? (
        <Link
          to={`/${username}/mylists/${collection.listID}`}
          state={{ list: collection }}
        >
          <div className="card mb-4 px-4">
            <p className=" card-text py-3">
              Number of games: {collection.customList.length}
            </p>
          </div>
        </Link>
      ) : (
        <p>Looks like your collection is empty!</p>
      )}

      <h5>{username}'s custom lists</h5>
      {customLists ? (
        customLists.map((gameList) => (
          <Link
            key={gameList.listID}
            to={`/${username}/mylists/${gameList.listID}`}
            state={{ list: gameList }}
            className="text-decoration-none"
          >
            <div className="card mb-4 px-4">
              <div className="d-flex align-items-baseline gap-2 py-4">
                <h2 className="card-title">{gameList.name}</h2>
                <p className="card-text">
                  - Created: {formatArrayDate(gameList.createdDate)}
                </p>
              </div>
              <p>Number of games: {gameList.customList.length}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No custom lists yet</p>
      )}

      <div className="text-center mt-4">
        <Link
          to={`/${username}/mylists/newlist`}
          className="btn btn-secondary"
          id="createList"
        >
          Create List
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
