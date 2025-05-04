import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';  

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/leaderboard');
        setLeaderboard(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError('Failed to load leaderboard');
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>LeaderBoard</h1>
      <ul className="leaderboard">
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <span>{index + 1}. {entry.userId?.email || 'Unknown User'}</span>
            <span>Score: {entry.score}</span>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Leaderboard;
