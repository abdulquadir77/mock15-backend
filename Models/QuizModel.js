const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  category: String,
  type: String,
  difficulty: String,
  question: String,
  correct_answer: String,
  incorrect_answers: [String, String, String],
});

const QuizModel = mongoose.model("quiz", quizSchema);

module.exports = QuizModel;
