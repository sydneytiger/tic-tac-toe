export type ValueType = -1 | 0 | 1;
export type ChessType = -1 | 1;
export type GameDataType = ValueType[][];

export const valueResolver = (value: ValueType) => value === -1 ? '❌' : value === 1 ? '⭕' : '';

export const checkWin = (gameData: GameDataType, currentVal: ChessType) => {
  // validate horizontally
  for(let row = 0; row < gameData.length; row++) {
    let win = true;
    for(let col = 0; col < gameData[row].length; col++) {
      if(gameData[row][col] !== currentVal) win = false;
    }

    if(win) return true;
  }

  // validate vertically
  for(let col = 0; col < gameData[0].length; col++) {
    let win = true;
    for(let row = 0; row < gameData.length; row++) {
      if(gameData[row][col] !== currentVal) win = false;
    }

    if(win) return true;
  }

  // validate diagonally
  {
    let win = true;
    const max = gameData[0].length - 1;
    for(let row = 0; row < gameData.length; row++) {
      if(gameData[row][max - row] !== currentVal) win = false;
    }
    if(win) return true;
  }

  {
    let win = true;
    for(let row = 0; row < gameData.length; row++) {
      if(gameData[row][row] !== currentVal) win = false;
    }
    if(win) return true;
  }

  return false;
}

export const updateGameDataWithClone = (gameData: GameDataType, currentVal: ChessType, row: number, col: number): GameDataType => {
  // clone the board data. It results in whole board rerender
  const newData = gameData.map(x => x.slice());
  newData[row][col] = currentVal;
  return newData;
}
