import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import StartQuiz from './pages/StartQuiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/start',
    element: <StartQuiz />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '/result',
    element: <Result />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
]);

export default router;
