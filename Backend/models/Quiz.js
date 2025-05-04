const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true }
});

module.exports = mongoose.model('Quiz', quizSchema);
