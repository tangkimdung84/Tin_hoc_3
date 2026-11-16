
document.addEventListener("DOMContentLoaded", function () {

    const scoreDisplay = document.getElementById("typingScore");
    const timerDisplay = document.getElementById("typingTimer");
    const hitsDisplay = document.getElementById("typingHits");
    const wordDisplay = document.getElementById("typingWord");
    const input = document.getElementById("typingInput");
    const message = document.getElementById("typingMessage");

    const startButton = document.getElementById("typingStartButton");
    const backButton = document.getElementById("typingBackButton");
    const finishPanel = document.getElementById("typingFinish");
    const finalScore = document.getElementById("typingFinalScore");
    const finalPraise = document.getElementById("typingFinalPraise");
    const rewardXP = document.getElementById("typingRewardXP");
    const playAgain = document.getElementById("typingPlayAgain");

    if (!scoreDisplay || !input) return;

    // DANH SÁCH TỪ LUYỆN GÕ
    const words = [
        "MAYTINH",
        "BANPHIM",
        "CHUOT",
        "THONGTIN",
        "HOCTAP",
        "SANGTAO",
        "KIENTHUC",
        "TRUONGHOC",
        "HOCSINH",
        "GIAOVIEN",
        "MAYIN",
        "INTERNET",
        "PHANMEM",
        "BAOMAT",
        "TAPTIN",
        "THUMUC",
        "BANTIN",
        "DIENTHOAI",
        "ROBOT",
        "CONGNGHE"
    ];

    let score = 0;
    let hits = 0;
    let timeLeft = 60;
    let currentWord = "";
    let timer = null;
    let isPlaying = false;


    // ÂM THANH TÍCH TÍCH KHI GÕ PHÍM
    function playTypingSound() {
        try {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            const audio = new AudioContext();
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = 850;

            oscillator.connect(gain);
            gain.connect(audio.destination);

            const now = audio.currentTime;

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.12, now + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

            oscillator.start(now);
            oscillator.stop(now + 0.05);

            oscillator.onended = function () {
                audio.close();
            };

        } catch (error) {
            console.log("Không thể phát âm thanh:", error);
        }
    }
	
	// ÂM THANH CHÚC MỪNG KHI HOÀN THÀNH
function playTypingCelebrationSound() {
    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        const audio = new AudioContext();

        [523, 659, 784, 1047].forEach(function (frequency, index) {
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = frequency;

            oscillator.connect(gain);
            gain.connect(audio.destination);

            const start = audio.currentTime + index * 0.18;

            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.15, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);

            oscillator.start(start);
            oscillator.stop(start + 0.22);
        });

        setTimeout(function () {
            audio.close();
        }, 1200);

    } catch (error) {
        console.log("Lỗi âm thanh chúc mừng:", error);
    }
}



    // CHỌN TỪ NGẪU NHIÊN
    function newWord() {
        currentWord = words[
            Math.floor(Math.random() * words.length)
        ];

        wordDisplay.textContent = currentWord;
        input.value = "";
        input.focus();
    }


    // HIỆU ỨNG BẮN PHÁO HOA
    function launchTypingFireworks() {

        const fireworks = document.getElementById("typingFireworks");

        if (!fireworks) return;

        fireworks.innerHTML = "";

        const colors = [
            "#ff1744",
            "#ff9100",
            "#ffea00",
            "#00e676",
            "#00b0ff",
            "#d500f9",
            "#ff4081"
        ];

        for (let burst = 0; burst < 7; burst++) {

            setTimeout(function () {

                const centerX = 10 + Math.random() * 80;
                const centerY = 10 + Math.random() * 65;

                for (let i = 0; i < 25; i++) {

                    const particle = document.createElement("span");

                    particle.className = "typing-firework-particle";

                    const angle = Math.PI * 2 * i / 25;
                    const distance = 45 + Math.random() * 65;

                    particle.style.left = centerX + "%";
                    particle.style.top = centerY + "%";

                    particle.style.backgroundColor =
                        colors[Math.floor(Math.random() * colors.length)];

                    particle.style.setProperty(
                        "--move-x",
                        Math.cos(angle) * distance + "px"
                    );

                    particle.style.setProperty(
                        "--move-y",
                        Math.sin(angle) * distance + "px"
                    );

                    fireworks.appendChild(particle);

                    setTimeout(function () {
                        particle.remove();
                    }, 1600);
                }

            }, burst * 350);
        }
    }



    // CẬP NHẬT ĐIỂM
    function updateScore() {
        scoreDisplay.textContent = score;
        hitsDisplay.textContent = hits;
    }

    // BẮT ĐẦU TRÒ CHƠI
    function startGame() {

        clearInterval(timer);

        score = 0;
        hits = 0;
        timeLeft = 60;
        isPlaying = true;

        updateScore();

        timerDisplay.textContent = timeLeft;
        finishPanel.hidden = true;

        startButton.disabled = true;
        input.disabled = false;

        message.textContent = "🌟 Em hãy gõ thật chính xác nhé!";
        newWord();

        timer = setInterval(function () {

            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
    clearInterval(timer);
    finishGame();
}

        }, 1000);
    }

   
