import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const response = await axios.post('http://localhost:3001/api/login', loginData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);  
      navigate('/start');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  });

  const handleLogin = () => {
    loginMutation.mutate({ email, password });
  };

  // Navigate to the signup page
  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account?{' '}
          <span
            onClick={goToSignup}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
