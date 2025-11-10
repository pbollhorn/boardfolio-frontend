import GameList from "./GameList";
import { useAuth } from "../context/AuthContext";
import { fetchData } from "../util/fetchData";
// import { fetchData } from "../util/fetchData"; TODO:import fetchData when it's made

export default function MyList() {
  const { isLoggedIn, username } = useAuth(); //TODO: we need login for this to work
  const { userListOfGameLists, setUserListOfGameLists } = useState([]);

  function getUserListOfGameLists(callback) {
    fetchData(URL, callback);
  }

  useEffect(() => {
    if (username) {
      getUserListOfGameLists(setUserMovies);
    }
  }, [username]);

  //   TODO: insert URL for fetching GameLists for a user here!
  //   const URL = "" + username;

  //   TODO: use fetchData here!
  //   function getGames(callback) {
  //     fetchData(URL, callback);
  //   }

  //TODO: use effect, once other functions are made
  //   useEffect(() => {
  //     getGames((data) => {
  //       setGames(data);
  //     });
  //   }, []);

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
      </div>
      {/* TODO: create component for showing a list
      of the user's GameLists */}
    </>
  );
}
