import NoPoster from "../assets/NoPoster.png";

export default function GameListItem({ gameData }) {
  return (
    <div className="d-flex align-items-center mb-3 p-2 border rounded">
      <img
        className="me-3"
        src={
          gameData.posterPath
            ? "https://image.tmdb.org/t/p/w154" + gameData.posterPath
            : NoPoster
        }
      />
      <span className="fs-4 fw-semibold">{gameData.title}</span>
    </div>
  );
}
