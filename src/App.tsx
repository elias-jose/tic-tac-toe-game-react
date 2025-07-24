import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board() {
  const [isXNext, setXIsNext] = useState(true);
  const [square, setSquare] = useState(Array(9).fill(null));

  function handleClick(i: number) {
    if (calculateWinner(square) || square[i]) {
      return;
    }

    const nextSquare = square.slice();
    if (isXNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }

    setSquare(nextSquare);
    setXIsNext(!isXNext);
  }

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Vencedor: " + winner;
  } else {
    status = "Jogador: " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
      </div>
      <div className="board-row">
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
        <Square value={square[9]} onSquareClick={() => handleClick(9)} />
      </div>
    </>
  );
}

export default function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
