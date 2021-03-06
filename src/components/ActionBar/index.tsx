import React from "react";
import { useDispatch } from "react-redux";

import { useBoard } from "src/reducers/board/hooks";
import { Player } from "src/reducers/board/types";
import { resetBoard, undoMove, showHint } from "src/reducers/board";

import IconCelebrate from "./IconCelebrate.svg";
import IconSkull from "./IconSkull.svg";
import * as S from "./styles";

export function ActionBar(): React.ReactElement {
  const dispatch = useDispatch();
  const board = useBoard();
  const { winner } = board;

  const onResetClick = () => {
    dispatch(resetBoard());
  };

  const onUndoClick = () => {
    dispatch(undoMove());
  };

  const onHintClick = () => {
    dispatch(showHint());
  };

  return (
    <S.Root>
      {winner === Player.black && (
        <>
          <S.ResultText>You WON!</S.ResultText>
          <S.IconContainer>
            <img src={IconCelebrate} alt="Icon Celebrate" />
          </S.IconContainer>
        </>
      )}

      {winner === Player.white && (
        <>
          <S.ResultText>You LOST!</S.ResultText>
          <S.IconContainer>
            <img src={IconSkull} alt="Icon Skull" />
          </S.IconContainer>
        </>
      )}

      {winner === "draw" && (
        <>
          <S.ResultText>GG it is a Draw!</S.ResultText>
          <S.IconContainer>
            <img src={IconCelebrate} alt="Icon Celebrate" />
          </S.IconContainer>
        </>
      )}

      {!winner && (
        <>
          <S.Button onClick={onUndoClick}>UNDO</S.Button>
          <S.Button onClick={onHintClick}>HINT</S.Button>
        </>
      )}

      <S.Button onClick={onResetClick}>RESET</S.Button>
    </S.Root>
  );
}
