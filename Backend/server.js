const express = require('express');
const { connect } = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');  
const Quiz = require('./models/Quiz');  

const app = express();
app.use(express.json());  

// Allow requests from localhost:3000 (FRONTEND)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const SECRET_KEY = 'your_secret_key';

// MongoDB connection
connect('mongodb://localhost:27017/quiz-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Database connection error:', err));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Quiz API!');
});

// Register route
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (email already exists)
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = sign({ id: user._id, email: user.email }, SECRET_KEY);
  res.json({ token });
});

// Fetching quiz Questions (from external API)
app.get('/api/questions', async (req, res) => {
  try {
    const response = await fetch('https://krish-2512.github.io/api/questions-2.json');
    const questions = await response.json();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Save Quiz Results
app.post('/api/quiz', async (req, res) => {
  const { userId, score } = req.body;

  
  console.log('Quiz result received:', req.body);

  try {
    const quizResult = new Quiz({
      userId,  
      score,   
    });
    await quizResult.save();  
    res.json({ message: 'Quiz result saved successfully' });
  } catch (err) {
    console.error('Error saving quiz result:', err);
    res.status(400).json({ error: 'Failed to save quiz result' });
  }
});




// Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Fetch the top 5 users with the highest scores
    const leaderboard = await Quiz.find().sort({ score: -1 }).limit(5).populate('userId', 'email');
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});



app.listen(3001, () => console.log('Server running on http://localhost:3001'));
