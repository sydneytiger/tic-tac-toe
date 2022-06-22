import React, { useState, useCallback } from 'react';
import Cell from '../Cell';
import { valueResolver, checkWin, type ValueType } from '../../utils';
import './styles.css';

interface BoardProps {
  size: number;
}

const Board = ({size}: BoardProps) => {
  // init data base on size
  const [data, setData] = useState<ValueType[][]>(Array(size).fill(Array(size).fill(0)));
  const [currentValue, setCurrentValue] = useState<(1 | -1)>(1);
  const [winner, setWinner] = useState<(ValueType)>(0);
  
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
        data.map((row, rowIndx) => 
          <div className="row">
           {
            row.map((val, colIndex) => 
                <Cell 
                  key={`${rowIndx}/${colIndex}`} 
                  value={val} 
                  onCellClick={() => onCellClick(rowIndx, colIndex)} />
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