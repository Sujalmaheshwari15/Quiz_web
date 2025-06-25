import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuestions } from '../redux/quizSlice';

function StartQuiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startQuiz = async () => {
    try {
      const response = await fetch('https://krish-2512.github.io/api/questions-2.json');
      const questions = await response.json();
  
      console.log('Fetched Questions:', questions);
  
      // Randomly select 10 questions
      const randomQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
      
      console.log('Randomly Selected Questions:', randomQuestions);
  
      // Dispatch the questions to Redux
      dispatch(setQuestions(randomQuestions));
  
      // Navigate to the quiz page
      navigate('/quiz');
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };
  

  return (
    <div className="welcome-card">
      <h1>Welcome to the Quiz</h1>
      <p>Rules:</p>
      <ul>
        <li>You will have 5 minutes to complete the quiz.</li>
        <li>There will be 10 questions, randomly selected.</li>
        <li>+3 points for each correct answer.</li>
      </ul>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}

export default StartQuiz;
