import lessons from "../data/lessons";
import { Link }
from "react-router-dom";

import Navbar
from "../components/Navbar";

function Lessons() {

  return (

    <>

      <Navbar />

      <div className="lessons-page">

        <h1>
          📚 Bài học Tin học 3
        </h1>

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

              <h2>
                {lesson.title}
              </h2>

              <Link
                to={`/lesson/${lesson.id}`}
              >

                <button>
                  🚀 Học bài
                </button>

              </Link>

            </div>

          ))}

        </div>

      </div>

    </>

  );
}

export default Lessons;