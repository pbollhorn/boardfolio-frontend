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
  onPublicToggle
}) {
  // Private list viewer access
  if (!isOwner && !isPublic) {
    return (
      <div>
        <h2>This list is private!</h2>
      </div>
    );
  }

  // Owner edit mode
  if (isOwner) {
    return (
      <div>
        <h2>Edit List</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div>
          <label>
            List Name:{" "}
            <input type="text" value={listName} onChange={e => onNameChange(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            Public:{" "}
            <input
              type="checkbox"
              checked={isPublic}
              onChange={e => onPublicToggle(e.target.checked)}
            />
          </label>
        </div>

        <ul>
          {games.length === 0 ? (
            <p>This list is empty!</p>
          ) : (
            games.map((game) => (
              <li key={game.gameId}>
                <img src={game.thumbnailURL} alt={game.title} />
                {game.title}{" "}
                {onRemove && (
                  <button onClick={() => onRemove(game.gameId)}>Remove</button>
                )}
              </li>
            ))
          )}
        </ul>

        <button onClick={onSubmitUpdate}>Submit Updated List</button>

        {!isCollection && onDelete && (
          <button onClick={onDelete}>Delete List</button>
        )}
      </div>
    );
  }

  // Viewer mode (public)
  return (
    <div>
      <h2>{listName}</h2>

      <ul>
        {games.length === 0 ? (
          <p>This list is empty!</p>
        ) : (
          games.map((game) => (
            <li key={game.gameId}>{game.title}</li>
          ))
        )}
      </ul>
    </div>
  );
}
