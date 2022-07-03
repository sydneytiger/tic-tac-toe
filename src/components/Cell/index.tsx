import React from 'react';
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import './styles.css';
import { ValueType, StateCellType, StateType } from '../../utils/types';
import { valueResolver, checkWinner } from '../../utils';

interface CellProps {
  rowIndex: number;
  colIndex: number;
  cellState: StateCellType;
  state: StateType;
}

export default observer(( { rowIndex, colIndex, cellState, state }: CellProps) => {

  const value = cellState.value;

  const onCellClick = () => {
    if(state.winner !== 0) return;
    const currentValue = state.currentValue;
    const winnerResult = checkWinningResult();
    
    runInAction(() => {
      cellState.value = currentValue;
      state.winner = winnerResult;
      state.currentValue = currentValue === 1 ? -1 : 1;
    });
  }

  const checkWinningResult = (): ValueType => {
    const selectedCellValue = state.rows[rowIndex].cells[colIndex].value;
    const currentVal = state.currentValue;
    const size = state.rows.length;
    
    state.gameResult.rowResult[rowIndex] += currentVal;
    state.gameResult.colResult[colIndex] += currentVal;
    if(rowIndex === colIndex) state.gameResult.backwardResult += currentVal;
    if(rowIndex + colIndex === size - 1) state.gameResult.forwardResult += currentVal;

    return selectedCellValue === 0 
      ? checkWinner(state.gameResult, size, currentVal) 
      : 0;
  }

  const isEnabled = () => {
    return !value && state.winner === 0;
  }

  return (
    <div className={`cell-frame ${isEnabled() && 'pointer'}`} onClick={onCellClick}>
      { valueResolver(value) }
    </div>
  );
})
