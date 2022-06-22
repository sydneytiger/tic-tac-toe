import React, { useState, useCallback } from 'react';
import Cell from '../Cell';
import { valueResolver, type ValueType } from '../../utils';
import './styles.css';

interface BoardProps {
  size: number;
}

const Board = ({size}: BoardProps) => {
  // init data base on size
  const [data, setData] = useState<ValueType[][]>(Array(size).fill(Array(size).fill(0)));
  const [currentValue, setCurrentValue] = useState<(1 | -1)>(1);
  const [winner, setWinner] = useState<(ValueType)>(0);
  
  const checkWin = useCallback((gameData: ValueType[][], currentVal: 1 | -1) => {
    // validate row
    for(let row = 0; row < gameData.length; row++) {
      let win = true;
      for(let col = 0; col < gameData[row].length; col++) {
        if(gameData[row][col] !== currentVal) win = false;
      }

      if(win) return true;
    }

    // validate column
    for(let col = 0; col < gameData[0].length; col++) {
      let win = true;
      for(let row = 0; row < gameData.length; row++) {
        if(gameData[row][col] !== currentVal) win = false;
      }

      if(win) return true;
    }

    // validate diagonal
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
  }, []);

  const onCellClick = useCallback((row: number, col: number): void => {
    if(winner) return;

    const selectedCellValue = data[row][col];

    if(selectedCellValue === 0) {
      const newData = data.map(x => x.slice());
      newData[row][col] = currentValue;
      setData(newData);
      setCurrentValue(currentValue === 1 ? -1 : 1);
      checkWin(newData, currentValue) && setWinner(currentValue);
    }
  }, [data, currentValue]);

  return (
    <div className="board-container">
      {
        data.map((row, rowIndx) => 
          row.map((val, colIndex) => <Cell key={`${rowIndx}/${colIndex}`} value={val} onCellClick={() => onCellClick(rowIndx, colIndex)} />)
        )
      }
      {winner !== 0 && <div>The winner is {valueResolver(winner)}</div>}
    </div>
  )

}

export default Board;