// KIỂM TRA TỪ ĐÃ GÕ
input.addEventListener("input", function () {

    if (!isPlaying) return;

    playTypingSound();

    const typedText = input.value.toUpperCase();

    if (typedText === currentWord) {

        score += 10;
        hits++;

        updateScore();

        message.textContent = "🎉 Chính xác! +10 điểm";
        input.style.borderColor = "#28a745";

        newWord();

    } else if (!currentWord.startsWith(typedText)) {

        message.textContent =
            "❌ Chưa đúng rồi! Em hãy nhấn Backspace để sửa nhé!";

        message.style.color = "#e53935";
        input.style.borderColor = "#e53935";

    } else {

        message.textContent =
            "🌟 Em đang gõ đúng hướng, tiếp tục nhé!";

        message.style.color = "#287a45";
        input.style.borderColor = "#90caf9";
    }

});

// TRỪ XP KHI GÕ SAI VÀ NHẤN ENTER
input.addEventListener("keydown", function (event) {

    if (event.key !== "Enter" || !isPlaying) return;

    const typedText = input.value.trim().toUpperCase();

    if (typedText === "") return;

    if (typedText !== currentWord) {

        let totalXP = Number(
            localStorage.getItem("tinHoc3_xp") || 0
        );

        totalXP = Math.max(0, totalXP - 1);

        localStorage.setItem("tinHoc3_xp", totalXP);

        message.textContent = "❌ Gõ sai rồi! Em bị trừ 1 XP nhé!";

        message.style.color = "#e53935";

        input.value = "";
        input.focus();
    }

});


    // KẾT THÚC TRÒ CHƠI
    function finishGame() {

        if (!isPlaying) return;

        isPlaying = false;
        clearInterval(timer);

        input.disabled = true;
        startButton.disabled = false;

        finishPanel.hidden = false;

// BẮN PHÁO HOA CHÚC MỪNG
const fireworks = document.getElementById("typingFireworks");

if (fireworks) {
    launchTypingFireworks();
} else {
    console.log("Không tìm thấy vùng pháo hoa!");
}

// PHÁT ÂM THANH CHÚC MỪNG
playTypingCelebrationSound();


        finalScore.textContent =
            "⭐ Điểm số của em: " + score;

        if (hits >= 15) {
            finalPraise.textContent =
                "🏆 Siêu sao gõ phím! Em thật xuất sắc!";
        } else if (hits >= 8) {
            finalPraise.textContent =
                "🌟 Giỏi lắm! Em đã có tiến bộ!";
        } else {
            finalPraise.textContent =
                "💖 Cố gắng luyện tập thêm nhé!";
        }

        // THƯỞNG XP MỘT LẦN
      // THƯỞNG XP SAU MỖI LẦN CHƠI
const earnedXP = Math.min(hits, 20);

let totalXP = Number(
    localStorage.getItem("tinHoc3_xp") || 0
);

totalXP += earnedXP;

localStorage.setItem("tinHoc3_xp", totalXP);

rewardXP.textContent =
    "🎁 Chúc mừng em nhận được " + earnedXP + " XP!";
	
	}	
	

    // NÚT BẮT ĐẦU
    startButton.addEventListener("click", startGame);

    // CHƠI LẠI
    playAgain.addEventListener("click", startGame);

    // VỀ TRANG CHỦ
    backButton.addEventListener("click", function () {
        window.location.href = "typing-game.html";
    });

});



