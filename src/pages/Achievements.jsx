import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Achievements() {
  return (
    <div>

      <Header />

      <div className="layout">

        <Sidebar />

        <main className="content">

          <h1>🏆 Thành tích học tập</h1>

          <h2>⭐ 150 điểm</h2>

          <h2>🎖️ 3 huy hiệu</h2>

        </main>

      </div>

    </div>
  );
}

export default Achievements;