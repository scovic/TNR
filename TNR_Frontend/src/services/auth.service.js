import config from "_config/config";
import { SIGNEDIN } from "_state/userState";

export function signIn(username, password) {
  return fetch(`${config.url}/login`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(resp => resp.json())
    .then(json => {
      localStorage.setItem("accToken", json.access_token.toString());
      localStorage.setItem("state", SIGNEDIN);
      return true;
    })
    .catch(err => {
      console.error(err);
      return false;
    });
}

export function signUp(username, password, email) {
  return fetch(`${config.url}/register`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email
    })
  })
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
      return true;
    })
    .catch(err => {
      console.error(err);
      return false;
    });
}
