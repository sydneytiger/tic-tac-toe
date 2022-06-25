import React from 'react';
import './styles.css';
import { ValueType } from '../../utils/types';
import { valueResolver } from '../../utils';

interface CellProps {
  value: ValueType;
  onCellClick: () => void
}

export default ( { value, onCellClick }: CellProps) => {

  return (
    <div className={`cell-frame ${!value && 'pointer'}`} onClick={onCellClick}>
      { valueResolver(value) }
    </div>
  );
}
