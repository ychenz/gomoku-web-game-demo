import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Immutable from "immutable";

const boardReducerName = "board";

export const BLACK_MOVE = "black";
export const WHITE_MOVE = "white";

export const Player = {
  black: "black",
  white: "white"
} as const;

export type PlayerType = (typeof Player)[keyof typeof Player];

interface PositionAttributes {
  x: number;
  y: number;
  score: number;
  placeholder: PlayerType|null; // BLACK_MOVE or WHITE_MOVE or null
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
      const newPositions = prevPositions.map(position => (
        position.x === x && position.y === y ? new PositionRecord({
          ...position.toJS(),
          placeholder
        }): position
      ));

      state.positions = newPositions;
    }
  }
});

export const {
  initBoard,
  placeMove
} = boardSlice.actions;

export default boardSlice.reducer;
