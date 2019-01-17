export function changeState(newState) {
  return {
    type: "STATECHANGED",
    newState: newState
  };
}
