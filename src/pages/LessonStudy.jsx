import { useParams } from "react-router-dom";

import lessons from "../data/lessons";
import Navbar from "../components/Navbar";

function LessonDetail() {

  const { id } = useParams();

  const lesson =
    lessons.find(
      (item) =>
        item.id === Number(id)
    );

  return (

    <div className="lesson-detail">

      <h1>{lesson.title}</h1>

      {/* VIDEO */}

      <div className="video-box">

        <iframe
          width="100%"
          height="400"
          src={lesson.video}
          title="video"
          allowFullScreen
        ></iframe>

      </div>
       <Navbar />

      {/* NỘI DUNG */}

      <div className="lesson-content">

        <p>{lesson.content}</p>

      </div>

      {/* NÚT */}

      <div className="lesson-buttons">

        <button>
          🎮 Chơi game luyện tập
        </button>

        <button>
          📝 Làm bài tập
        </button>

      </div>

    </div>
  );
}

export default LessonDetail;