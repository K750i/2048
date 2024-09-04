import React from 'react';
import Square from './Square';
import logArrayWithColumns from '../utils/logArrayCol';

function Grid({ width, updateScore }) {
  const [squares, setSquares] = React.useState(() =>
    spawnNumber(Array(width * width).fill(0), 2)
  );
  const scoreRef = React.useRef(0);

  React.useEffect(() => {
    updateScore(scoreRef.current);
  }, [scoreRef.current]);

  React.useEffect(() => {
    const handleKeydown = (e) => {
      switch (e.code) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  function spawnNumber(arr, times = 1) {
    const zeroIndexes = arr
      .map((value, index) => (value === 0 ? index : -1))
      .filter((index) => index !== -1);

    if (!zeroIndexes.length) return;

    const newSquares = [...arr];

    for (let i = 0; i < times; i++) {
      const randomIndex = Math.floor(Math.random() * zeroIndexes.length);
      const zeroSquareIdx = zeroIndexes[randomIndex];

      newSquares[zeroSquareIdx] = Math.random() < 0.85 ? 2 : 4;
    }
    return newSquares;
  }

  function moveRight() {
    setSquares((prevSquares) => {
      const initial = [...prevSquares];
      const shifted = shiftRight(...initial);
      const combined = combineNumbers(...shifted);
      const result = shiftRight(...combined);

      if (JSON.stringify(initial) === JSON.stringify(result)) {
        return initial;
      }

      return spawnNumber(result);

      function combineNumbers(...arr) {
        for (let i = 0; i < arr.length; i++) {
          if (i % 4 === 0) {
            // iterate backwards from each row
            for (let j = i + 3; j > i; j--) {
              if (arr[j] === arr[j - 1]) {
                arr[j] *= 2;
                scoreRef.current += arr[j];
                arr[j - 1] = 0;
              }
            }
          }
        }
        return arr;
      }

      function shiftRight(...arr) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          if (i % 4 === 0) {
            const originalRow = [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]];
            const numberedRow = originalRow.filter((n) => n);
            const zerosArr = Array(width - numberedRow.length).fill(0);
            const newRow = [...zerosArr, ...numberedRow];
            result.push(...newRow);
          }
        }
        return result;
      }
    });
  }

  function moveLeft() {
    setSquares((prevSquares) => {
      const initial = [...prevSquares];
      const shifted = shiftLeft(...initial);
      const combined = combineNumbers(...shifted);
      const result = shiftLeft(...combined);

      if (JSON.stringify(initial) === JSON.stringify(result)) {
        return initial;
      }

      return spawnNumber(result);

      function combineNumbers(...arr) {
        for (let i = 0; i < arr.length; i++) {
          if (i % 4 === 0) {
            for (let j = i; j < i + 3; j++) {
              if (arr[j] === arr[j + 1]) {
                arr[j] *= 2;
                scoreRef.current += arr[j];
                arr[j + 1] = 0;
              }
            }
          }
        }
        return arr;
      }

      function shiftLeft(...arr) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          if (i % 4 === 0) {
            const originalRow = [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]];
            const numberedRow = originalRow.filter((n) => n);
            const zerosArr = Array(width - numberedRow.length).fill(0);
            const newRow = [...numberedRow, ...zerosArr];
            result.push(...newRow);
          }
        }
        return result;
      }
    });
  }

  function moveUp() {
    setSquares((prevSquares) => {
      const initial = [...prevSquares];
      const shifted = shiftUp(...initial);
      const combined = combineNumbers(...shifted);
      const result = shiftUp(...combined);

      if (JSON.stringify(initial) === JSON.stringify(result)) {
        return initial;
      }

      return spawnNumber(result);

      function combineNumbers(...arr) {
        for (let i = 0; i < width; i++) {
          for (let j = i; j <= i + width * 2; j += width) {
            if (arr[j] === arr[j + width]) {
              arr[j] *= 2;
              scoreRef.current += arr[j];
              arr[j + width] = 0;
            }
          }
        }
        return arr;
      }

      function shiftUp(...arr) {
        const result = [];
        for (let i = 0; i < width; i++) {
          const originalCol = [
            arr[i],
            arr[i + width],
            arr[i + width * 2],
            arr[i + width * 3],
          ];

          const numberedCol = originalCol.filter((n) => n);
          const zerosArr = Array(width - numberedCol.length).fill(0);
          const newCol = [...numberedCol, ...zerosArr];

          result[i] = newCol[0];
          result[i + width] = newCol[1];
          result[i + width * 2] = newCol[2];
          result[i + width * 3] = newCol[3];
        }

        return result;
      }
    });
  }

  function moveDown() {
    setSquares((prevSquares) => {
      const initial = [...prevSquares];
      const shifted = shiftDown(...initial);
      const combined = combineNumbers(...shifted);
      const result = shiftDown(...combined);

      if (JSON.stringify(initial) === JSON.stringify(result)) {
        return initial;
      }

      return spawnNumber(result);

      function combineNumbers(...arr) {
        for (let i = 0; i < width; i++) {
          for (let j = i + width * 3; j >= i + width; j -= width) {
            if (arr[j] === arr[j - width]) {
              arr[j] *= 2;
              scoreRef.current += arr[j];
              arr[j - width] = 0;
            }
          }
        }
        return arr;
      }

      function shiftDown(...arr) {
        const result = [];
        for (let i = 0; i < width; i++) {
          const originalCol = [
            arr[i],
            arr[i + width],
            arr[i + width * 2],
            arr[i + width * 3],
          ];

          const numberedCol = originalCol.filter((n) => n);
          const zerosArr = Array(width - numberedCol.length).fill(0);
          const newCol = [...zerosArr, ...numberedCol];

          result[i] = newCol[0];
          result[i + width] = newCol[1];
          result[i + width * 2] = newCol[2];
          result[i + width * 3] = newCol[3];
        }

        return result;
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
