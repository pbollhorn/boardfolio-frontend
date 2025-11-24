import NoPoster from "../assets/NoPoster.png";

export default function GameListItem({ game, isOwner = false, onRemove }) {
  const thumbnail =
    game.thumbnailURL || game.image || NoPoster;

  const canRemove = isOwner && typeof onRemove === "function";

  return (
    <div className="d-flex align-items-center mb-3">
      <div className="card me-2" style={{ width: "350px" }}>
        <div className="row g-0">
          <div className="col-4">
            <img
              src={thumbnail}
              className="img-fluid rounded-start"
              alt={game.title}
              style={{ objectFit: "cover", height: "100px" }}
            />
          </div>

          <div className="col-8">
            <div className="card-body p-2">
              <h5 className="card-title mb-1">{game.title}</h5>

              {game.releaseYear && (
                <p className="card-text mb-0">
                  <small className="text-body-secondary">
                    Released: {game.releaseYear}
                  </small>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {canRemove && (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onRemove(game.gameId)}
        >
          <i className="bi bi-trash"></i>
        </button>
      )}
    </div>
  );
}
