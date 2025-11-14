import facade from "../util/apiFacade.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateList() {
  const [name, setListname] = useState("");
  const [isPublic, setPublic] = useState("");
  const [error, setError] = useState("");
  // const username = facade.loggedIn ? facade.getUsername() : null;
  const navigate = useNavigate();

  //TODO: hardcoded variables for testing
  const user = "testUser";

  const handleNewList = async (e) => {
    e.preventDefault();
    try {
      await facade.createList(user, name, isPublic);
      //TODO: navigate to page where you can add games to a list
      navigate(`/${user}/mylists`);
      // Optionally, use a toast instead of alert:
      // setSuccess("Registration successful!")  // if you want a green bubble
      alert("New list created, you can now add games to it!");
      setError("");
    } catch (err) {
      console.error("Creation list failed:", err);
      setError("Failed creating list: " + err.message);
    }

    console.log("Sending body:", {
      user: user,
      name: name,
      isPublic,
    });
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
          value={name}
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
