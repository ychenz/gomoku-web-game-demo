import { useSelector } from "react-redux";

import { State } from "src/reducers";
import { BoardState } from "src/reducers/board";
import { PositionRecord } from "../types";

function getBoard(state: State) {
  return state.board;
}

function getPositions(state: State) {
  return state.board.positions;
}

export function useBoard(): BoardState {
  return useSelector(getBoard);
}

// Find the state for a position on the board
export function usePosition(x: number, y: number): PositionRecord|undefined {
  return useSelector(getPositions).find(position => (
    position.x === x && position.y === y
  ));
}
