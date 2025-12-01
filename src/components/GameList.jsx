import GameListItem from "./GameListItem";
import { useParams } from "react-router-dom";

export default function GameList({
  games = [],
  listName = "",
  isPublic = false,
  isOwner = false,
  isCollection = false,
  error = null,
  onRemove,
  onDelete,
  onSubmitUpdate,
  onNameChange,
  onPublicToggle,
}) {
  const { username: routeUsername } = useParams();
  const username = routeUsername;
  // Private list lock
  if (!isOwner && !isPublic) {
    return <h2>This list is private!</h2>;
  }

  // Owner edit screen
  if (isOwner) {
    return (
      <div>
        <h2>Edit List</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>
          <input
            type="text"
            value={listName}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </label>

        <label className="ms-3">
          Public:{" "}
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => onPublicToggle(e.target.checked)}
          />
        </label>

        <div className="mt-3">
          {games.length === 0 ? (
            <p>This list is empty!</p>
          ) : (
            games.map((game) => (
              <GameListItem
                key={game.gameId}
                game={game}
                isOwner={isOwner}
                isCollection={isCollection}
                onRemove={onRemove}
              />
            ))
          )}
        </div>

        <button className="btn btn-primary" onClick={onSubmitUpdate}>
          Save
        </button>

        {!isCollection && (
          <button className="btn btn-danger ms-3" onClick={onDelete}>
            Delete List
          </button>
        )}
      </div>
    );
  }

  // Public viewer mode
  return (
    <div>
      {/* Shows the username for the owner of the list from the URL, if it exists */}
      {username && (
        <h2>
          {username}
          {"'s "}
          {listName}
        </h2>
      )}

      {games.length === 0 ? (
        <p>This list is empty!</p>
      ) : (
        games.map((game) => (
          <GameListItem key={game.gameId} game={game} isOwner={false} />
        ))
      )}
    </div>
  );
}
