import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { initBoard } from "src/reducers/board";

import { Position } from "./Position";
import * as S from "./styles";

interface Props {
  dimension: number;
}

export function Board(props: Props): React.ReactElement {
  const { dimension } = props;
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
        <S.Row key={y}>
          {[...Array(dimension).keys()].map(x => (
            <Position key={`${y}-${x}`} x={x} y={y} />
          ))}
        </S.Row>
      ))}
    </S.Root>
  );
}
