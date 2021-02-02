import { Player, PlayerType, PositionRecord } from "./reducers/board/types";

const attackScore = [0, 2, 18, 162, 1458];
const defenceScore = [0, 1, 9, 81, 729];

export function getBestMove(
  player: PlayerType,
  positionList: PositionRecord[],
  dimension: number
): PositionRecord[] {
  // Initializing a DxD array
  let board2D: PositionRecord[][] = Array.from(
    Array(dimension),
    () => new Array(dimension)
  );

  positionList.forEach((position) => {
    board2D[position.y][position.x] = position;
  });

  // Evaluating current situation and updating scores for all positions
  board2D = evalSituation(player, board2D, dimension);

  /**
   * Determine best position
   */
  let bestScore = 0;
  const midPoint = Math.floor(dimension/2);
  // Stores best position [r, c]. Solve the bug that if no point's score is larger than [7,7], ai does nothing.
  let bestPosition = !board2D[midPoint][midPoint].placeholder ? { r: midPoint, c: midPoint } : { r: 0, c: 0 };

  for (let r=0; r < dimension; r += 1 ) {
    for (let c=0; c < dimension; c += 1 ) {
      const currentScore = board2D[r][c].score;

      if ( currentScore > bestScore ) {
          bestScore = currentScore;
          bestPosition = { r, c };
      }

      // Clear score & isRecentMove (removes previous highlight)
      board2D[r][c] = new PositionRecord({
        ...board2D[r][c].toJS(),
        score: 0,
        isRecentMove: false
      });
    }
  }

  // White move to best possible spot
  board2D[bestPosition.r][bestPosition.c] = new PositionRecord({
    ...board2D[bestPosition.r][bestPosition.c].toJS(),
    placeholder: Player.white,
    isRecentMove: true
  });

  const newPositionsList = positionList.map(position => board2D[position.y][position.x]);

  return newPositionsList;
}

