import styles from "../styles/SearchGames.module.css";

export default function SearchGames() {
  return (
    <>
      <div className="container">
       
        <div className="search-container">
            <h1>Search For Games</h1>
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit"><i className="fa fa-search"></i></button>
          </form>
        </div>
      </div>
    </>
  );
}
