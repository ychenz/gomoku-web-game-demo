import styled from "styled-components";

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
`;

export const Button = styled.button`
  background: none;
  border: none;
  text-align: left;
  padding: 4px;
  font-weight: 500;
  font-family: "Saira, sans-serif";
  font-size: 16px;
  line-height: 20px;
  text-decoration-line: underline;
  margin-right: 24px;
  cursor: pointer;
  
  &:last-child {
    margin-right: 0;
  }
  
  &:hover {
    text-shadow: 0 0 1px black;
  }
`;

export const ResultText = styled.div`
  font-weight: 600;
  font-family: "Saira, sans-serif";
  font-size: 16px;
  line-height: 20px;
  margin-right: 24px;
`;

export const IconContainer = styled.div`
  margin-right: 24px;
  
  & > img {
    vertical-align: center;
  }
`;

export const Root = ActionBar;
