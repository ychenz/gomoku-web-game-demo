import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "immutable";

import {
  convertTo2DBoard,
  makeBestMove,
  checkWinner,
  evalSituation,
  getBestMoveAndResetScore
} from "src/services";

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

export interface BoardState {
  dimension: number;
  positions: List<PositionRecord>;
  currentMove: number;
  winner: PlayerType|null|"draw";
}

// Initial state
const initialState: BoardState = {
  dimension: 15,
  positions: List<PositionRecord>(),
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
        positions: List(positions)
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
        positions: List(newPositions)
      };
    },
    undoMove(state) {
      const { positions, currentMove } = state;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const newPositions = positions.map(position => {
        if (position.moveCount === currentMove || position.moveCount === currentMove - 1) {
          return new PositionRecord({
            ...position.toJS(),
            placeholder: null,
            moveCount: 0,
            isRecentMove: false,
            isHintMove: false  // Clear any hint
          });
        }

        // Setting highlight for most recent move after undo
        // (only if there is a placeholder)
        if (position.moveCount === currentMove - 2 && position.placeholder) {
          return new PositionRecord({
            ...position.toJS(),
            isRecentMove: true
          });
        }

        return position;
      });

      state.positions = newPositions;
      // Current move can't be less than 0
      state.currentMove = Math.max(currentMove - 2, 0);
    },
    showHint(state) {
      /**
       * Showing hint for human player: black
       */
      const { positions, dimension } = state;

      // Expand to 2D board for easier access
      const typedPositions = positions as unknown as List<PositionRecord>; // fix typing
      let board2D = convertTo2DBoard(typedPositions, dimension);
      board2D = evalSituation(Player.black, board2D, dimension);
      const bestPosition = getBestMoveAndResetScore(board2D, dimension);

      // Showing hint position
      const newPositions = typedPositions.map(position => (
        position.x === bestPosition.c && position.y === bestPosition.r ? new PositionRecord({
          ...position.toJS(),
          isHintMove: true
        }) : position
      ));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.positions = newPositions;
    },
    placeMove(state, action: PayloadAction<placeMovePayload>) {
       const { x, y, placeholder } = action.payload;
       const { positions, currentMove, dimension } = state;
       let moveCount = currentMove + 1;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      let newPositions = positions.map(position => (
        position.x === x && position.y === y ? new PositionRecord({
          ...position.toJS(),
          placeholder,
          moveCount
        }): position
      ));

      // Expand to 2D board for easier access
      let board2D = convertTo2DBoard(newPositions, dimension);

      // Check if black wins
      let winner = checkWinner(board2D, dimension);

      if (winner) {
        state.positions = newPositions;
        state.currentMove = moveCount;
        state.winner = winner;

        return;
      }

      // White (bot) making move
      moveCount += 1;
      board2D = makeBestMove(Player.white, board2D, dimension, moveCount);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newPositions = newPositions.map(position => board2D[position.y][position.x]);

      // Check if white wins
      winner = checkWinner(board2D, dimension);

      state.positions = newPositions;
      state.currentMove = moveCount;
      state.winner = winner;
    }
  }
});

export const {
  initBoard,
  resetBoard,
  undoMove,
  showHint,
  placeMove
} = boardSlice.actions;

export default boardSlice.reducer;
