import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import ScoreSheet from './components/ScoreSheet';
import './App.css';

function App() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (playerNames) => {
    setPlayers(playerNames);
    setScores(Array(playerNames.length).fill(0).map(() => []));
    setGameStarted(true);
  };

  const handleScoreChange = (playerIndex, roundIndex, score) => {
    const newScores = [...scores];
    newScores[playerIndex][roundIndex] = score;
    setScores(newScores);
  };

  const handleNewGame = () => {
    setScores(Array(players.length).fill(0).map(() => []));
  };

  const handleQuitGame = () => {
    setPlayers([]);
    setScores([]);
    setGameStarted(false);
  };

  return (
    <div className="App">
      <h1>Phase 10: Dice Score Sheet</h1>
      {!gameStarted ? (
        <PlayerForm onStartGame={handleStartGame} />
      ) : (
        <ScoreSheet
          players={players}
          scores={scores}
          onScoreChange={handleScoreChange}
          onNewGame={handleNewGame}
          onQuitGame={handleQuitGame}
        />
      )}
    </div>
  );
}

export default App;
