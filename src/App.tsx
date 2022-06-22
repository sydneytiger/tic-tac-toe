import React from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import Cell from './components/Cell';

function App() {
  return (
    <div className="App">
      <Board size={4} />
    </div>
  );
}

export default App;
