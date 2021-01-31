import { useSelector } from "react-redux";

import { State } from "src/reducers";

function getBoard(state: State) {
  return state.board;
}

export function useBoard() {
  return useSelector(getBoard);
}
