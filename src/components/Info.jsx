function Info() {
  return (
    <div className="info">
      <div>
        <h1>2048</h1>
        <p id="result">
          Combine the numbers to get to the <strong>2048</strong> tile!
        </p>
      </div>
      <div className="score-container">
        <p className="score-title">Score</p>
        <h2 id="score">0</h2>
      </div>
    </div>
  );
}

export default Info;
