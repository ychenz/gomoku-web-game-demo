import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Immutable from "immutable";

export const boardReducerName = "board";

interface InitBoard {
  dimension: number;
}

const initialState = {
  dimension: 15,
  positions: Immutable.List()
};

const boardSlice = createSlice({
  name: boardReducerName,
  initialState,
  reducers: {
    initBoard(state, action: PayloadAction<InitBoard>) {
      const { dimension } = action.payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.dimension = dimension;
    }
  }
});

export const {
  initBoard
} = boardSlice.actions;

export default boardSlice.reducer;
