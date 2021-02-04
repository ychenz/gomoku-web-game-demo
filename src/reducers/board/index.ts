import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Immutable from "immutable";

import { convertTo2DBoard, makeBestMove, checkWinner } from "src/services";

import { Player, PlayerType, PositionRecord } from "./types";

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

type BoardState = {
  dimension: number;
  positions: Immutable.List<PositionRecord>;
  currentMove: number;
  winner: PlayerType|null|"draw";
}

// Initial state
const initialState: BoardState = {
  dimension: 15,
  positions: Immutable.List<PositionRecord>([]),
  currentMove: 0,
  winner: null
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
          positions.push(new PositionRecord({ x, y }));
        });
      });

      return {
        ...state,
        dimension,
        positions: Immutable.List(positions)
      };
    },
    resetBoard(state) {
      const { dimension } = state;
      const newPositions: PositionRecord[] = [];

      [...Array(dimension).keys()].forEach(y => {
        [...Array(dimension).keys()].forEach(x => {
          newPositions.push(new PositionRecord({ x, y }));
        });
      });

      return {
        ...state,
        winner: null,
        currentMove: 0,
        positions: Immutable.List(newPositions)
      };
    },
    placeMove(state, action: PayloadAction<placeMovePayload>) {
       const { x, y, placeholder } = action.payload;
       const prevPositions = state.positions;
       let moveCount = state.currentMove + 1;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let newPositions: PositionRecord[] = prevPositions.map(position => (
        position.x === x && position.y === y ? new PositionRecord({
          ...position.toJS(),
          placeholder,
          moveCount
        }): position
      ));

      // Expand to 2D board for easier access
      let board2D = convertTo2DBoard(newPositions, state.dimension);

      // Check if black wins
      let winner = checkWinner(board2D, state.dimension);

      if (winner) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.positions = newPositions;
        state.currentMove = moveCount;
        state.winner = winner;

        return;
      }

      // White (bot) making move
      moveCount += 1;
      board2D = makeBestMove(Player.white, board2D, state.dimension, moveCount);

      newPositions = newPositions.map(position => board2D[position.y][position.x]);

      // Check if white wins
      winner = checkWinner(board2D, state.dimension);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.positions = newPositions;
      state.currentMove = moveCount;
      state.winner = winner;
    }
  }
});

export const {
  initBoard,
  resetBoard,
  placeMove
} = boardSlice.actions;

export default boardSlice.reducer;
