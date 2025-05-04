import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setScore, finishQuiz, trackAnswer } from '../redux/quizSlice';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../App.css';

function Quiz() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, score } = useSelector(state => state.quiz);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmitQuiz = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    await axios.post('http://localhost:3001/api/quiz', {
      userId,
      score
    });

    navigate('/result');
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const correctAnswer = currentQuestion.answer;
    if (selectedOption === correctAnswer) {
      dispatch(setScore(score + 3));
    }

    dispatch(trackAnswer({ questionId: currentQuestionIndex, selectedOption, correctAnswer }));

    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      dispatch({ type: 'quiz/setCurrentQuestionIndex', payload: currentQuestionIndex + 1 });
    } else {
      handleSubmitQuiz();
    }
  };

  return (
    <div className="container">
      <h1>Quiz</h1>
      <p className="quiz-timer">Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
      <h2>{currentQuestion.question}</h2>
      <div className="quiz-options">
        {['A', 'B', 'C', 'D'].map((letter) => (
          <label key={letter}>
            <input
              type="radio"
              value={letter}
              checked={selectedOption === letter}
              onChange={handleOptionChange}
            />
            {currentQuestion[letter]}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Submit Answer</button>
    </div>
  );
}

export default Quiz;
