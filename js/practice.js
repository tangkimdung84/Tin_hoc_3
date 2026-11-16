
document.addEventListener("DOMContentLoaded", function () {
    const practiceButton = document.getElementById("practiceButton");
    const lessonActions = document.getElementById("lessonActions");

    if (!practiceButton || !lessonActions) return;

    const params = new URLSearchParams(window.location.search);
    const lessonId = Number(params.get("id"));

    const questions = window.practiceData
        ? window.practiceData[lessonId]
        : null;

    if (!questions || questions.length === 0) {
        practiceButton.disabled = true;
        practiceButton.textContent = "📚 Bài luyện tập đang được cập nhật";
        return;
    }

    let currentQuestion = 0;
	let score = 0;
	let selectedAnswer = null;
	let answered = false;

// Lưu câu trả lời của học sinh trong lượt luyện tập
let userAnswers = [];


    const practiceArea = document.createElement("section");
    practiceArea.className = "practice-section";
    practiceArea.id = "practiceArea";
    practiceArea.hidden = true;

    practiceArea.innerHTML = `
        <div class="practice-header">
            <h2>✏️ Em cùng luyện tập</h2>
            <p>Hãy chọn đáp án đúng nhất nhé!</p>
        </div>

        <div class="practice-progress">
            <span id="questionProgress">Câu 1/${questions.length}</span>
            <span id="practiceScore">⭐ 0 điểm</span>
        </div>

        <div class="practice-progress-bar">
            <div id="progressFill"></div>
        </div>

        <h3 id="questionText"></h3>

        <div id="answerList" class="answer-list"></div>

        <div id="feedbackBox" class="feedback-box" hidden></div>

        <button type="button" id="checkAnswerButton"
                class="action-button primary-button" disabled>
            Kiểm tra đáp án
        </button>

        <button type="button" id="nextQuestionButton"
                class="action-button primary-button" hidden>
            Câu tiếp theo →
        </button>

        <div id="practiceResult" hidden></div>
    `;

    lessonActions.insertAdjacentElement("beforebegin", practiceArea);

    const questionProgress = practiceArea.querySelector("#questionProgress");
    const practiceScore = practiceArea.querySelector("#practiceScore");
    const progressFill = practiceArea.querySelector("#progressFill");
    const questionText = practiceArea.querySelector("#questionText");
    const answerList = practiceArea.querySelector("#answerList");
    const feedbackBox = practiceArea.querySelector("#feedbackBox");
    const checkButton = practiceArea.querySelector("#checkAnswerButton");
    const nextButton = practiceArea.querySelector("#nextQuestionButton");
    const resultBox = practiceArea.querySelector("#practiceResult");

    function showQuestion() {
        const question = questions[currentQuestion];
		
		

        selectedAnswer = null;
        answered = false;

        questionProgress.textContent =
            `Câu ${currentQuestion + 1}/${questions.length}`;

        practiceScore.textContent = `⭐ ${score} điểm`;

        progressFill.style.width =
            `${(currentQuestion / questions.length) * 100}%`;

        questionText.textContent = question.question;
        answerList.innerHTML = "";
        feedbackBox.hidden = true;
        checkButton.hidden = false;
        checkButton.disabled = true;
        nextButton.hidden = true;

        question.options.forEach(function (option, index) {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "answer-option";
            button.textContent =
                `${String.fromCharCode(65 + index)}. ${option}`;

            button.addEventListener("click", function () {
                if (answered) return;

                selectedAnswer = index;

                answerList.querySelectorAll(".answer-option")
                    .forEach(function (item) {
                        item.classList.remove("selected");
                    });

                button.classList.add("selected");
                checkButton.disabled = false;
            });

            answerList.appendChild(button);
        });
    }

    function checkAnswer() {
        if (selectedAnswer === null || answered) return;

        answered = true;

        const question = questions[currentQuestion];
		
		// Lưu câu trả lời của học sinh
userAnswers[currentQuestion] = {
    question: question.question,
    options: [...question.options],
    selectedAnswer: selectedAnswer,
    correctAnswer: question.answer,
    isCorrect: selectedAnswer === question.answer,
    explanation: question.explanation
};
		
		
        const answerButtons =
            answerList.querySelectorAll(".answer-option");

        answerButtons.forEach(function (button, index) {
            button.disabled = true;

            if (index === question.answer) {
                button.classList.add("correct");
            }

            if (index === selectedAnswer &&
                selectedAnswer !== question.answer) {
                button.classList.add("incorrect");
            }
        });

        if (selectedAnswer === question.answer) {
            score += 1;
            feedbackBox.textContent =
                "🎉 Chính xác! " + question.explanation;
            feedbackBox.className = "feedback-box correct-feedback";
        } else {
            feedbackBox.textContent =
                "💡 Chưa chính xác. " + question.explanation;
            feedbackBox.className = "feedback-box incorrect-feedback";
        }

        feedbackBox.hidden = false;
        practiceScore.textContent = `⭐ ${score} điểm`;

        checkButton.hidden = true;
        nextButton.hidden = false;

        nextButton.textContent =
            currentQuestion === questions.length - 1
                ? "Xem kết quả 🏆"
                : "Câu tiếp theo →";
    }

    function showResult() {
        questionProgress.textContent = "Hoàn thành";
        progressFill.style.width = "100%";

        questionText.hidden = true;
        answerList.hidden = true;
        feedbackBox.hidden = true;
        checkButton.hidden = true;
        nextButton.hidden = true;

        const total = questions.length;
        const percentage = Math.round(score / total * 100);

        let message = "Cố gắng luyện tập thêm nhé!";
        if (score === total) {
            message = "Xuất sắc! Em đã trả lời đúng tất cả!";
        } else if (score >= total * 0.6) {
            message = "Rất tốt! Em đã nắm được nhiều kiến thức!";
        }

        resultBox.innerHTML = `
            <div class="result-icon">🏆</div>
            <h2>Chúc mừng em đã hoàn thành!</h2>
            <p class="result-score">${score}/${total} câu đúng</p>
            <p>${message}</p>
            <button type="button" id="retryButton"
                    class="action-button primary-button">
                🔄 Làm lại
            </button>
        `;

        resultBox.hidden = false;

        savePracticeResult(score, total);
    }

    
function savePracticeResult(correct, total) {
    const key = "tinHoc3_practiceResults";
    const xpKey = "tinHoc3_xp";
    const rewardKey = "tinHoc3_practiceRewards";

    let results = {};
    let rewards = [];

    try {
        results = JSON.parse(localStorage.getItem(key)) || {};
        rewards = JSON.parse(localStorage.getItem(rewardKey)) || [];

        if (!Array.isArray(rewards)) {
            rewards = [];
        }
    } catch (error) {
        results = {};
        rewards = [];
    }

    // Lưu lịch sử kết quả
    if (!Array.isArray(results[lessonId])) {
        results[lessonId] = [];
    }

    results[lessonId].push({
    correct: correct,
    total: total,
    date: new Date().toISOString(),

    // Lưu chi tiết câu trả lời
    answers: userAnswers
});

    localStorage.setItem(key, JSON.stringify(results));
	// Kiểm tra và trao huy chương
if (typeof window.checkPracticeBadges === "function") {
    window.checkPracticeBadges();
}
	
	

    // Chỉ thưởng XP một lần cho mỗi bài
    if (!rewards.includes(lessonId)) {
        const earnedXP = correct * 10;
        const currentXP = Number(
            localStorage.getItem(xpKey) || 0
        );

        localStorage.setItem(
            xpKey,
            String(currentXP + earnedXP)
        );

        rewards.push(lessonId);

        localStorage.setItem(
            rewardKey,
            JSON.stringify(rewards)
        );

        practiceScore.textContent =
            `⭐ ${score} điểm | 🎁 +${earnedXP} XP`;

    } else {
        practiceScore.textContent =
            `⭐ ${score} điểm | XP đã nhận trước đó`;
    }
}



    practiceButton.addEventListener("click", function () {
        practiceArea.hidden = false;
        practiceButton.hidden = true;
        practiceArea.scrollIntoView({ behavior: "smooth" });
        showQuestion();
    });

    checkButton.addEventListener("click", checkAnswer);

    nextButton.addEventListener("click", function () {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            showResult();
        }
    });

    resultBox.addEventListener("click", function (event) {
        if (event.target.id === "retryButton") {
            currentQuestion = 0;
            score = 0;

            questionText.hidden = false;
            answerList.hidden = false;
            resultBox.hidden = true;

            practiceButton.hidden = true;
            showQuestion();
        }
    });
});
