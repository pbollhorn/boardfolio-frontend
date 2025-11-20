import facade from "../util/apiFacade.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";
import LoginForm from "../components/LoginForm.jsx";

export default function CreateList() {
  const [listName, setListname] = useState("");
  const { isLoggedIn, username } = useAuth();
  const [isPublic, setPublic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNewList = async (e) => {
    e.preventDefault();
    try {
      await facade.createList(username, listName, isPublic);
      //TODO: navigate to page where you can add games to a list
      navigate(`/${username}/mylists`);
      // Optionally, use a toast instead of alert:
      // setSuccess("Registration successful!")  // if you want a green bubble
      alert("New list created, you can now add games to it!");
      setError("");
    } catch (err) {
      console.error("Creation list failed:", err);
      setError("Failed creating list: " + err.message);
    }
  };

  // If not logged in, show loginform
  // Can't create lists if you don't have a useraccount
  if (!isLoggedIn) {
    return (
      <div>
        <h2>You must first login to create a list</h2>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Create a new list!</h3>
      <form onSubmit={handleNewList}>
        <input
          type="text"
          id="listname"
          name="listname"
          placeholder="Write list name here"
          value={listName}
          onChange={(e) => setListname(e.target.value)}
        />
        <br />
        <input
          type="checkbox"
          id="public"
          checked={isPublic}
          onChange={(e) => setPublic(e.target.checked)}
        />
        <label htmlFor="public">Public</label>
        <br />
        <button type="submit" id="bt-createList">
          Create List
        </button>
      </form>
    </div>
  );
}
