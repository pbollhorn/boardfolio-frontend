export default function ToggleModeButton() {
  function toggleMode() {
    alert("hello world");
    let bsTheme = localStorage.getItem("bsTheme");
    if (bsTheme === null) {
      bsTheme = "dark";
    }
    alert(bsTheme);

    document.documentElement.setAttribute("data-bs-theme", "light");
  }

  return <button onClick={toggleMode}>Toggle light/dark mode</button>;
}
