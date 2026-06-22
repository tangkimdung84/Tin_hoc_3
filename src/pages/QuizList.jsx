import lessons from "../data/lessons";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function QuizList() {

  return (
    <>
      <Navbar />

      <div className="lessons-page">

        <h1>📝 Trắc nghiệm Tin học 3</h1>

        <div className="lesson-grid">

          {lessons.map((lesson) => (

            <div
              key={lesson.id}
              className="lesson-card"
            >

              <img
                src={lesson.image}
                alt=""
              />

              <h2>{lesson.title}</h2>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      localStorage.getItem(
                        `quiz-${lesson.id}`
                      ) || "0%"
                  }}
                ></div>

              </div>

              <Link
                to={`/quiz/${lesson.id}`}
              >
                <button>
                  🧠 Làm bài
                </button>
              </Link>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

export default QuizList;