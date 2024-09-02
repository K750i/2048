import React from 'react';
import Square from './Square';
import generateRandomNum from '../utils/generateRandomNum';

function Grid({ width }) {
  const [squares, setSquares] = React.useState(() =>
    generate(Array(width * width).fill(0), 2)
  );

  React.useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.code) {
        case 'ArrowLeft':
          break;
        case 'ArrowRight':
          moveRight();
          addRows();
          break;
        case 'ArrowUp':
          break;
        case 'ArrowDown':
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  function generate(arr, times = 1) {
    const listOfNums = [...arr];

    for (let i = 0; i < times; i++) {
      let randomIndex = generateRandomNum(listOfNums.length);
      while (listOfNums[randomIndex] !== 0) {
        randomIndex = generateRandomNum(listOfNums.length);
      }
      listOfNums[randomIndex] = Math.random() < 0.8 ? 2 : 4;
    }
    return listOfNums;
  }

  function moveRight() {
    setSquares((prevSquares) => {
      const oriSquares = [];
      const newSquares = [];

      for (let i = 0; i < prevSquares.length; i++) {
        if (i % 4 === 0) {
          const originalRow = [
            prevSquares[i],
            prevSquares[i + 1],
            prevSquares[i + 2],
            prevSquares[i + 3],
          ];
          oriSquares.push(...originalRow);

          const numberedRow = originalRow.filter((n) => n);
          const zerosArr = Array(4 - numberedRow.length).fill(0);
          const newRow = [...zerosArr, ...numberedRow];
          newSquares.push(...newRow);
        }
      }

      if (JSON.stringify(oriSquares) === JSON.stringify(newSquares)) {
        return newSquares;
      }

      return generate(newSquares);
    });
  }

  function addRows() {
    setSquares((prevSquares) => {
      const newSquares = [...prevSquares];

      for (let i = 0; i < newSquares.length; i++) {
        if (i % 4 === 0) {
          // iterate backwards from each row
          for (let j = i + 3; j > i; j--) {
            if (newSquares[j] === newSquares[j - 1]) {
              newSquares[j] *= 2;
              newSquares[j - 1] = 0;
            }
          }
        }
      }

      return newSquares;
    });
  }

  return (
    <div className="grid">
      {squares.map((v, i) => (
        <Square key={i} value={v} />
      ))}
    </div>
  );
}

export default Grid;
