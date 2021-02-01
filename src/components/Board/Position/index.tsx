import React from "react";
import { useDispatch } from "react-redux";

import { usePosition, useBoard } from "src/reducers/board/hooks";
import { Player, placeMove, PlayerType } from "src/reducers/board";

import PositionHoverIcon from "./PositionHover.svg";
import * as S from "./styles";

interface Props {
  x: number;
  y: number;
}

export function Position(props: Props): React.ReactElement {
  const { x, y } = props;
  const dispatch = useDispatch();
  const position = usePosition(x, y);
  const board = useBoard();

  const onPositionClick = () => {
    dispatch(placeMove({ x, y, placeholder: Player.black }));
  };

  return (
    <S.Root disabled={Boolean(position?.placeholder)} onClick={onPositionClick}>
      <S.HoverIconContainer>
        <img src={PositionHoverIcon} alt="logo" />
      </S.HoverIconContainer>
      <S.Holder
        isVisible={Boolean(position?.placeholder)}
        placeHolder={position?.placeholder as PlayerType}
      />
      <S.Horizontal isBold={y === Math.floor(board.dimension / 2)} />
      <S.Vertical isBold={x === Math.floor(board.dimension / 2)} />
    </S.Root>
  );
}
