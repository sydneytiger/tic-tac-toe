import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { observer } from "mobx-react-lite";
import Cell from '../Cell';
import { valueResolver, checkWinner, initGameResult, updateGameDataWithClone } from '../../utils';
import { ValueType, GameDataType, StateType } from '../../utils/types';
import './styles.css';

interface BoardProps {
  size: number;
  reset: number;
  state: StateType
}

const Board = observer(({ size, reset, state }: BoardProps) => {
  // const [currentValue, setCurrentValue] = useState<(1 | -1)>(1);
  const [winner, setWinner] = useState<(ValueType)>(0);

  // useEffect(() => {
  //   // avoid the unneccesary call on first render
  //   if(reset !== 0) {
  //     setData(Array(size).fill(Array(size).fill(0)));
  //     setWinner(0);
  //     setCurrentValue(1);
  //   }
  // }, [reset]);

  // const gameResult = useMemo(() => initGameResult(size), [size, reset])
  
  // const onCellClick = useCallback((row: number, col: number): void => {
    // if(winner) return;

    // const selectedCellValue = data[row][col];

    // console.log(`row: ${row}, col: ${col}`);
    // gameResult.rowResult[row] += currentValue;
    // gameResult.colResult[col] += currentValue;
    // if(row === col) gameResult.backwardResult += currentValue;
    // if(row + col === size - 1) gameResult.forwardResult += currentValue;
    // console.log(gameResult);

    // if(selectedCellValue === 0) {
    //   const newGameData = updateGameDataWithClone(data, currentValue, row, col)
    //   setData(newGameData);
    //   setCurrentValue(currentValue === 1 ? -1 : 1);
    //   checkWinner(gameResult, size, currentValue) && setWinner(currentValue);
    // }
  // }, [currentValue]);

  return (
    <div>
      {
        state.rows.map((row, rowIndex) => 
          <div className="row" key={rowIndex}>
           {
            row.cells.map((cellState, colIndex) => 
                <Cell 
                  key={`${rowIndex}/${colIndex}`} 
                  cellState={cellState} 
                  state={state} />
              )
           }
          </div>
        )
      }
      {winner !== 0 && <div>The winner is {valueResolver(winner)}</div>}
    </div>
  )

});

export default Board;