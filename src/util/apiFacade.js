//TODO: remember to install package: npm install jwt-decode
import { jwtDecode } from "jwt-decode";

//TODO: add deployed API URLs
const dev = true;

const BASE_URL = dev ? "http://localhost:7070/api" : ""; //TODO: set deployed URL here
const LOGIN_ENDPOINT = "/auth/login";
const REGISTER_ENDPOINT = "/auth/register";
const CREATE_LIST_ENDPOINT = "/list/add";
const UPDATE_LIST_ENDPOINT = "/list/update";
const GAMES_DEV = "/games/dev"; // populates the database with test data
const USER_GAMES_ENDPOINT = "/list";
const DELETE_LIST_ENDPOINT = "/remove";

async function handleHttpErrors(res) {
  if (!res.ok) {
    const errMsg = await res.text();
    throw { status: res.status, fullError: errMsg };
  }

  // If there is no content, don't parse JSON
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

const getUsername = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.username || decoded.sub || decoded.name || null;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

const getUserId = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.userId || decoded.sub || decoded.name || null;
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

const login = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
    });
};

const register = (user, password) => {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + REGISTER_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
    });
};

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
};

const logout = () => {
  localStorage.removeItem("jwtToken");
};

const getUserLists = (username) => {
  const options = makeOptions("GET", true);
  return fetch(BASE_URL + USER_GAMES_ENDPOINT + "/" + username, options).then(
    handleHttpErrors
  );
};

const createList = (username, listname, isPublic) => {
  const options = makeOptions("POST", true, {
    name: listname,
    public: isPublic,
    user: { username },
  });
  return fetch(BASE_URL + CREATE_LIST_ENDPOINT, options).then(handleHttpErrors);
};

const updateList = (username, { gameList }, isPublic) => {
  const options = makeOptions("PUT", true, {
    listID: gameList.listID,
    name: gameList.name,
    customList: gameList.customList,
    public: isPublic,
    user: { username },
  });
  return fetch(
    BASE_URL + UPDATE_LIST_ENDPOINT + "/" + gameList.listID,
    options
  ).then(handleHttpErrors);
};

const removeList = (listID) => {
  const options = makeOptions("DELETE", true, {
    listID: listID,
  });
  return fetch(BASE_URL + DELETE_LIST_ENDPOINT + "/" + listID, options).then(
    handleHttpErrors
  );
};

const makeOptions = (method, addToken, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const facade = {
  setToken,
  getToken,
  loggedIn,
  login,
  register,
  logout,
  getUsername,
  getUserId,
  getUserLists,
  createList,
  updateList,
  removeList,
  makeOptions,
};

export default facade;
