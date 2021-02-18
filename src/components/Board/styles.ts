import styled from "styled-components";

const Board = styled.div`
  width: 396px;
  height: 396px;
`;

export const Root = Board;

export const Row = styled.div`
  display: flex;
`;

export const Frame = styled.div`
   padding: 16px;
   background: transparent;
   border: 2px solid black;
   position: relative;
`;

export const FrameDecoratorContainer = styled.div<{
  topAligned?: boolean;
  leftAligned?: boolean;
  bottomAligned?: boolean;
  rightAligned?: boolean
}>`
  position: absolute;
  // Place decorator to corners while covering frame border
  ${p => p.topAligned && "top: -2px;"};
  ${p => p.leftAligned && "left: -2px;"};
  ${p => p.bottomAligned && "bottom: -2px;"};
  ${p => p.rightAligned && "right: -2px;"};
  
  height: 28px;
  width: 28px;
  background: #f0f0f0;
`;

export const FrameDecorator = styled.div<{
  topAligned?: boolean;
  leftAligned?: boolean;
  bottomAligned?: boolean;
  rightAligned?: boolean
}>`
  height: 8px;
  width: 8px;
  background: black;
  position: absolute;
  
  ${p => p.topAligned && "top: -2px;"};
  ${p => p.leftAligned && "left: -2px;"};
  ${p => p.bottomAligned && "bottom: -2px;"};
  ${p => p.rightAligned && "right: -2px;"};
`;
