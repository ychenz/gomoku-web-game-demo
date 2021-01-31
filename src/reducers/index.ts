import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./board";

const rootReducer = combineReducers({
  board: boardReducer,
});

export type State = ReturnType<typeof rootReducer>

export default rootReducer;