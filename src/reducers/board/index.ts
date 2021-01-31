import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Immutable from "immutable";

export const boardReducerName = "board";

interface PositionAttributes {
  x: number;
  y: number;
  score: number;
  placeholder: "black"|"white"|null;
  moveCount: number; // the count of the move on this position
  isRecentMove: boolean; // highlight the current move position
  isHintMove: boolean; // highlight the current hint position
}

export class PositionRecord extends Immutable.Record<PositionAttributes>({
  x: 0,
  y: 0,
  score: 0,
  placeholder: null,
  moveCount: 0,
  isRecentMove: false,
  isHintMove: false
}){}

interface InitBoard {
  dimension: number;
}

const initialState = {
  dimension: 15,
  positions: Immutable.List<PositionRecord>()
};

const boardSlice = createSlice({
  name: boardReducerName,
  initialState,
  reducers: {
    initBoard(state, action: PayloadAction<InitBoard>) {
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
    }
  }
});

export const {
  initBoard
} = boardSlice.actions;

export default boardSlice.reducer;
