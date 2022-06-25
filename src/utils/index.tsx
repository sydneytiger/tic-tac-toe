import { ChessType, GameDataType, GameResult, ValueType } from './types';

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

export const checkWinner = (gameResult: GameResult, boardSize: number, currentVal: ChessType) => {
  const valueToWin = boardSize * currentVal;
  console.log(`valueToWin ${valueToWin}`);
  
  for(let i = 0; i < gameResult.rowResult.length; i++) {
    console.log(`i ${i}`);
    if(gameResult.rowResult[i] === valueToWin) return true;
  }

  for(let j = 0; j < gameResult.colResult.length; j++) {
    console.log(`j ${j}`);
    if(gameResult.colResult[j] === valueToWin) return true;
  }

  if(gameResult.forwardResult === valueToWin) return true;
  if(gameResult.backwardResult === valueToWin) return true;

  return false;
}

export const updateGameDataWithClone = (gameData: GameDataType, currentVal: ChessType, row: number, col: number): GameDataType => {
  // clone the board data. It results in whole board rerender
  const newData = gameData.map(x => x.slice());
  newData[row][col] = currentVal;
  return newData;
}

export const initGameResult = (size: number): GameResult => {
  return {
    rowResult: Array(size).fill(0),
    colResult: Array(size).fill(0),
    forwardResult: 0,
    backwardResult: 0
  }
}