import React from 'react';
import { runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import './styles.css';
import { ValueType, StateCellType, StateType } from '../../utils/types';
import { valueResolver } from '../../utils';

interface CellProps {
  cellState: StateCellType;
  state: StateType;
}

export default observer(( { cellState, state }: CellProps) => {

  const value = cellState.value;

  const onCellClick = () => {
    console.log({ value, state });
    const currentValue = state.currentValue;
    runInAction(() => {
      cellState.value = currentValue;
      state.currentValue = currentValue === 1 ? -1 : 1
    });
  }

  return (
    <div className={`cell-frame ${!value && 'pointer'}`} onClick={onCellClick}>
      { valueResolver(value) }
    </div>
  );
})
