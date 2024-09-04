import React from 'react';
import Grid from './components/Grid';
import Info from './components/Info';

function App() {
  const [score, setScore] = React.useState(0);

  const updateScore = (value) => setScore(value);

  return (
    <div className="container">
      <Info score={score} />
      <Grid width={4} updateScore={updateScore} />
    </div>
  );
}

export default App;
