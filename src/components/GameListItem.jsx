import NoPoster from "../assets/NoPoster.png";

export default function GameListItem({
  game,
  isOwner = false,
  onRemove,
}) {
  const thumbnail = game.thumbnailURL || game.thumbnail || game.image || NoPoster;

  const canRemove = isOwner && typeof onRemove === "function";

  return (
    <div className="d-flex align-items-center mb-3 p-2 border rounded">
      <img
        className="me-3 rounded"
        src={thumbnail}
        style={{ width: "70px", height: "70px", objectFit: "cover" }}
        alt={game.title}
      />

      <div className="flex-grow-1">
        <div className="fs-5 fw-semibold">{game.title}</div>

        {/* Optional metadata if you want */}
        {game.releaseYear && <div className="text-muted small">{game.releaseYear}</div>}
      </div>

      {/* Remove button only if owner & not collection */}
      {canRemove && (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(game.gameId)}
        >
          Remove
        </button>
      )}
    </div>
  );
}
