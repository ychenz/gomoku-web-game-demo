import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { initBoard, PositionRecord } from "src/reducers/board";

import { Position } from "./Position";
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
  }, [initBoardAction]);

  return (
    <S.Root>
      {[...Array(dimension).keys()].map(y => (
        <S.Row>
          {[...Array(dimension).keys()].map(x => (
            <Position x={x} y={y} />
          ))}
        </S.Row>
      ))}
    </S.Root>
  );
}

Board.defaultProps = {
  showBorder: true
};
