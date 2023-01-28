const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const connection = require("./Config/db");
const QuizModel = require("./Models/QuizModel");

app.get("/", async (req, res) => {
  let keyword = req.query.category;
  let keyword2 = req.query.level;
  let apiLimit = Number(req.query.limit);

  try {
    const quizes = await QuizModel.aggregate([
      { $match: { category: new RegExp(keyword, "i") } },
      { $match: { difficulty: new RegExp(keyword2, "i") } },
    ]).limit(apiLimit);
    res.send(quizes);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

app.post("/createquiz", async (req, res) => {
  const quiz = req.body;
  try {
    const createQuiz = new QuizModel(quiz);
    await createQuiz.save();
    res.send("Quiz Created Successfuly");
  } catch (error) {
    console.log(error);
    res.send("Quiz not created");
  }
});

app.listen("5600", async () => {
  try {
    await connection;
    console.log("CONNECTED FROM DB");
  } catch (error) {
    console.log(error);
    console.log("SOMTHING WRONG IN CONNECTION");
  }
  console.log("Listening on port 5600");
});
