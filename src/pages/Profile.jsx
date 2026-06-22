function Profile() {

  const score =
    localStorage.getItem("quizScore") || 0;

  const highTyping =
    localStorage.getItem("typingHigh") || 0;

  const level =
    Math.floor(score / 2) + 1;

  return (

    <div className="profile-page">

      <div className="profile-card">

        {/* AVATAR */}

        <img
          src="https://cdn-icons-png.flaticon.com/512/921/921347.png"
          alt=""
          className="avatar"
        />

        <h1>👦 Học sinh lớp 3</h1>

        <h2>
          ⭐ Level {level}
        </h2>

        {/* STATS */}

        <div className="profile-stats">

          <div className="stat-box">

            <h3>🏆 Quiz Score</h3>

            <p>{score}</p>

          </div>

          <div className="stat-box">

            <h3>⌨️ Typing High</h3>

            <p>{highTyping}</p>

          </div>

        </div>

        {/* BADGES */}

        <h2 className="badge-title">

          🎖️ Huy hiệu

        </h2>

        <div className="badges">

          <div className="badge">
            🖱️ Mouse Master
          </div>

          <div className="badge">
            ⌨️ Typing Hero
          </div>

          <div className="badge">
            🧠 Quiz Genius
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;