import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Result() {
  const { score, answers } = useSelector(state => state.quiz);
  const navigate = useNavigate();

  
  console.log('Answers:', answers);

  return (
    <div>
      <h1>Your Score: {score}</h1>
      <h2>Performance Breakdown</h2>
      <ul>
        {answers.map((answer, index) => (
          <li key={index}>
            Question {index + 1}: 
            {answer.selectedOption === answer.correctAnswer
              ? ' Correct'
              : ` Incorrect (You selected: ${answer.selectedOption}, Correct: ${answer.correctAnswer})`}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
      <button onClick={() => navigate('/start')}>Go to Dashboard</button>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}>Logout</button>
    </div>
  );
}

export default Result;