// =====================================
// CHUYỂN ĐỔI GIỮA HAI TRÒ CHƠI GÕ PHÍM
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const gameMenu = document.getElementById("typingGameMenu");
    const oldGameArea = document.getElementById("oldTypingArea");
    const cloudGameArea = document.getElementById("cloudTypingArea");

    const oldGameButton = document.getElementById("oldTypingGame");
    const cloudGameButton = document.getElementById("cloudTypingGame");
    const cloudBackButton = document.getElementById("cloudBackButton");

    if (!gameMenu || !oldGameArea || !cloudGameArea) return;

    // MỞ TRÒ CHƠI GÕ TỪ CŨ
    oldGameButton.addEventListener("click", function () {
        gameMenu.hidden = true;
        cloudGameArea.hidden = true;
        oldGameArea.hidden = false;
    });

    // MỞ TRÒ CHƠI SĂN CHỮ TRONG MÂY
    cloudGameButton.addEventListener("click", function () {
        gameMenu.hidden = true;
        oldGameArea.hidden = true;
        cloudGameArea.hidden = false;
    });

    // QUAY LẠI KHU VỰC CHỌN TRÒ CHƠI
    cloudBackButton.addEventListener("click", function () {
        cloudGameArea.hidden = true;
        oldGameArea.hidden = true;
        gameMenu.hidden = false;
    });

});


// =====================================
// GAME SĂN CHỮ TRONG MÂY
// TẠO CÁC CHỮ CÁI RƠI TỰ DO
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const board = document.getElementById("cloudGameBoard");

    if (!board) return;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let cloudTimer = null;
    let cloudFallSpeed = 7000;

    // TẠO MỘT ĐÁM MÂY
    function createFallingCloud() {

        const cloud = document.createElement("div");
        cloud.className = "falling-cloud";

        const letter = letters[
            Math.floor(Math.random() * letters.length)
        ];

        cloud.innerHTML = "<span>" + letter + "</span>";

        const maxLeft = Math.max(0, board.clientWidth - 95);

        cloud.style.left =
            Math.random() * maxLeft + "px";

        cloud.style.animationDuration =
            cloudFallSpeed + "ms";

        board.appendChild(cloud);

        
// KHI ĐÁM MÂY RƠI CHẠM ĐÁY
setTimeout(function () {

    if (!cloud.isConnected) return;

    cloud.remove();

    // CHỈ TRỪ LƯỢT KHI TRÒ CHƠI ĐANG CHẠY
    if (window.cloudGameRunning &&
        typeof window.cloudMissed === "function") {

        window.cloudMissed();

    }

}, cloudFallSpeed);

    }

    // HIỆN HÀM ĐỂ CÁC BƯỚC SAU SỬ DỤNG
    window.createFallingCloud = createFallingCloud;

});


