import Navbar from "../components/Navbar";
import lessonContent from "../data/lessonContent";
import { useParams, useNavigate } from "react-router-dom";

function LessonDetail() {

  const { id } = useParams();

  const navigate = useNavigate();

  const lesson =
    lessonContent[Number(id)];

  if (!lesson) {

    return (
      <h1>
        Chưa có nội dung bài học
      </h1>
    );
  }

  return (

      <>
      <Navbar />
    <div className="lesson-detail">

      <h1>
        {lesson.title}
      </h1>

      <h2>
        🎯 Mục tiêu
      </h2>

      <ul>

        {lesson.objectives.map((item,index)=>(

          <li key={index}>
            {item}
          </li>

        ))}

      </ul>

      {lesson.video && (

        <div className="video-box">

          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/13E8jF970Kk" 
            title="Video bài học"
            allowFullScreen
          />

        </div>

      )}

      <h2>
        📚 Kiến thức mới
      </h2>

      <div
  className="lesson-theory"
  dangerouslySetInnerHTML={{
    __html: lesson.theory
  }}
/>

  <div className="lesson-actions">

  <button
    onClick={() =>
      navigate(lesson.practiceRoute)
    }
  >
    🚀 Bắt đầu thực hành
  </button>

  <button
    onClick={() =>
      navigate(`/quiz/${id}`)

    }
  >
    🧠 Làm bài trắc nghiệm
  </button>

</div>

    </div>
    </>

  );
}

export default LessonDetail;