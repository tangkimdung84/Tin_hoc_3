import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">

      <Link to="/dashboard">
        🏠 Trang chủ
      </Link>

      <Link to="/lessons">
        📚 Bài học
      </Link>

      <Link to="/mouse-game">
        🎮 Luyện chuột
      </Link>
      <Link to="/typing-game">
        ⌨️ Gõ bàn phím
      </Link>

      <Link to="/quiz">
      📝 Trắc nghiệm
      </Link>

      <Link to="/achievements">
        🏆 Thành tích
      </Link>

      <Link to="/profile">
  👦 Hồ sơ học sinh
</Link>


    </aside>
  );
}

export default Sidebar;