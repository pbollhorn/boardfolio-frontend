export default function ToggleThemeButton() {
  function toggleTheme() {
    // Read theme from localStorage
    // Default to "dark" if theme is not in localStorage
    const theme = localStorage.getItem("theme") ?? "dark";

    // Toggle theme
    const newTheme = theme === "dark" ? "light" : "dark";

    // Apply new theme
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
  }

  return (
    <button onClick={toggleTheme} className="btn btn-primary">
      Toggle light/dark theme
    </button>
  );
}
