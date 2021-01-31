import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./board";

const rootReducer = combineReducers({
  board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;