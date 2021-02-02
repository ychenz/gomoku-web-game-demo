import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Immutable from "immutable";

import { getBestMove } from "src/services";

import { Player, PositionRecord } from "./types";

const boardReducerName = "board";

/**
 * Interfaces for action payloads
 */
interface InitBoardPayload {
  dimension: number;
}

interface placeMovePayload {
  x: number;
  y: number;
  placeholder: string;
}

// Initial state
const initialState = {
  dimension: 15,
  positions: Immutable.List<PositionRecord>([])
};

const boardSlice = createSlice({
  name: boardReducerName,
  initialState,
  reducers: {
    initBoard(state, action: PayloadAction<InitBoardPayload>) {
      const { dimension } = action.payload;
      const positions: PositionRecord[] = [];

      [...Array(dimension).keys()].forEach(y => {
        [...Array(dimension).keys()].forEach(x => {
          positions.push(new PositionRecord({
            x,
            y,
          }));
        });
      });

      return {
        dimension,
        positions: Immutable.List(positions)
      };
    },
    placeMove(state, action: PayloadAction<placeMovePayload>) {
       const { x, y, placeholder } = action.payload;
       const prevPositions = state.positions;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let newPositions = prevPositions.map(position => (
        position.x === x && position.y === y ? new PositionRecord({
          ...position.toJS(),
          placeholder
        }): position
      ));

      // Bot making move
      newPositions = getBestMove(Player.white, newPositions, state.dimension);
      state.positions = newPositions;
    }
  }
});

export const {
  initBoard,
  placeMove
} = boardSlice.actions;

export default boardSlice.reducer;
