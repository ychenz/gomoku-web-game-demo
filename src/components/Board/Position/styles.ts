import styled from "styled-components";
import { Player, PlayerType } from "src/reducers/board/types";

const width = "24px";

const Position = styled.button<{ disabled: boolean }>`
  width: ${width};
  height: ${width};
  position: relative;
  
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1; // Should be placed above board and frame
  
  ${p => p.disabled && `
    pointer-events: none;
  `}
`;

export const Vertical = styled.div<{ isBold?: boolean }>`
  position: absolute;
  left: calc(50% - 0.5px); // need to consider 1px of border width
  top: 0;
  height: 100%;
  border-left: 1px solid black;

  ${p => p.isBold && `
    left: calc(50% - 1px);
    border-left: 2px solid black;
  `}
`;

export const Horizontal = styled.div<{ isBold?: boolean }>`
  position: absolute;
  top: calc(50% - 0.5px); // need to consider 1px of border width
  left: 0;
  width: 100%;
  border-top: 1px solid black;
  
  ${p => p.isBold && `
    top: calc(50% - 1px);
    border-top: 2px solid black;
  `}
`;

export const Holder = styled.div<{ isVisible: boolean, placeHolder: PlayerType }>`
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid black;
  left: 3px;
  top: 3px;
  background: black;
  border-radius: 50%;
  
  ${p => p.placeHolder === Player.white && `
    background: white;
    z-index: 1;
  `};
  
  // Animation
  opacity: 0;
  transition: opacity .2s ease;
  
  ${p => p.isVisible && `
    opacity: 1;
  `};
`;

export const HoverIconContainer = styled.div`
  display: none;
  position: absolute;
  top: -1.5px;
  left: -1.5px;
  
  ${Position}:hover & {
    display: inherit;
  }
`;

export const PositionHighlight = styled.div`
  height: 4px;
  width: 4px;
  position: absolute;
  top: 10px;
  left: 10px;
  background: black;
  z-index: 2;
`;

export const HintMove = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 4px;
  top: 4px;
  background: rgba(0, 0, 0, 0.3);
  transform: rotate(45deg);
`;

export const Root = Position;