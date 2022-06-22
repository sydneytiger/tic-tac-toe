import React, { useState, useCallback, useEffect } from 'react';
import Cell from '../Cell';
import { valueResolver, checkWin, ValueType } from '../../utils';
import './styles.css';

interface BoardProps {
  size: number;
  reset: number;
}

const Board = ({ size, reset }: BoardProps) => {
  // init data base on size
  const [data, setData] = useState<ValueType[][]>(Array(size).fill(Array(size).fill(0)));
  const [currentValue, setCurrentValue] = useState<(1 | -1)>(1);
  const [winner, setWinner] = useState<(ValueType)>(0);

  useEffect(() => {
    // avoid the unneccesary call on first render
    if(reset !== 0) {
      setData(Array(size).fill(Array(size).fill(0)));
      setWinner(0);
      setCurrentValue(1);
    }
  }, [reset]);
  
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
    <div>
      {
        data.map((row, rowIndex) => 
          <div className="row" key={rowIndex}>
           {
            row.map((val, colIndex) => 
                <Cell 
                  key={`${rowIndex}/${colIndex}`} 
                  value={val} 
                  onCellClick={() => onCellClick(rowIndex, colIndex)} />
              )
           }
          </div>
        )
      }
      {winner !== 0 && <div>The winner is {valueResolver(winner)}</div>}
    </div>
  )

}

export default Board;