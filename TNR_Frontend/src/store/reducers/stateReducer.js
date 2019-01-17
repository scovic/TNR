import { SIGNEDIN, NOTSIGNEDIN } from "_state/userState";

const state = localStorage.getItem("state");
const initState = {
  state: state && state !== NOTSIGNEDIN ? SIGNEDIN : NOTSIGNEDIN
};

export default function stateReducer(initialState = initState, action) {
  switch (action.type) {
    case "STATECHANGED": {
      return { state: action.newState };
    }
    default: {
      return initialState;
    }
  }
}