// =====================================
// XỬ LÝ GÕ CHỮ VÀ BẮT CHỮ TRONG MÂY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const board = document.getElementById("cloudGameBoard");
    const input = document.getElementById("cloudTypingInput");
    const scoreDisplay = document.getElementById("cloudScore");
    const message = document.getElementById("cloudMessage");

    if (!board || !input) return;

    let cloudScore = 0;

    input.addEventListener("input", function () {

        const typedLetter = input.value.trim().toUpperCase();

        if (!typedLetter) return;

        const clouds = board.querySelectorAll(".falling-cloud");

        let found = false;

        clouds.forEach(function (cloud) {

            const cloudLetter =
                cloud.querySelector("span").textContent;

            if (!found && typedLetter === cloudLetter) {

                cloud.remove();
				
	// PHÁT ÂM THANH KHI BẮT ĐÚNG CHỮ
try {
    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (AudioContext) {
        const audio = new AudioContext();

        [660, 880, 1100].forEach(function (frequency, index) {

            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.connect(gain);
            gain.connect(audio.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = "sine";

            const startTime = audio.currentTime + index * 0.09;

            gain.gain.setValueAtTime(0.15, startTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                startTime + 0.18
            );

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.18);

        });

        setTimeout(function () {
            audio.close();
        }, 600);
    }
} catch (error) {
    console.log("Không thể phát âm thanh:", error);
}			
				

                cloudScore += 10;
                scoreDisplay.textContent = cloudScore;

                message.textContent =
                    "🌟 Chính xác! Em được cộng 10 điểm!";

                found = true;
            }

        });

        if (!found) {

    message.textContent =
        "❌ Chưa đúng rồi! Em hãy thử lại nhé!";

    // ÂM THANH CẢNH BÁO KHI GÕ SAI
    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (AudioContext) {
            const audio = new AudioContext();

            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.connect(gain);
            gain.connect(audio.destination);

            oscillator.type = "sawtooth";
            oscillator.frequency.value = 220;

            gain.gain.setValueAtTime(0.15, audio.currentTime);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audio.currentTime + 0.25
            );

            oscillator.start();
            oscillator.stop(audio.currentTime + 0.25);

            setTimeout(function () {
                audio.close();
            }, 350);
        }
    } catch (error) {
        console.log("Không thể phát âm thanh cảnh báo:", error);
    }
}

        input.value = "";

    });

});


 // =====================================
 // ĐIỀU KHIỂN TRÒ CHƠI SĂN CHỮ TRONG MÂY
 // =====================================

document.addEventListener("DOMContentLoaded", function () {

    const board = document.getElementById("cloudGameBoard");
    const input = document.getElementById("cloudTypingInput");

    const startButton = document.getElementById("cloudStartButton");
    const backButton = document.getElementById("cloudBackButton");
	const playAgainButton = document.getElementById("cloudPlayAgain");

    const scoreDisplay = document.getElementById("cloudScore");
    const message = document.getElementById("cloudMessage");

    if (!board || !input || !startButton) return;

    let isCloudPlaying = false;
    let spawnTimer = null;

    function startCloudGame() {

        clearInterval(spawnTimer);
		// ĐẶT LẠI 3 LƯỢT CHƠI
if (typeof window.resetCloudLives === "function") {
    window.resetCloudLives();
}

        board.innerHTML = "";
        scoreDisplay.textContent = "0";

        input.value = "";
        input.disabled = false;
        input.focus();

        isCloudPlaying = true;
		window.cloudGameRunning = true;

        message.textContent =
            "☁️ Hãy nhanh tay gõ chữ trong những đám mây!";

        startButton.disabled = true;

        window.createFallingCloud();

        spawnTimer = setInterval(function () {

            if (isCloudPlaying) {
                window.createFallingCloud();
            }

        }, 1800);
    }

    function stopCloudGame() {

        isCloudPlaying = false;
		window.cloudGameRunning = false;

        clearInterval(spawnTimer);

        input.disabled = true;

        startButton.disabled = false;

        board.innerHTML = "";
    }

    startButton.addEventListener("click", startCloudGame);
	if (playAgainButton) {
    playAgainButton.addEventListener("click", startCloudGame);
}

    backButton.addEventListener("click", stopCloudGame);

    window.stopCloudTypingGame = stopCloudGame;

});



 // =====================================
 // QUẢN LÝ 3 LƯỢT CHƠI SĂN CHỮ TRONG MÂY
 // =====================================

