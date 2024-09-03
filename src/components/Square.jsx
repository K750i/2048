function Square({ value }) {
  const bgColor = {
    0: '#cdc1b4',
    2: '#eee4da',
    4: '#eee1c9',
    8: '#f3b27a',
    16: '#f69664',
    32: '#f77c5f',
  };

  const textColor = {
    0: '#cdc1b4',
    2: '#776e65',
    4: '#776e65',
    8: '#f9f6f2',
    16: '#f9f6f2',
    32: '#f9f6f2',
  };

  return (
    <div style={{ backgroundColor: bgColor[value], color: textColor[value] }}>
      {value}
    </div>
  );
}

export default Square;
