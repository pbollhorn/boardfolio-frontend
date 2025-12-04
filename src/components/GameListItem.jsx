import NoPoster from "../assets/NoPoster.png";

export default function GameListItem({ gameData }) {
  const poster = gameData.posterPath
    ? "https://image.tmdb.org/t/p/w342" + gameData.posterPath
    : NoPoster;

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={poster}
            className="img-fluid rounded-start"
            alt={gameData.title}
          />
        </div>
        <div className="col-md-8 d-flex align-items-center">
          <div className="card-body">
            <h5 className="card-title">{gameData.title}</h5>

            {gameData.releaseYear && (
              <p className="card-text">
                <small className="text-body-secondary">
                  Released: {gameData.releaseYear}
                </small>
              </p>
            )}

            {gameData.genre && (
              <p className="card-text">Genre: {gameData.genre}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
