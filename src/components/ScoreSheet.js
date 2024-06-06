import React, { useEffect, useState} from 'react';

const phaseNames = [
    "2 sets 3",
    "1 set 3, 1 run 4",
    "1 set 4, 1 run 4",
    "1 run 7",
    "1 run 8",
    "1 run 9",
    "2 sets 4",
    "7 one color",
    "1 set 5, 1 set 2",
    "1 set 5, 1 set 3"
]

function ScoreSheet({ players, scores, onScoreChange, onNewGame, onQuitGame }) {
    const [finalScores, setFinalScores] = useState(scores);
    const [firstFinisher, setFirstFinisher] = useState(null);

    useEffect(() => {
        const updatedScores = scores.map((playerScores, playerIndex) => {
            const updatedPlayerScores = [...playerScores];
            if (playerScores.slice(0, 5).reduce((acc, score) => acc + (score || 0), 0) > 220) {
                updatedPlayerScores[5] = (playerScores[5] || 0) + 40;
            }
            return updatedPlayerScores;
        });

        if (firstFinisher !== null) {
            updatedScores[firstFinisher] = [...updatedScores[firstFinisher], 40];
        }

        setFinalScores(updatedScores);
    }, [scores, firstFinisher]);

    const handleChange = (playerIndex, roundIndex, event) => {
        const score = parseInt(event.target.value, 10);
        onScoreChange(playerIndex, roundIndex, isNaN(score) ? 0 : score);
    };

    const handleFirstFinisherClick = (playerIndex) => {
        setFirstFinisher(playerIndex);
    };

    const renderScoreInput = (playerIndex, roundIndex) => (
        <input
            type="number"
            value={scores[playerIndex][roundIndex] || ''}
            onChange={(e) => handleChange(playerIndex, roundIndex, e)}
        />
    );

    return (
        <div>
            <h2>Score Sheet</h2>
            <table>
                <thead>
                    <tr>
                        <th>Phase</th>
                        {players.map((player, index) => (
                            <th key={index}>{player}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {phaseNames.map((phase, roundIndex) => (
                        <tr key={roundIndex}>
                            <td>{phase}</td>
                            {players.map((_, playerIndex) => (
                                <td key={playerIndex}>{renderScoreInput(playerIndex, roundIndex)}</td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td>First Finisher</td>
                        {players.map((_, playerIndex) => (
                            <td key={playerIndex}>
                                <button onClick={() => handleFirstFinisherClick(playerIndex)}>
                                    {firstFinisher === playerIndex ? "✔" : "Select"}
                                </button>
                            </td>
                        ))}
                    </tr>
                    <tr>
                        <td>Total</td>
                        {players.map((_, playerIndex) => {
                            const totalScore = finalScores[playerIndex].reduce((acc, score) => acc + (score || 0), 0);
                            return <td key={playerIndex}>{totalScore}</td>;
                        })}
                    </tr>
                </tbody>
            </table>
            <button onClick={onNewGame}>New Game</button>
            <button onClick={onQuitGame}>Quit Game</button>
        </div>
    );
}

export default ScoreSheet;