import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { initBoard } from "src/reducers/board";

import * as S from "./styles";

interface Props {
  dimension: number;
  showBorder?: boolean;
}

export function Board(props: Props): React.ReactElement {
  const { dimension, showBorder } = props;
  const dispatch = useDispatch();

  const initBoardAction = useCallback(() => {
    dispatch(initBoard({ dimension }));
  }, [dispatch, dimension]);

  useEffect(() => {
    initBoardAction();
  },[initBoardAction]);

  return (
    <S.Root>
      Board
    </S.Root>
  );
}

Board.defaultProps = {
  showBorder: true
};
