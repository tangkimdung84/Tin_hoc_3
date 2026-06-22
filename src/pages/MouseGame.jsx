import { useEffect, useState } from "react";
import Navbar
from "../components/Navbar";

function MouseGame() {

  const [balloons, setBalloons] = useState([]);

  const [score, setScore] = useState(0);

  const [combo, setCombo] = useState(1);

  const [time, setTime] = useState(60);

  const [life, setLife] = useState(5);

  const [level, setLevel] = useState(1);

  const [gameOver, setGameOver] = useState(false);

  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );

  /* TẠO BÓNG */

  function createBalloon() {

    const types = [
      { emoji: "🎈", point: 1 },
      { emoji: "🟡", point: 5 },
      { emoji: "👑", point: 10 },
      { emoji: "🎯", point: 2 },
    ];

    const type =
      types[
        Math.floor(Math.random() * types.length)
      ];

    return {
      id: Math.random(),

      left: Math.random() * 90,

      speed:
        Math.random() * 8 + 10,

      ...type
    };
  }

  /* TẠO BÓNG */

  useEffect(() => {

    const arr = [];

    for (let i = 0; i < 5; i++) {
      arr.push(createBalloon());
    }

    setBalloons(arr);

  }, []);

  /* TIMER */

  useEffect(() => {

    if (time > 0 && life > 0) {

      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);

    } else {

      endGame();

    }

  }, [time, life]);

  /* LEVEL */

  useEffect(() => {

    if (score >= 20) setLevel(2);

    if (score >= 50) setLevel(3);

    if (score >= 100) setLevel(4);

  }, [score]);

  /* HIGH SCORE */

  function endGame() {

    setGameOver(true);

    if (score > highScore) {

      localStorage.setItem(
        "highScore",
        score
      );

      setHighScore(score);
    }
  }

  /* CLICK */

  function popBalloon(balloon) {

    if (gameOver) return;

    const audio = new Audio(
      "https://www.soundjay.com/buttons/sounds/button-16.mp3"
    );

    audio.play();

    const newScore =
      score + balloon.point * combo;

    setScore(newScore);

    setCombo(combo + 1);

    setBalloons((prev) =>
      prev.map((b) =>
        b.id === balloon.id
          ? createBalloon()
          : b
      )
    );
  }

  /* MISS BÓNG */

  useEffect(() => {

    const missInterval = setInterval(() => {

      setLife((prev) => {

        if (prev > 0) {
          return prev - 1;
        }

        return 0;
      });

      setCombo(1);

    }, 6000);

    return () =>
      clearInterval(missInterval);

  }, []);

  return (
     <>

      <Navbar />
    <div className="ultra-max-game">

      {/* HEADER */}

      <div className="max-header">

        <h2>🎮 MOUSE GAME - DI CHUYỂN VÀ CLICK CHUỘT CHỌN ẢNH</h2>

        <div className="max-stats">

          <h3>⭐ {score}</h3>

          <h3>⚡ x{combo}</h3>

          <h3>❤️ {life}</h3>

          <h3>🚀 Lv {level}</h3>

          <h3>⏱️ {time}s</h3>

        </div>

      </div>

      {/* HIGH SCORE */}

      <div className="high-score">

        🏆 High Score: {highScore}

      </div>

      {/* BÓNG */}

      {!gameOver ? (

        balloons.map((balloon) => (

          <div
            key={balloon.id}

            className="max-balloon"

            onClick={() =>
              popBalloon(balloon)
            }

            style={{
              left: `${balloon.left}%`,

              animationDuration:
                `${balloon.speed - level*0.3}s`
            }}
          >
            {balloon.emoji}
          </div>

        ))

      ) : (

        <div className="max-game-over">

          <h1>🎉 GAME OVER</h1>

          <h2>⭐ Điểm: {score}</h2>

          <h2>🏆 High Score: {highScore}</h2>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            🔄 Chơi lại
          </button>

        </div>

      )}

    </div>
     </>
  );
}

export default MouseGame;