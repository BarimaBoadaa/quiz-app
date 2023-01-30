import React, { useState } from "react";
import questions from "./questions.json";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setansweredQuestions] = useState([]);
  const [isCompleted, setisCompleted] = useState(false);

  const handleAnswer = (ans, number) => {
    if (ans) {
      setScore(score + 1);
      setansweredQuestions([...answeredQuestions, number]);
    } else {
      setansweredQuestions([...answeredQuestions, number]);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(questions.length - 1);
      setisCompleted(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setansweredQuestions([]);
    setisCompleted(false);
  };

  if (isCompleted) {
    return (
      <div
        className="main"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <h1>
          QUIZ Completed <br />
          Your Score was {score}/{questions.length}
        </h1>
        <button className="resetbtn" onClick={handleRestart}>
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="main">
      <h1>QUIZ FOR DEVELOPERS</h1>
      <h2>
        {score}/{questions.length}
      </h2>

      <div className="qstNumber">
        <h4 className="text-center">Question {currentQuestion + 1}</h4>
        <p>{questions[currentQuestion].question}</p>
      </div>
      <div
        className="sub"
        id={
          answeredQuestions.includes(currentQuestion + 1)
            ? "answered"
            : "notAnswered"
        }
      >
        {questions[currentQuestion].answer.map((answer, index) => {
          return (
            <button
              style={
                answeredQuestions.includes(currentQuestion + 1) &&
                answer.isCorrect
                  ? { background: "green" }
                  : { background: "red" }
              }
              className="btn"
              onClick={() =>
                handleAnswer(answer.isCorrect, currentQuestion + 1)
              }
              key={index}
            >
              {answer.text}
            </button>
          );
        })}

        <div className="next">
          <button className="nextbtn" onClick={handleNextQuestion}>
            Next Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