document.addEventListener("DOMContentLoaded", function () {

    const livesDisplay = document.getElementById("cloudLives");
    const finishPanel = document.getElementById("cloudFinish");
    const finalScore = document.getElementById("cloudFinalScore");
    const message = document.getElementById("cloudMessage");

    if (!livesDisplay || !finishPanel) return;

    let lives = 3;

    // KHỞI TẠO LẠI 3 LƯỢT
    window.resetCloudLives = function () {
        lives = 3;
        livesDisplay.textContent = lives;
        finishPanel.hidden = true;
    };
	
	// =====================================
// PHÁO HOA VÀ ÂM THANH VỖ TAY
// =====================================

function celebrateCloudGame() {

    const fireworks = document.getElementById("cloudFireworks");

    if (fireworks) {

        fireworks.innerHTML = "";

        const colors = [
            "#ff3333",
            "#ffcc00",
            "#00ccff",
            "#ff66cc",
            "#66dd66",
            "#9933ff"
        ];

        let count = 0;

        const fireworkTimer = setInterval(function () {

            const burst = document.createElement("span");

const fireworkIcons = ["🎆", "🎇", "✨", "🌟", "💥"];

burst.textContent =
    fireworkIcons[Math.floor(Math.random() * fireworkIcons.length)];

burst.style.position = "absolute";
burst.style.left = (10 + Math.random() * 80) + "%";
burst.style.top = (10 + Math.random() * 75) + "%";
burst.style.fontSize = "36px";
burst.style.lineHeight = "1";
burst.style.zIndex = "10";
burst.style.pointerEvents = "none";

fireworks.appendChild(burst);

// TẠO CHUYỂN ĐỘNG PHÁO HOA
burst.animate(
    [
        {
            transform: "scale(0.2) rotate(0deg)",
            opacity: 1
        },
        {
            transform: "scale(1.8) rotate(180deg)",
            opacity: 1
        },
        {
            transform: "scale(0.5) rotate(360deg)",
            opacity: 0
        }
    ],
    {
        duration: 1400,
        easing: "ease-out",
        fill: "forwards"
    }
);	

            setTimeout(function () {
                burst.remove();
            }, 1300);

            count++;

            if (count >= 16) {
                clearInterval(fireworkTimer);
            }

        }, 250);
    }

   // NHẠC CHÚC MỪNG CHIẾN THẮNG
try {

    const AudioContext =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) return;

    const audio = new AudioContext();

    audio.resume().then(function () {

        // Giai điệu chúc mừng vui nhộn
        const melody = [
            523, 659, 784, 1047,
            784, 880, 1047, 1319,
            1047, 1175, 1319, 1568
        ];

        melody.forEach(function (frequency, index) {

            const oscillator = audio.createOscillator();
            const gain = audio.createGain();

            oscillator.type = "sine";
            oscillator.frequency.value = frequency;

            oscillator.connect(gain);
            gain.connect(audio.destination);

            const start = audio.currentTime + index * 0.18;

            gain.gain.setValueAtTime(0.001, start);
            gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
            gain.gain.exponentialRampToValueAtTime(
                0.001,
                start + 0.17
            );

            oscillator.start(start);
            oscillator.stop(start + 0.18);
        });

        setTimeout(function () {
            audio.close();
        }, 2600);

    });

} catch (error) {
    console.log("Không thể phát nhạc chúc mừng:", error);
}
}

    // MẤT MỘT LƯỢT KHI MÂY RƠI CHẠM ĐÁY
    window.cloudMissed = function () {

        if (!window.cloudGameRunning) return;

        lives--;

        livesDisplay.textContent = lives;

        message.textContent =
            "💨 Ôi! Một đám mây đã rơi mất!";

        if (lives <= 0) {

            window.stopCloudTypingGame();

            finishPanel.hidden = false;
			celebrateCloudGame();

            finalScore.textContent =
                "⭐ Em đạt được " +
                document.getElementById("cloudScore").textContent +
                " điểm!";

            message.textContent =
                "🌈 Hãy luyện tập thêm để săn được nhiều chữ nhé!";
        }
    };

});

// =====================================
// HIỂN THỊ TÊN HỌC SINH VÀ TỔNG XP
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const studentName =
        localStorage.getItem("tinHoc3_studentName");

    const totalXP =
        localStorage.getItem("tinHoc3_xp") || 0;

    const nameDisplay =
        document.getElementById("typingStudentName");

    const xpDisplay =
        document.getElementById("typingTotalXP");

    if (nameDisplay) {
        nameDisplay.textContent =
            "👋 Xin chào, " + (studentName || "bạn nhỏ") + "!";
    }

    if (xpDisplay) {
        xpDisplay.textContent = totalXP + " XP";
    }

});
