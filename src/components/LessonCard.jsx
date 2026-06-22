import { useNavigate }
from "react-router-dom";

function LessonCard({

  title,
  progress,
  link

}) {

  const navigate =
    useNavigate();

  return (

    <div className="lesson-card">

      <h3>
        {title}
      </h3>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width:
            `${progress}%`
          }}
        >

        </div>

      </div>

      <p>
        {progress}% hoàn thành
      </p>

      <button
        onClick={() =>
          navigate(link)
        }
      >
        🚀 Vào học
      </button>

    </div>
  );
}

export default LessonCard;