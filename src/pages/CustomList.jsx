import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import facade from "../util/apiFacade.js";
import { useAuth } from "../context/useAuth.js";
import LoginForm from "../components/LoginForm.jsx";
import GameList from "../components/GameList.jsx";

export default function CustomList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username: routeUsername } = useParams();
  const { isLoggedIn, username: authUsername } = useAuth();

  const listID = location.state?.list?.listID;

  const [games, setGames] = useState([]);
  const [listName, setListName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [customLists, setCustomLists] = useState([]);
  const [error, setError] = useState(null);

  const safeAuthUser = authUsername?.toLowerCase();
  const safeRouteUser = routeUsername?.toLowerCase();

  const isOwner = isLoggedIn && safeAuthUser === safeRouteUser;

  useEffect(() => {
    if (!listID) return;

    const listFromState = location.state?.list;

    if (listFromState) {
      setGames(listFromState.customList || []);
      setListName(listFromState.name || "");
      setIsPublic(listFromState.public ?? false);
    } else {
      facade.getListById(listID).then((list) => {
        setGames(list.customList || []);
        setListName(list.name || "");
        setIsPublic(list.public ?? false);
      });
    }
  }, [listID, location.state]);

  // Fetch all custom lists to detect collection list
  useEffect(() => {
    if (authUsername) {
      facade.getUserLists(authUsername).then(setCustomLists);
    }
  }, [authUsername]);

  const sorted = [...customLists].sort((a, b) => a.listID - b.listID);
  const collection = sorted[0];
  const isCollection = collection && collection.listID === listID;

  const removeGame = (gameId) => {
    setGames((prev) => prev.filter((g) => g.gameId !== gameId));
  };

  const deleteList = () => {
    const ok = window.confirm("Are you sure you want to delete this list?");
    if (!ok) return;

    facade.removeList(listID);
    navigate(`/${authUsername}/mylists`);
  };

  const updateList = async () => {
    try {
      const mappedGames = games.map((game) => ({
        BGG_API_ID: game.gameId,
        title: game.title,
        description: game.description,
        minNoOfPlayers: game.minNoOfPlayers,
        maxNoOfPlayers: game.maxNoOfPlayers,
        minAge: game.minAge,
        releaseYear: game.releaseYear,
        genres: game.genres,
        image: game.imageURL,
        thumbnail: game.thumbnailURL,
      }));

      const updatedListData = {
        listID,
        name: listName,
        customList: mappedGames,
      };

      await facade.updateList(authUsername, { gameList: updatedListData }, isPublic);
      alert("List updated!");
    } catch (err) {
      setError("Error updating list: " + err.message);
    }
  };

  return (
    <div>
      <LoginForm />

      <GameList
        games={games}
        listName={listName}
        isPublic={isPublic}
        isOwner={isOwner}
        isCollection={isCollection}
        error={error}
        onRemove={isOwner ? removeGame : undefined}
        onDelete={isOwner ? deleteList : undefined}
        onSubmitUpdate={isOwner ? updateList : undefined}
        onNameChange={setListName}
        onPublicToggle={setIsPublic}
      />
    </div>
  );
}
