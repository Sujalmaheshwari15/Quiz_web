import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StartQuiz from './pages/StartQuiz';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/start" element={<StartQuiz />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/result" element={<Result />} />s
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
}

export default App;
