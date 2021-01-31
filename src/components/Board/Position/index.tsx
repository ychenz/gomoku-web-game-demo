import React from "react";

import * as S from "./styles";

interface Props {
  x: number;
  y: number;
}

export function Position(props: Props): React.ReactElement {
  return (
    <S.Root>
      <S.Horizontal />
      <S.Vertical />
    </S.Root>
  );
}
