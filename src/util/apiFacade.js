import { jwtDecode } from "jwt-decode";

//TODO: add deployed API URLs
// const BASE_URL = "";
// const LOGIN_ENDPOINT = "";
// const REGISTER_ENDPOINT = "";
// const CREATE_LIST_ENDPOINT = "";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
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

const createList = (username, listname) => {
  const options = makeOptions("POST", true, {
    username: username,
    listname: listname,
  });
  return fetch(
    BASE_URL + CREATE_LIST_ENDPOINT + "/" + username + "/" + listname,
    options
  ).then(handleHttpErrors);
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
  createList,
  makeOptions,
};

export default facade;
