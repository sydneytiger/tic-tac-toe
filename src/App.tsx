import React, { useState, useMemo } from "react";
import { makeAutoObservable } from "mobx";
import { initGameResult } from "./utils";
import { StateType, StateRowType, StateCellType } from "./utils/types";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [reset, doReset] = useState(0);

  const handleBoardSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardSize(Number(e.currentTarget.value));
    doReset((prev) => prev + 1);
  };

  const handleReset = () => doReset((prev) => prev + 1);

  const initState = useMemo(() => {
    const state = makeAutoObservable<StateType>({
      rows: [],
      currentValue: 1,
      gameResult: initGameResult(boardSize),
      winner: 0
    });

    for (let i = 0; i < boardSize; i++) {
      const row = makeAutoObservable<StateRowType>({ cells: [] });
      for (let j = 0; j < boardSize; j++) {
        row.cells.push(
          makeAutoObservable<StateCellType>({ value: 0 })
        );
      }
      state.rows.push(row);
    }

    return state;
  }, [boardSize, reset]);

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <label htmlFor="boardSize">Board size: </label>
          <input
            type="number"
            name="boardSize"
            value={boardSize}
            min="3"
            max="100"
            className="board-size-input"
            onChange={handleBoardSizeChange}
          />
        </div>
        <div className="item">
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="item">
          <Board size={boardSize} reset={reset} state={initState} />
        </div>
      </div>
    </div>
  );
}

export default App;
