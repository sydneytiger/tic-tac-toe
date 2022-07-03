import { observer } from "mobx-react-lite";
import Cell from "../Cell";
import { valueResolver } from "../../utils";
import { StateType } from "../../utils/types";
import "./styles.css";

interface BoardProps {
  size: number;
  reset: number;
  state: StateType;
}

const Board = observer(({ size, reset, state }: BoardProps) => {
  return (
    <div>
      {state.rows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.cells.map((cellState, colIndex) => (
            <Cell
              key={`${rowIndex}/${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              cellState={cellState}
              state={state}
            />
          ))}
        </div>
      ))}
      {state.winner !== 0 && (
        <div>The winner is {valueResolver(state.winner)}</div>
      )}
    </div>
  );
});

export default Board;
