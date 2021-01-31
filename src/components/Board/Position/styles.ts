import styled from "styled-components";

const width = "24px";

const Position = styled.button`
  width: ${width};
  height: ${width};
  position: relative;
  
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const Vertical = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  border-left: 1px solid black;
`;

export const Horizontal = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  border-top: 1px solid black;
`;


export const Root = Position;