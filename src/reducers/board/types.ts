import Immutable from "immutable";

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
