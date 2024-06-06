import React, { useState } from 'react';

function PlayerForm({ onStartGame }) {
  const [playerNames, setPlayerNames] = useState(['', '', '', '', '']);

  const handleChange = (index, event) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = event.target.value;
    setPlayerNames(newPlayerNames);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredNames = playerNames.filter(name => name !== '');
    onStartGame(filteredNames);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Player Names</h2>
      {playerNames.map((name, index) => (
        <div key={index}>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange(index, e)}
            placeholder={`Player ${index + 1}`}
          />
        </div>
      ))}
      <button type="submit">Start Game</button>
    </form>
  );
}

export default PlayerForm;
