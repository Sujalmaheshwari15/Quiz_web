# Quiz Web Application

A full-stack web application for taking quizzes, tracking results, and viewing a leaderboard. Built with React (frontend), Node.js/Express (backend), and MongoDB (database).

---

## Features

- User registration and login (JWT authentication)
- Take quizzes and submit answers
- View quiz results
- Leaderboard for top scores

---

## Project Structure

```
Quiz_web/
  ├── Backend/      # Node.js/Express backend API
  └── Frontend/     # React frontend app
```

---

## Prerequisites

- [Node.js & npm](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

---

## Setup Instructions

### 1. Start MongoDB

Make sure MongoDB is running on your machine (default: `mongodb://localhost:27017`).

### 2. Backend Setup

```bash
cd Backend
npm install
npm start
```

- The backend will run on [http://localhost:3001](http://localhost:3001)

### 3. Frontend Setup

Open a new terminal:

```bash
cd Frontend
npm install
npm start
```

- The frontend will run on [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Register a new user account.
3. Log in and start taking quizzes!

---

## Troubleshooting

- **MongoDB connection error:** Ensure `mongod` is running and accessible at `localhost:27017`.
- **Port conflicts:** Make sure nothing else is running on ports 3000 (frontend) or 3001 (backend).
- **Signup/Login issues:** Check backend terminal for error messages and ensure MongoDB is running.

---

## License

This project is for educational purposes.