export function evalSituation(
  player: PlayerType,
  board: PositionRecord[][],
  dimension: number
): PositionRecord[][] {
  /**
   * Note: y = r, x = c
   */
  let pPlayer1;
  let pPlayer2;

  // scan all positions horizontally
  for (let r = 0; r < dimension; r += 1){
    for (let c = 0; c < dimension - 4; c += 1){
      pPlayer1 = 0;
      pPlayer2 = 0;

      for (let i = 0; i < 5; i += 1){
          if ( board[r][c+i].placeholder === Player.black ) pPlayer1 += 1; // num of black in these 5
          if ( board[r][c+i].placeholder === Player.white ) pPlayer2 += 1; // num of white in these 5
      }

      if ( pPlayer1 * pPlayer2 === 0 && pPlayer1 !== pPlayer2){
        for (let i = 0; i < 5; i += 1){
          if ( !board[r][c+i].placeholder ){
            const currentScore = board[r][c+i].score;

            if ( pPlayer1 === 0 ) {  // when no black in this 5 positions
              if (player === Player.black) {  // current player is black
                // Set new score
                board[r][c + i] = new PositionRecord({
                  ...board[r][c + i].toJS(),
                  score: currentScore + defenceScore[pPlayer2]
                });
              } else {  // current player is white
                  board[r][c + i] = new PositionRecord({
                  ...board[r][c + i].toJS(),
                  score: currentScore + attackScore[pPlayer2]
                });
              }
            }

            if ( pPlayer2 === 0 ){  // when no white in this 5 positions
              if ( player === Player.white ) { // current player is white
                board[r][c + i] = new PositionRecord({
                  ...board[r][c + i].toJS(),
                  score: currentScore + defenceScore[pPlayer1]
                });
              }else{  // current player is black
                board[r][c + i] = new PositionRecord({
                  ...board[r][c + i].toJS(),
                  score: currentScore + attackScore[pPlayer1]
                });
              }
            }

            // One more move to win or lost, doubling the score
            if ( pPlayer1 === 4 || pPlayer2 === 4 ){
              board[r][c + i] = new PositionRecord({
                ...board[r][c + i].toJS(),
                score: board[r][c+i].score * 2
              });
            }
          }
        }
      }
    }
  }

  // scan all positions vertically
  for (let c = 0; c < dimension; c += 1){
    for (let r = 0; r < dimension - 4; r += 1){
      pPlayer1 = 0;
      pPlayer2 = 0;

      for (let i = 0; i < 5; i += 1){
          if ( board[r+i][c].placeholder === Player.black ) pPlayer1 += 1; // num of black in these 5
          if ( board[r+i][c].placeholder === Player.white ) pPlayer2 += 1; // num of white in these 5
      }

      if ( pPlayer1 * pPlayer2 === 0 && pPlayer1 !== pPlayer2){
        for (let i = 0; i < 5; i += 1){
          if ( !board[r+i][c].placeholder ){
            const currentScore = board[r+i][c].score;

            if ( pPlayer1 === 0 ) {  // when no black in this 5 positions
              if (player === Player.black) {  // current player is black
                // Set new score
                board[r+i][c] = new PositionRecord({
                  ...board[r+i][c].toJS(),
                  score: currentScore + defenceScore[pPlayer2]
                });
              } else {  // current player is white
                  board[r+i][c] = new PositionRecord({
                  ...board[r+i][c].toJS(),
                  score: currentScore + attackScore[pPlayer2]
                });
              }
            }

            if ( pPlayer2 === 0 ){  // when no white in this 5 positions
              if ( player === Player.white ) { // current player is white
                board[r+i][c] = new PositionRecord({
                  ...board[r+i][c].toJS(),
                  score: currentScore + defenceScore[pPlayer1]
                });
              }else{  // current player is black
                board[r+i][c] = new PositionRecord({
                  ...board[r+i][c].toJS(),
                  score: currentScore + attackScore[pPlayer1]
                });
              }
            }

            // One more move to win or lost, doubling the score
            if ( pPlayer1 === 4 || pPlayer2 === 4 ){
              board[r+i][c] = new PositionRecord({
                ...board[r+i][c].toJS(),
                score: board[r+i][c].score * 2
              });
            }
          }
        }
      }
    }
  }

  // scan all positions from left-top to right-bottom
  for (let c = 0; c < dimension - 4; c += 1){
    for (let r = 0; r < dimension - 4; r += 1){
      pPlayer1 = 0;
      pPlayer2 = 0;

      for (let i = 0; i < 5; i += 1){
          if ( board[r+i][c+i].placeholder === Player.black ) pPlayer1 += 1; // num of black in these 5
          if ( board[r+i][c+i].placeholder === Player.white ) pPlayer2 += 1; // num of white in these 5
      }

      if ( pPlayer1 * pPlayer2 === 0 && pPlayer1 !== pPlayer2){
        for (let i = 0; i < 5; i += 1){
          if ( !board[r+i][c+i].placeholder ){
            const currentScore = board[r+i][c+i].score;

            if ( pPlayer1 === 0 ) {  // when no black in this 5 positions
              if (player === Player.black) {  // current player is black
                // Set new score
                board[r+i][c+i] = new PositionRecord({
                  ...board[r+i][c+i].toJS(),
                  score: currentScore + defenceScore[pPlayer2]
                });
              } else {  // current player is white
                  board[r+i][c+i] = new PositionRecord({
                  ...board[r+i][c+i].toJS(),
                  score: currentScore + attackScore[pPlayer2]
                });
              }
            }

            if ( pPlayer2 === 0 ){  // when no white in this 5 positions
              if ( player === Player.white ) { // current player is white
                board[r+i][c+i] = new PositionRecord({
                  ...board[r+i][c+i].toJS(),
                  score: currentScore + defenceScore[pPlayer1]
                });
              }else{  // current player is black
                board[r+i][c+i] = new PositionRecord({
                  ...board[r+i][c+i].toJS(),
                  score: currentScore + attackScore[pPlayer1]
                });
              }
            }

            // One more move to win or lost, doubling the score
            if ( pPlayer1 === 4 || pPlayer2 === 4 ){
              board[r+i][c+i] = new PositionRecord({
                ...board[r+i][c+i].toJS(),
                score: board[r+i][c+i].score * 2
              });
            }
          }
        }
      }
    }
  }

  // scan all positions from left-bottom to right-top
  for (let r = 4; r < dimension; r += 1){
    for (let c = 0; c < dimension - 4; c += 1){
      pPlayer1 = 0;
      pPlayer2 = 0;

      for (let i = 0; i < 5; i += 1){
          if ( board[r-i][c+i].placeholder === Player.black ) pPlayer1 += 1; // num of black in these 5
          if ( board[r-i][c+i].placeholder === Player.white ) pPlayer2 += 1; // num of white in these 5
      }

      if ( pPlayer1 * pPlayer2 === 0 && pPlayer1 !== pPlayer2){
        for (let i = 0; i < 5; i += 1){
          if ( !board[r-i][c+i].placeholder ){
            const currentScore = board[r-i][c+i].score;

            if ( pPlayer1 === 0 ) {  // when no black in this 5 positions
              if (player === Player.black) {  // current player is black
                // Set new score
                board[r-i][c+i] = new PositionRecord({
                  ...board[r-i][c+i].toJS(),
                  score: currentScore + defenceScore[pPlayer2]
                });
              } else {  // current player is white
                  board[r-i][c+i] = new PositionRecord({
                  ...board[r-i][c+i].toJS(),
                  score: currentScore + attackScore[pPlayer2]
                });
              }
            }

            if ( pPlayer2 === 0 ){  // when no white in this 5 positions
              if ( player === Player.white ) { // current player is white
                board[r-i][c+i] = new PositionRecord({
                  ...board[r-i][c+i].toJS(),
                  score: currentScore + defenceScore[pPlayer1]
                });
              }else{  // current player is black
                board[r-i][c+i] = new PositionRecord({
                  ...board[r-i][c+i].toJS(),
                  score: currentScore + attackScore[pPlayer1]
                });
              }
            }

            // One more move to win or lost, doubling the score
            if ( pPlayer1 === 4 || pPlayer2 === 4 ){
              board[r-i][c+i] = new PositionRecord({
                ...board[r-i][c+i].toJS(),
                score: board[r-i][c+i].score * 2
              });
            }
          }
        }
      }
    }
  }

  return board;
}
