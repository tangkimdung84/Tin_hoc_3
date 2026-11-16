
// =====================================
// TRANG VUI CÙNG CHUỘT MÁY TÍNH
// HIỂN THỊ THÔNG TIN HỌC SINH
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // Lấy tên học sinh
    const studentName =
        localStorage.getItem("tinHoc3_studentName");

    // Nếu chưa đăng nhập, quay về trang đăng nhập
    if (!studentName) {
        window.location.href = "index.html";
        return;
    }

    // Hiển thị tên học sinh
    const nameElement =
        document.getElementById("mouseStudentName");

    if (nameElement) {
        nameElement.textContent =
            "Xin chào, " + studentName + "!";
    }

    // Hiển thị tổng XP
    const totalXP =
        Number(localStorage.getItem("tinHoc3_xp") || 0);

    const xpElement =
        document.getElementById("mouseTotalXP");

    if (xpElement) {
        xpElement.textContent = totalXP + " XP";
    }

});


/* =====================================
   TRÒ CHƠI 1: SĂN HÌNH RƠI
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const gameCards = document.querySelector(".mouse-games");
    const gameArea = document.getElementById("clickGameArea");

    const startButton = document.getElementById("clickStartButton");
    const backButton = document.getElementById("clickBackButton");
    const fallingObjects = document.getElementById("fallingObjects");

    const timerDisplay = document.getElementById("clickTimer");
    const scoreDisplay = document.getElementById("clickScore");
    const hitsDisplay = document.getElementById("clickHits");

    const message = document.getElementById("clickMessage");
    const finishPanel = document.getElementById("clickFinishPanel");

    const finalScore = document.getElementById("clickFinalScore");
	const praise = document.getElementById("clickPraise");
	
    const rewardXP = document.getElementById("clickRewardXP");
	const fireworks = document.getElementById("clickFireworks");
	
    const playAgainButton = document.getElementById("clickPlayAgain");

    let timeLeft = 60;
    let score = 0;
    let hits = 0;
    let timer = null;
    let spawnTimer = null;
    let isPlaying = false;

    // CÁC HÌNH ẢNH XUẤT HIỆN
    const emojis = [
        "⭐", "🍎", "💖", "🌻", "⚽",
        "🍓", "🌈", "🦋", "🍊", "🎈",
        "🐱", "🍉", "🌸", "🚀", "🐥"
    ];

    // MỞ TRÒ CHƠI
    document.querySelectorAll('[data-game="click"]')
        .forEach(function (button) {

            button.addEventListener("click", function () {

                gameCards.hidden = true;
                gameArea.hidden = false;

                finishPanel.hidden = true;
                message.textContent = "Em hãy nhấn Bắt đầu nhé!";
                message.style.display = "flex";

                gameArea.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    // PHÁT ÂM THANH VUI NHỘN KHI BẮT ĐƯỢC HÌNH
    function playCatchSound() {

        try {
            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            const audio = new AudioContext();

            [660, 880, 1100].forEach(function (frequency, index) {

                const oscillator = audio.createOscillator();
                const gain = audio.createGain();

                oscillator.type = "sine";
                oscillator.frequency.value = frequency;

                oscillator.connect(gain);
                gain.connect(audio.destination);

                const startTime = audio.currentTime + index * 0.09;

                gain.gain.setValueAtTime(0.0001, startTime);
                gain.gain.exponentialRampToValueAtTime(
                    0.18,
                    startTime + 0.02
                );
                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    startTime + 0.16
                );

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.17);

            });

            setTimeout(function () {
                audio.close();
            }, 700);

        } catch (error) {
            console.log("Không thể phát âm thanh:", error);
        }

    }
	
	window.playCatchSound = playCatchSound;

    // TẠO MỘT HÌNH ẢNH RƠI
    function createFallingObject() {

        if (!isPlaying) return;

        const object = document.createElement("button");

        object.type = "button";
        object.className = "falling-object";
        object.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        const fieldWidth = fallingObjects.clientWidth;
        const objectWidth = 65;

        const randomX = Math.random() *
            Math.max(0, fieldWidth - objectWidth);

        const duration = 5 + Math.random() * 2;

        object.style.left = randomX + "px";
        object.style.animationDuration = duration + "s";

        fallingObjects.appendChild(object);

        // NHẤN CHỌN HÌNH
        object.addEventListener("click", function () {

            if (!isPlaying || object.dataset.caught === "true") {
                return;
            }

            object.dataset.caught = "true";

            hits++;
            score += 10;

            scoreDisplay.textContent = score;
            hitsDisplay.textContent = hits;

            playCatchSound();

            object.remove();

        });

        // XÓA HÌNH KHI RƠI HẾT KHUNG
        object.addEventListener("animationend", function () {
            object.remove();
        });

    }

    // DỌN CÁC HÌNH ĐANG RƠI
    function clearFallingObjects() {
        fallingObjects.innerHTML = "";
    }
	
	
// TẠO HIỆU ỨNG PHÁO HOA
function createFireworks() {

    if (!fireworks) return;

    fireworks.innerHTML = "";

    const colors = [
        "#ff4757",
        "#ffa502",
        "#2ed573",
        "#1e90ff",
        "#e056fd",
        "#f9ca24"
    ];

    for (let burst = 0; burst < 5; burst++) {

        setTimeout(function () {

            const centerX = 10 + Math.random() * 80;
            const centerY = 15 + Math.random() * 65;

            for (let i = 0; i < 18; i++) {

                const particle = document.createElement("span");

                particle.className = "firework-particle";

                particle.style.left = centerX + "%";
                particle.style.top = centerY + "%";

                particle.style.background =
                    colors[Math.floor(Math.random() * colors.length)];

                const angle = (Math.PI * 2 * i) / 18;
                const distance = 35 + Math.random() * 45;

                particle.style.setProperty(
                    "--move-x",
                    Math.cos(angle) * distance + "px"
                );

                particle.style.setProperty(
                    "--move-y",
                    Math.sin(angle) * distance + "px"
                );

                fireworks.appendChild(particle);

                particle.addEventListener("animationend", function () {
                    particle.remove();
                });

            }

        }, burst * 350);

    }

}

// ÂM THANH CHÚC MỪNG KHI HOÀN THÀNH
// ÂM THANH CHÚC MỪNG
function playCelebrationSound() {

    const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) return;

    const audio = new AudioContextClass();

    function playNote(frequency, delay, duration) {

        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = frequency;

        oscillator.connect(gain);
        gain.connect(audio.destination);

        const start = audio.currentTime + delay;

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            start + duration
        );

        oscillator.start(start);
        oscillator.stop(start + duration);
    }

    const melody = [
        [523, 0, 0.25],
        [659, 0.25, 0.25],
        [784, 0.5, 0.25],
        [1047, 0.75, 0.5],
        [784, 1.25, 0.25],
        [1047, 1.5, 0.6]
    ];

    melody.forEach(function (note) {
        playNote(note[0], note[1], note[2]);
    });

    setTimeout(function () {
        audio.close();
    }, 2500);
}
window.playCelebrationSound = playCelebrationSound;


    // BẮT ĐẦU TRÒ CHƠI
    function startGame() {

        clearInterval(timer);
        clearInterval(spawnTimer);

        clearFallingObjects();

        timeLeft = 60;
        score = 0;
        hits = 0;
        isPlaying = true;

        timerDisplay.textContent = timeLeft;
        scoreDisplay.textContent = score;
        hitsDisplay.textContent = hits;

        finishPanel.hidden = true;
        message.style.display = "none";

        startButton.disabled = true;

        // TẠO HÌNH NGAY KHI BẮT ĐẦU
        for (let i = 0; i < 4; i++) {
            setTimeout(createFallingObject, i * 250);
        }

        // LIÊN TỤC TẠO HÌNH MỚI
        spawnTimer = setInterval(function () {
            createFallingObject();
        },1000);

        // ĐẾM NGƯỢC 60 GIÂY
        timer = setInterval(function () {

            timeLeft--;

            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                finishGame();
            }

        }, 1000);

    }

    // KẾT THÚC TRÒ CHƠI
    function finishGame() {

        clearInterval(timer);
        clearInterval(spawnTimer);

        isPlaying = false;

        clearFallingObjects();

        startButton.disabled = false;
        finishPanel.hidden = false;
// TẠO PHÁO HOA
createFireworks();
// PHÁT ÂM THANH CHÚC MỪNG
playCelebrationSound();


        finalScore.textContent =
    "⭐ Em bắt được " + hits +
    " hình và đạt " + score + " điểm!";

// LỜI KHEN THEO THÀNH TÍCH
if (praise) {

    if (score >= 300) {
        praise.textContent = "🏆 SIÊU SAO NHANH TAY! EM THẬT XUẤT SẮC!";

    } else if (score >= 150) {
        praise.textContent = "🌟 Em làm rất tốt! Hãy tiếp tục phát huy nhé!";

    } else if (score >= 50) {
        praise.textContent = "👏 Cố gắng rất đáng khen!";

    } else {
        praise.textContent = "💖 Em hãy luyện tập thêm nhé! Cô tin em sẽ làm tốt hơn!";
    }

} else {
    console.error("Không tìm thấy phần tử clickPraise!");
}

        // THƯỞNG XP SAU MỖI LẦN CHƠI
const earnedXP = Math.min(20, hits);

let totalXP = Number(
    localStorage.getItem("tinHoc3_xp") || 0
);

totalXP += earnedXP;

localStorage.setItem("tinHoc3_xp", totalXP);

rewardXP.textContent =
    "🎁 Chúc mừng em nhận được " + earnedXP + " XP!";
	
	
	

        // CẬP NHẬT XP TRÊN ĐẦU TRANG
        const xpElement =
            document.getElementById("mouseTotalXP");

        if (xpElement) {
            xpElement.textContent =
                Number(localStorage.getItem("tinHoc3_xp") || 0)
                + " XP";
        }

        finishPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    // NÚT BẮT ĐẦU
    startButton.addEventListener("click", startGame);

    // CHƠI LẠI
    playAgainButton.addEventListener("click", function () {
        finishPanel.hidden = true;
        startGame();
    });

    // QUAY LẠI DANH SÁCH TRÒ CHƠI
    backButton.addEventListener("click", function () {

        clearInterval(timer);
        clearInterval(spawnTimer);

        isPlaying = false;

        clearFallingObjects();

        finishPanel.hidden = true;
        startButton.disabled = false;

        gameArea.hidden = true;
        gameCards.hidden = false;

        gameCards.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

// =====================================
// TRÒ CHƠI 2: THỬ TÀI NHÁY ĐÚP - TÔ MÀU
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const gameCards = document.querySelector(".mouse-games");
    const gameArea = document.getElementById("doubleGameArea");

    const startButton = document.getElementById("doubleStartButton");
    const backButton = document.getElementById("doubleBackButton");
    const playAgainButton = document.getElementById("doublePlayAgain");

    const palette = document.getElementById("colorPalette");
    const board = document.getElementById("coloringBoard");
    const message = document.getElementById("coloringMessage");

    const finishPanel = document.getElementById("doubleFinishPanel");
    const finalScore = document.getElementById("doubleFinalScore");
    const praise = document.getElementById("doublePraise");
    const rewardXP = document.getElementById("doubleRewardXP");
    const fireworks = document.getElementById("doubleFireworks");

    if (!gameArea || !board) return;

    let selectedColor = "#ff595e";
    let coloredRegions = 0;
	let totalRegions = 0;
	
	let currentPicture = 1;
	const totalPictures = 3;
    let isPlaying = false;
    let lastTouchTime = 0;

    // CHỌN MÀU
    palette.querySelectorAll(".color-choice").forEach(function (button) {

        button.addEventListener("click", function () {

            selectedColor = this.dataset.color;

            palette.querySelectorAll(".color-choice")
                .forEach(function (item) {
                    item.classList.remove("selected");
                });

            this.classList.add("selected");

            message.textContent = "🎨 Đã chọn màu! Hãy nháy đúp vào vùng tranh nhé!";
        });

    });

    // MỞ TRÒ CHƠI
    document.querySelectorAll('[data-game="double"]')
        .forEach(function (button) {

            button.addEventListener("click", function () {

                gameCards.hidden = true;
                gameArea.hidden = false;

                finishPanel.hidden = true;

                message.textContent = "Em hãy nhấn Bắt đầu tô màu nhé!";

                board.innerHTML =
                    "<p>🖼️ Bức tranh của em sẽ xuất hiện ở đây!</p>";

                gameArea.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        });

    
// TẠO 3 BỨC TRANH TÔ MÀU
function createColoringPicture() {

    let picture = "";

    // BỨC TRANH 1: BÔNG HOA
    if (currentPicture === 1) {

        picture = `
        <svg viewBox="0 0 600 400" width="100%"
             style="max-width:700px;height:auto"
             xmlns="http://www.w3.org/2000/svg">

            <circle data-region="sun" cx="500" cy="75" r="42"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="cloud"
                d="M65 105 C45 105 40 80 60 70 C65 40 105 35 120 60 C145 45 175 65 170 90 C190 110 170 125 150 125 L75 125 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="stem"
                d="M295 180 L310 180 L310 350 L295 350 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="leaf1"
                d="M300 270 C245 220 205 255 225 295 C250 320 280 295 300 270 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="leaf2"
                d="M305 305 C350 250 395 280 375 320 C355 340 325 325 305 305 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <circle data-region="petal1" cx="300" cy="105" r="35" fill="white" stroke="#333" stroke-width="4"/>
            <circle data-region="petal2" cx="350" cy="145" r="35" fill="white" stroke="#333" stroke-width="4"/>
            <circle data-region="petal3" cx="330" cy="200" r="35" fill="white" stroke="#333" stroke-width="4"/>
            <circle data-region="petal4" cx="270" cy="200" r="35" fill="white" stroke="#333" stroke-width="4"/>
            <circle data-region="petal5" cx="250" cy="145" r="35" fill="white" stroke="#333" stroke-width="4"/>

            <circle data-region="center" cx="300" cy="153" r="35"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="ground"
                d="M20 355 Q150 330 300 355 Q450 330 580 355 L580 390 L20 390 Z"
                fill="white" stroke="#333" stroke-width="4"/>
        </svg>`;
    }

    // BỨC TRANH 2: CHÚ BƯỚM
    else if (currentPicture === 2) {

        picture = `
        <svg viewBox="0 0 600 400" width="100%"
             style="max-width:700px;height:auto"
             xmlns="http://www.w3.org/2000/svg">

            <circle data-region="sun" cx="500" cy="65" r="38"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="wing1"
                d="M285 180 C220 65 90 75 125 200 C150 270 245 245 285 200 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="wing2"
                d="M315 180 C380 65 510 75 475 200 C450 270 355 245 315 200 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="wing3"
                d="M285 205 C205 205 175 310 245 315 C280 315 295 260 300 220 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="wing4"
                d="M315 205 C395 205 425 310 355 315 C320 315 305 260 300 220 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <ellipse data-region="body" cx="300" cy="205" rx="20" ry="85"
                fill="white" stroke="#333" stroke-width="4"/>

            <circle data-region="head" cx="300" cy="105" r="28"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="antenna1"
                d="M290 82 Q260 35 245 55"
                fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/>

            <path data-region="antenna2"
                d="M310 82 Q340 35 355 55"
                fill="none" stroke="#333" stroke-width="5" stroke-linecap="round"/>

            <circle data-region="flower" cx="100" cy="320" r="28"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="ground"
                d="M20 355 Q150 335 300 355 Q450 335 580 355 L580 390 L20 390 Z"
                fill="white" stroke="#333" stroke-width="4"/>
        </svg>`;
    }

    // BỨC TRANH 3: NGÔI NHÀ
    else if (currentPicture === 3) {

        picture = `
        <svg viewBox="0 0 600 400" width="100%"
             style="max-width:700px;height:auto"
             xmlns="http://www.w3.org/2000/svg">

            <circle data-region="sun" cx="500" cy="65" r="38"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="roof"
                d="M120 190 L300 55 L480 190 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <rect data-region="house" x="155" y="185" width="290" height="165"
                fill="white" stroke="#333" stroke-width="4"/>

            <rect data-region="door" x="270" y="255" width="65" height="95"
                fill="white" stroke="#333" stroke-width="4"/>

            <rect data-region="window1" x="185" y="220" width="60" height="55"
                fill="white" stroke="#333" stroke-width="4"/>

            <rect data-region="window2" x="355" y="220" width="60" height="55"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="chimney"
                d="M385 120 L385 65 L425 65 L425 150 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="tree"
                d="M70 280 Q35 220 85 190 Q65 135 120 145 Q175 135 155 205 Q195 255 140 280 Z"
                fill="white" stroke="#333" stroke-width="4"/>

            <rect data-region="treeTrunk" x="95" y="275" width="35" height="80"
                fill="white" stroke="#333" stroke-width="4"/>

            <path data-region="ground"
                d="M20 355 Q150 335 300 355 Q450 335 580 355 L580 390 L20 390 Z"
                fill="white" stroke="#333" stroke-width="4"/>
        </svg>`;
    }

    board.innerHTML = picture;

coloredRegions = 0;

totalRegions = board.querySelectorAll("[data-region]").length;
}


    // TÔ MÀU MỘT VÙNG
    function colorRegion(region) {

        if (!isPlaying || !region) return;

        if (region.dataset.colored !== "true") {
            coloredRegions++;
            region.dataset.colored = "true";
        }

        region.setAttribute("fill", selectedColor);

       message.textContent =
    "🌟 Bức tranh " + currentPicture +
    "/" + totalPictures +
    " – Em đã tô được " + coloredRegions +
    "/" + totalRegions + " vùng tranh!";

// HOÀN THÀNH BỨC TRANH
if (coloredRegions >= totalRegions) {
    nextColoringPicture();
}
	}

// CHUYỂN SANG BỨC TRANH TIẾP THEO
function nextColoringPicture() {

    if (currentPicture < totalPictures) {

        currentPicture++;

        coloredRegions = 0;

        createColoringPicture();

        message.textContent =
            "🎉 Hoàn thành tranh trước rồi! " +
            "Bây giờ hãy tô bức tranh " +
            currentPicture + "/" + totalPictures + " nhé!";

    } else {

        finishColoringGame();

    }

}


    // NHÁY ĐÚP CHUỘT
    board.addEventListener("dblclick", function (event) {

        const region = event.target.closest("[data-region]");

        if (region) {
            colorRegion(region);
        }

    });

    // HỖ TRỢ CHẠM HAI LẦN TRÊN ĐIỆN THOẠI
    board.addEventListener("pointerdown", function (event) {

        if (event.pointerType !== "touch") return;

        const region = event.target.closest("[data-region]");

        if (!region || !isPlaying) return;

        const now = Date.now();

        if (now - lastTouchTime < 350) {
            colorRegion(region);
            lastTouchTime = 0;
        } else {
            lastTouchTime = now;
        }

    });

    // BẮT ĐẦU TÔ MÀU
    function startColoringGame() {

        finishPanel.hidden = true;

        currentPicture = 1;
coloredRegions = 0;
totalRegions = 0;
lastTouchTime = 0;
isPlaying = true;

        createColoringPicture();

        message.textContent =
    "🎨 Bức tranh 1/3 – Chọn màu và nháy đúp vào từng vùng để tô nhé!";

        startButton.disabled = true;
    }

    // KẾT THÚC TRÒ CHƠI
    function finishColoringGame() {

        if (!isPlaying) return;

        isPlaying = false;
        startButton.disabled = false;

        finishPanel.hidden = false;

        finalScore.textContent =
            "🌸 Em đã tô màu thành công cả 12 vùng của bức tranh!";

        praise.textContent =
            "🏆 TUYỆT VỜI! EM ĐÃ LÀM CHỦ THAO TÁC NHÁY ĐÚP!";

       
// ÂM THANH CHÚC MỪNG
if (typeof playCelebrationSound === "function") {
    playCelebrationSound();
}

	   // PHÁO HOA
        fireworks.innerHTML = "";

        const colors = [
            "#ff4757", "#ffa502", "#2ed573",
            "#1e90ff", "#e056fd", "#f9ca24"
        ];

        for (let i = 0; i < 45; i++) {

            const particle = document.createElement("span");

            particle.className = "firework-particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 80 + "%";

            particle.style.background =
                colors[Math.floor(Math.random() * colors.length)];

            particle.style.setProperty(
                "--move-x",
                (Math.random() - 0.5) * 150 + "px"
            );

            particle.style.setProperty(
                "--move-y",
                (Math.random() - 0.5) * 150 + "px"
            );

            fireworks.appendChild(particle);

        }

        // THƯỞNG XP SAU MỖI LẦN HOÀN THÀNH
const earnedXP = 20;

let totalXP = Number(
    localStorage.getItem("tinHoc3_xp") || 0
);

totalXP += earnedXP;

localStorage.setItem("tinHoc3_xp", totalXP);

rewardXP.textContent =
    "🎁 Chúc mừng em nhận được " + earnedXP + " XP!";
	
	
	
	
        const xpElement = document.getElementById("mouseTotalXP");

        if (xpElement) {
            xpElement.textContent =
                Number(localStorage.getItem("tinHoc3_xp") || 0) + " XP";
        }

        finishPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

    // CÁC NÚT ĐIỀU KHIỂN
    startButton.addEventListener("click", startColoringGame);

    playAgainButton.addEventListener("click", startColoringGame);

    backButton.addEventListener("click", function () {

        isPlaying = false;

        finishPanel.hidden = true;
        gameArea.hidden = true;
        gameCards.hidden = false;

        startButton.disabled = false;

        gameCards.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});



// =====================================
// TRÒ CHƠI 3: NHÀ KHÁM PHÁ CHUỘT PHẢI
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const gameCards = document.querySelector(".mouse-games");
    const gameArea = document.getElementById("rightGameArea");

    const startButton = document.getElementById("rightStartButton");
    const backButton = document.getElementById("rightBackButton");
    const playAgainButton = document.getElementById("rightPlayAgain");

    const timerDisplay = document.getElementById("rightTimer");
    const scoreDisplay = document.getElementById("rightScore");
    const hitsDisplay = document.getElementById("rightHits");

    const question = document.getElementById("rightQuestion");
    const message = document.getElementById("rightMessage");
    const pictureList = document.getElementById("rightPictureList");

    const finishPanel = document.getElementById("rightFinishPanel");
	// ĐƯA HỘP KẾT QUẢ RA NGOÀI KHU VỰC TRÒ CHƠI
document.body.appendChild(finishPanel);
    const finalScore = document.getElementById("rightFinalScore");
    const praise = document.getElementById("rightPraise");
    const rewardXP = document.getElementById("rightRewardXP");
    const fireworks = document.getElementById("rightFireworks");

    if (!gameArea || !startButton || !pictureList) return;

    const pictures = [
        { name: "Con mèo", icon: "🐱" },
        { name: "Quả táo", icon: "🍎" },
        { name: "Máy tính", icon: "💻" },
        { name: "Bông hoa", icon: "🌸" },
        { name: "Xe đạp", icon: "🚲" },
        { name: "Quyển sách", icon: "📚" },
        { name: "Con cá", icon: "🐠" },
        { name: "Quả bóng", icon: "⚽" },
        { name: "Máy bay", icon: "✈️" },
        { name: "Ngôi nhà", icon: "🏠" },
        { name: "Cây xanh", icon: "🌳" },
        { name: "Mặt trời", icon: "☀️" }
    ];

    let score = 0;
    let hits = 0;
    let timeLeft = 60;
    let currentTarget = null;
    let timer = null;
    let isPlaying = false;
    let touchTimer = null;
    let touchHandled = false;

    const totalRounds = 8;

    // XÁO TRỘN HÌNH ẢNH
    function shufflePictures(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    // HIỂN THỊ MỘT LƯỢT CHƠI
    function createRightRound() {

        pictureList.innerHTML = "";

        const selectedPictures = shufflePictures(pictures).slice(0, 6);
        currentTarget = selectedPictures[
            Math.floor(Math.random() * selectedPictures.length)
        ];

        question.textContent =
            "🔎 Em hãy tìm hình: " + currentTarget.name;

        selectedPictures.forEach(function (picture) {

            const button = document.createElement("button");
            button.type = "button";
            button.className = "right-picture";
            button.innerHTML = `
                ${picture.icon}
                <span>${picture.name}</span>
            `;

            // THAO TÁC CHUỘT PHẢI
            button.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                checkRightAnswer(picture, button);
            });

            // ĐIỆN THOẠI: NHẤN GIỮ ĐỂ THAY CHUỘT PHẢI
            button.addEventListener("touchstart", function (event) {
                event.preventDefault();

                touchHandled = false;

                touchTimer = setTimeout(function () {
                    touchHandled = true;
                    checkRightAnswer(picture, button);
                }, 650);

            }, { passive: false });

            button.addEventListener("touchend", function () {
                clearTimeout(touchTimer);
            });

            button.addEventListener("touchmove", function () {
                clearTimeout(touchTimer);
            });

            pictureList.appendChild(button);
        });

        message.textContent =
            "🖱️ Hãy nhấn chuột phải vào hình em chọn nhé!";
    }

    // KIỂM TRA ĐÁP ÁN
    function checkRightAnswer(picture, button) {

        if (!isPlaying || button.classList.contains("correct")) return;

        if (picture.name === currentTarget.name) {

            score += 10;
            hits++;

            scoreDisplay.textContent = score;
            hitsDisplay.textContent = hits;

            button.classList.add("correct");

            const praises = [
    "🎉 Chính xác! Em thật tuyệt vời! +10 điểm",
    "🌟 Giỏi quá! Đôi tay khám phá thật nhanh! +10 điểm",
    "🏆 Hoan hô! Em đã tìm đúng rồi! +10 điểm",
    "👏 Xuất sắc! Em là nhà khám phá tài ba! +10 điểm",
    "💖 Tuyệt lắm! Tiếp tục phát huy nhé! +10 điểm"
];

message.textContent =
    praises[Math.floor(Math.random() * praises.length)];

           if (typeof window.playCatchSound === "function") {
    window.playCatchSound();
}

            if (hits >= totalRounds) {
                finishRightGame(true);
            } else {
                setTimeout(function () {
                    if (isPlaying) createRightRound();
                }, 700);
            }

        } else {

            message.textContent =
                "😊 Chưa đúng rồi! Em hãy thử lại nhé!";
        }
    }

    // BẮT ĐẦU TRÒ CHƠI
    function startRightGame() {

        clearInterval(timer);
        clearTimeout(touchTimer);

        score = 0;
        hits = 0;
        timeLeft = 60;
        isPlaying = true;

        scoreDisplay.textContent = "0";
        hitsDisplay.textContent = "0";
        timerDisplay.textContent = "60";

        finishPanel.hidden = true;
        fireworks.innerHTML = "";

        startButton.disabled = true;

        createRightRound();

        timer = setInterval(function () {

            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                finishRightGame(false);
            }

        }, 1000);
    }

    // KẾT THÚC TRÒ CHƠI
    function finishRightGame(completed) {

        if (!isPlaying) return;

        isPlaying = false;
        clearInterval(timer);
        clearTimeout(touchTimer);

        startButton.disabled = false;
        finishPanel.hidden = false;

        pictureList.innerHTML = "";

        finalScore.textContent =
            "⭐ Em đạt được " + score + " điểm!";

        praise.textContent = completed
            ? "🏆 XUẤT SẮC! Em đã khám phá đủ 8 hình ảnh!"
            : "🌟 Em đã tìm được " + hits + "/8 hình ảnh. Cố gắng thêm nhé!";

        // PHÁO HOA
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement("span");
            particle.className = "firework-particle";

            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";

            fireworks.appendChild(particle);
        }

       // THƯỞNG XP SAU MỖI LẦN HOÀN THÀNH
if (completed) {

    const earnedXP = 20;

    let totalXP = Number(
        localStorage.getItem("tinHoc3_xp") || 0
    );

    totalXP += earnedXP;

    localStorage.setItem("tinHoc3_xp", totalXP);

    rewardXP.textContent =
        "🎁 Chúc mừng em nhận được " + earnedXP + " XP!";

    const xpDisplay = document.getElementById("mouseTotalXP");

    if (xpDisplay) {
        xpDisplay.textContent = totalXP + " XP";
    }

    if (typeof window.playCelebrationSound === "function") {
        window.playCelebrationSound();
    }

} else {
    rewardXP.textContent =
        "💪 Hãy chơi lại để hoàn thành thử thách và nhận XP nhé!";
}
            

           
    }

    // CHỌN TRÒ CHƠI
    document.querySelectorAll('[data-game="right"]')
        .forEach(function (button) {

            button.addEventListener("click", function () {

                gameCards.hidden = true;
                gameArea.hidden = false;

                finishPanel.hidden = true;
                startButton.disabled = false;

                message.textContent =
                    "🌟 Nhấn Bắt đầu để trở thành nhà khám phá nhé!";

            });
        });

    // CÁC NÚT ĐIỀU KHIỂN
    startButton.addEventListener("click", startRightGame);
    playAgainButton.addEventListener("click", startRightGame);

    backButton.addEventListener("click", function () {

        clearInterval(timer);
        clearTimeout(touchTimer);

        isPlaying = false;

        gameArea.hidden = true;
        gameCards.hidden = false;

        finishPanel.hidden = true;
        startButton.disabled = false;
    });

});
