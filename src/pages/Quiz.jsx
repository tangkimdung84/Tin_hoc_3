import { useState } from "react";
import { useParams } from "react-router-dom";
import quizData from "../data/quizData";
import Navbar from "../components/Navbar";

function Quiz() {

  const { id } = useParams();

  const questions =
    quizData[id];

  const [currentQuestion,
    setCurrentQuestion] =
    useState(0);

  const [score,
    setScore] =
    useState(0);

  const [selected,
    setSelected] =
    useState("");

  const [showResult,
    setShowResult] =
    useState(false);

  const [message,
  setMessage] =
  useState("");

  if (!questions) {

    return (
      <>
        <Navbar />
        <h1>
          Chưa có dữ liệu trắc nghiệm
        </h1>
      </>
    );
  }

  const question =
    questions[currentQuestion];

  function handleAnswer(option){

  if(selected) return;

  setSelected(option);

  if(option === question.answer){

    setScore(prev => prev + 1);

    setMessage("✅ Chính xác");

  }else{

    setMessage("❌ Chưa chính xác");

  }

  // tự mất sau 1.2 giây
  setTimeout(() => {
    setMessage("");
  },1200);

}

  function nextQuestion() {

    if (
      currentQuestion <
      questions.length - 1
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      );

      setSelected("");
      setMessage("");

    } else {

      const oldScore =
        Number(
          localStorage.getItem(
            `quiz-score-${id}`
          )
        ) || 0;

      if (score > oldScore) {

        localStorage.setItem(
          `quiz-score-${id}`,
          score
        );
      }

      setShowResult(true);
    }
  }

  return (
    <>
      <Navbar />

      <div className="quiz-page">

        {!showResult ? (

          <div className="quiz-box">

            <div className="quiz-header">

  <h2>
    Câu {currentQuestion + 1} / {questions.length}
  </h2>

  <h2>⭐ {score}</h2>

    {selected && (
      <button
        className="next-btn"
        onClick={nextQuestion}
      >
        ➡️ Tiếp tục
      </button>
    )}
  
</div>  
  <div className="quiz-right">


     {message && (
  <div
    className={
      message.includes("✅")
      ? "toast success"
      : "toast error"
    }
  >
    {message}
  </div>
)}

   

  </div>



           
<div className="progress-bar">

  <div    className="progress-fill"

    style={{
      width:
      `${(
        (currentQuestion + 1)
        /
        questions.length
      ) * 100}%`
    }}
  />

</div>
<div className="quiz-question_mobile">
            <h2>
              {question.question}
            </h2>
</div>

<div className="quiz-options">
{question.options.map((option,index)=>(

  <button
    key={index}
    className={
      selected === option
        ? "selected-option"
        : ""
    }
    onClick={() => handleAnswer(option)}
  >
    <span className="answer-letter">
      {String.fromCharCode(65 + index)}
    </span>

    {option}
  </button>

))}
</div>
           

          </div>

        ) : (

          <div className="quiz-result">

            <h1>
              🎉 Hoàn thành
            </h1>

            <h2>
              Điểm:
              {" "}
              {score}
              /
              {questions.length}
            </h2>

            {score >= 4 && (
              <h2>
                🏆 Huy hiệu xuất sắc
              </h2>
            )}

            {score === 5 && (
              <h2>
                👑 Hoàn thành 100%
              </h2>
            )}
            <button
  onClick={() =>
    window.location.reload()
  }
>
  🔄 Làm lại
</button>

          </div>

        )}

      </div>

    </>
  );
}

export default Quiz;