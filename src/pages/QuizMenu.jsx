import lessons from "../data/lessons";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function QuizMenu() {

  return (
    <>
      <Navbar />

      <div className="lessons-page">

        <h1>
          📝 Danh sách bài trắc nghiệm
        </h1>

        <div className="lesson-grid">

          {lessons.map((lesson) => {

            const score =
              localStorage.getItem(
                `quiz-score-${lesson.id}`
              ) || 0;

            return (

              <div
                key={lesson.id}
                className="lesson-card"
              >

                <img
                  src={lesson.image}
                  alt=""
                />

                <h3>{lesson.title}</h3>

                <p>
                  ⭐ Điểm cao nhất: {score}/5
                </p>

                <Link
                  to={`/quiz/${lesson.id}`}
                >
                  <button>
                    🧠 Làm bài
                  </button>
                </Link>

              </div>
            );

          })}

        </div>

      </div>
    </>
  );
}

export default QuizMenu;