import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [reset, doReset] = useState(0);

  const handleBoardSizeChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    setBoardSize(Number(e.currentTarget.value));
    doReset(prev => prev + 1);
  }

  const handleReset = () => doReset(prev => prev + 1);

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
            onChange={handleBoardSizeChange} />
          </div>
        <div className="item"><button type="button" onClick={handleReset}>Reset</button></div>
        <div className="item"><Board size={boardSize} reset={reset}/></div>
      </div>
    </div>
  );
}

export default App;
