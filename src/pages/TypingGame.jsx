import { useEffect, useState } from "react";
import Navbar
from "../components/Navbar";

function TypingGame() {

  /* DANH SÁCH TỪ */

  const words = [
   "A","B","C","D","E","F",
  "G","H","I","J","K","L",
  "M","N","O","P","Q","R",
  "S","T","U","V","W","X",
  "Y","Z"

  ];

  const keyboardRows = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
  ];

  const [fallingWords, setFallingWords] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [life, setLife] =
    useState(5);

  const [time, setTime] =
    useState(60);

  const [level, setLevel] =
    useState(1);

  const [typed, setTyped] =
    useState("");

  const [activeKey, setActiveKey] =
    useState("");

  const [gameOver, setGameOver] =
    useState(false);

  const [highScore, setHighScore] =
    useState(
      localStorage.getItem("typingHigh") || 0
    );

  const [message, setMessage] =
  useState("");

  /* TẠO TỪ */

  function createWord() {

    const randomWord =
      words[
        Math.floor(
          Math.random() * words.length
        )
      ];

    return {
      id: Math.random(),

      text: randomWord,

      left:
        Math.random() * 80,

      speed:
        Math.random() * 8 + 14,

      boss:
        randomWord.length >= 8
    };
  }

  /* TẠO WORD */

  useEffect(() => {

    const arr = [];

    for (let i = 0; i < 4; i++) {
      arr.push(createWord());
    }

    setFallingWords(arr);

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

  /* GAME OVER */

  function endGame() {

  if (!gameOver) {
      const audioGameOver = new Audio(`${import.meta.env.BASE_URL}over.mp3`);
      audioGameOver.play().catch(err => console.log("Lỗi nhạc kết thúc gõ phím:", err));
    }

    setGameOver(true);

    if (score > highScore) {

      localStorage.setItem(
        "typingHigh",
        score
      );

      setHighScore(score);
    }
  }

  /* GÕ PHÍM */

  useEffect(() => {

    function handleKey(e) {

      if (gameOver){


      return;

      }



      const key =
        e.key.toUpperCase();

      setActiveKey(key);

      setTimeout(() => {
        setActiveKey("");
      }, 200);

      setTyped(key);

      /* KIỂM TRA WORD */

      fallingWords.forEach((word) => {

        if (
  word.text === key
) {

setMessage("✅ Chính xác!");

 // 🎵 PHÁT ÂM THANH ĐÚNG: Gọi file dung.mp3 trong thư mục public
      const audioDung = new Audio(`${import.meta.env.BASE_URL}dungphim.mp3`);
      audioDung.play().catch(err => console.log("Lỗi phát âm thanh:", err));





  setScore((prev) =>
    prev +
    (word.boss ? 10 : 5)
  );

  setFallingWords((prev) =>
    prev.map((w) =>
      w.id === word.id
        ? createWord()
        : w
    )
  );

  setTyped(key);
}
    });

const hasCorrect =
  fallingWords.some(
    (word) => word.text === key
  );

if (!hasCorrect) {

  setMessage("❌ Sai rồi!");
// 🎵 PHÁT ÂM THANH SAI: Gọi file sai.mp3 trong thư mục public
      const audioSai = new Audio(`${import.meta.env.BASE_URL}sai1.mp3`);
      audioSai.play().catch(err => console.log("Lỗi phát âm thanh:", err));



}


    }

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );

  }, [typed, fallingWords, gameOver]);

  /* MẤT MÁU */

  useEffect(() => {

    const damage = setInterval(() => {

      setLife((prev) => {

        if (prev > 0) {
          return prev - 1;
        }

        return 0;
      });

    }, 7000);

    return () =>
      clearInterval(damage);

  }, []);

  return (
    <>  <Navbar />
    <div className="typing-ultra">

      {/* HEADER */}

      <div className="typing-ultra-header">

        <h1>⌨️ Typing Game </h1>

        <div className="typing-ultra-stats">

          <h2>⭐ {score}</h2>

          <h2>❤️ {life}</h2>

          <h2>🚀 Lv {level}</h2>

          <h2>⏱️ {time}s</h2>

        </div>

      </div>

      {/* HIGH SCORE */}

      <div className="typing-high">

        🏆 High Score: {highScore}

      </div>

      {/* WORDS */}

      {!gameOver ? (

        <>
          {fallingWords.map((word) => (

            <div
              key={word.id}

              className={
                word.boss
                  ? "boss-word"
                  : "falling-word"
              }

              style={{
                left: `${word.left}%`,

                animationDuration:
                  `${word.speed - level*0.2}s`
              }}
            >
              {word.text}
            </div>

          ))}

          {/* TEXT NHẬP */}

          <div className="typed-box">

            {typed}

          </div>

          <div className="typing-message">

  {message}

</div>

          {/* KEYBOARD */}

          <div className="keyboard">

            {keyboardRows.map((row, i) => (

              <div
                key={i}
                className="keyboard-row"
              >

                {row.map((key) => (

                  <div
                    key={key}

                    className={
                      activeKey === key
                        ? "key active-key"
                        : "key"
                    }
                  >
                    {key}
                  </div>

                ))}

              </div>

            ))}

          </div>
        </>

      ) : (

        <div className="typing-ultra-over">


          <h2>🎉 GAME OVER</h2>

          <h3>⭐ Điểm: {score}</h3>

          <h3>🏆 High Score: {highScore}</h3>

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

export default TypingGame;
