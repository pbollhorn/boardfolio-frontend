import styles from "../styles/SearchGames.module.css"
export default function SearchGames() {
return(
    
 <div class="container">
  <h1>Search for games</h1>
  <input type="text" placeholder="Search for games" class="search-input" />
  <button class="search-button">
    <span class="material-symbols-outlined">search</span>
  </button>
</div>
);
} 
