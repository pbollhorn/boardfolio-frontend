import facade from "../util/apiFacade.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateList() {
  const [listname, setListname] = useState("");
  const [error, setError] = useState("");
  const username = facade.loggedIn ? facade.getUsername() : null;
  const navigate = useNavigate();

  const handleNewList = async (e) => {
    e.preventDefault();
    try {
      await facade.post(username, listname);
      //TODO: navigate to page where you can add games to a list
      navigate("/search");
      // Optionally, use a toast instead of alert:
      // setSuccess("Registration successful!")  // if you want a green bubble
      alert("New list created, you can now add games to it!");
      setError("");
    } catch (err) {
      console.error("Creation list failed:", err);
      setError("Failed creating list: " + err.message);
    }
  };

  return (
    <div className="container">
      <h3>Create a new list!</h3>
      <form onSubmit={handleNewList}>
        <input
          type="text"
          id="listname"
          name="listname"
          placeholder="Write list name here"
          value={listname}
          onChange={(e) => setListname(e.target.value)}
        />
        <br />
        <input type="checkbox" id="public" value="public" />
        <label for="html">Public</label>
        <br />
        <button type="submit" id="bt-createList">
          Create List
        </button>
      </form>
      {/* TODO: show error in a better way*/}
      <h3>{error}</h3>
    </div>
  );
}
