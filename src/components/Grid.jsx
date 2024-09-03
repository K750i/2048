import React from 'react';
import Square from './Square';
import generateRandomNum from '../utils/generateRandomNum';
import logArrayWithColumns from '../utils/logArrayCol';

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
    // logArrayWithColumns(arr, 4);
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
      const { initial: oriSquares, result: newSquares } = shiftRight(...prevSquares);

      const nextSquares = combineNumbers(...newSquares);

      const { result: result } = shiftRight(...nextSquares);

      if (JSON.stringify(oriSquares) === JSON.stringify(result)) {
        return oriSquares;
      }

      return generate(result);

      function combineNumbers(...arr) {
        for (let i = 0; i < arr.length; i++) {
          if (i % 4 === 0) {
            // iterate backwards from each row
            for (let j = i + 3; j > i; j--) {
              if (arr[j] === arr[j - 1]) {
                arr[j] *= 2;
                arr[j - 1] = 0;
              }
            }
          }
        }
        return arr;
      }

      function shiftRight(...arr) {
        const initial = [];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          if (i % 4 === 0) {
            const originalRow = [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]];
            initial.push(...originalRow);

            const numberedRow = originalRow.filter((n) => n);
            const zerosArr = Array(4 - numberedRow.length).fill(0);
            const newRow = [...zerosArr, ...numberedRow];
            result.push(...newRow);
          }
        }
        return { initial, result };
      }
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
