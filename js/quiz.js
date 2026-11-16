
// =====================================
// HIỂN THỊ TÊN HỌC SINH VÀ TỔNG XP
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // Lấy tên học sinh đã đăng nhập
    const studentName =
        localStorage.getItem("tinHoc3_studentName");

    // Nếu chưa có tên, quay về trang đăng nhập
    if (!studentName) {
        window.location.href = "index.html";
        return;
    }

    // Hiển thị tên học sinh
    const nameElement =
        document.getElementById("quizStudentName");

    if (nameElement) {
        nameElement.textContent = "Xin chào, " + studentName + "!";
    }

    // Hiển thị tổng XP
    const totalXP =
        Number(localStorage.getItem("tinHoc3_xp") || 0);

    const xpElement =
        document.getElementById("quizTotalXP");

    if (xpElement) {
        xpElement.textContent = totalXP + " XP";
    }

});

// =====================================
// TRANG THỬ TÀI KIẾN THỨC
// HIỂN THỊ DANH SÁCH BÀI HỌC
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const quizLessonList = document.getElementById("quizLessonList");

    // Kiểm tra dữ liệu bài học
    if (!quizLessonList || !window.lessonsData) {
        console.error("Không tìm thấy danh sách bài học!");
        return;
    }

    // Các bài hiện đã có dữ liệu câu hỏi
    const availableQuizLessons = [1, 2];

    // Tạo thẻ bài học
    window.lessonsData.forEach(function (lesson) {

        const isAvailable = availableQuizLessons.includes(lesson.id);

        const lessonCard = document.createElement("div");
        lessonCard.className = "quiz-lesson-card";

        lessonCard.innerHTML = `
            <div class="quiz-lesson-image">
                <img src="${lesson.image}" alt="${lesson.title}">
            </div>

            <div class="quiz-lesson-info">
                <h3>${lesson.title}</h3>

                <p class="${isAvailable ? "quiz-ready" : "quiz-updating"}">
                    ${isAvailable ? "🟢 Sẵn sàng thử tài" : "🔒 Đang cập nhật"}
                </p>

                <button
                    type="button"
                    class="quiz-start-button"
                    ${isAvailable ? "" : "disabled"}
                    data-lesson-id="${lesson.id}">
                    ${isAvailable ? "🚀 Thử tài ngay" : "Chưa mở"}
                </button>
            </div>
        `;

        quizLessonList.appendChild(lessonCard);

    });

    console.log("Đã hiển thị", window.lessonsData.length, "bài học.");

});



/* =====================================
   BƯỚC 6: BẮT ĐẦU THỬ TÀI
   XỬ LÝ CÂU HỎI TRẮC NGHIỆM
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const quizLessonList = document.getElementById("quizLessonList");
    const quizGameSection = document.getElementById("quizGameSection");
    const quizGameTitle = document.getElementById("quizGameTitle");
    const quizGameContent = document.getElementById("quizGameContent");
    const quizBackButton = document.getElementById("quizBackButton");
    const quizResultSection = document.getElementById("quizResultSection");

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let quizScore = 0;
	let lastMatchingOrder = "";
	let currentLessonId = null;

    // Nhấn nút Thử tài ngay
    quizLessonList.addEventListener("click", function (event) {

        const button = event.target.closest(".quiz-start-button");

        if (!button || button.disabled) return;

        const lessonId = Number(button.dataset.lessonId);
		currentLessonId = lessonId;

        const lesson = window.lessonsData.find(
            item => item.id === lessonId
        );

        const lessonQuiz = window.quizData[lessonId];

        if (!lessonQuiz || !lessonQuiz.questions.length) {
            alert("Bài học này chưa có câu hỏi!");
            return;
        }

        // Tạm thời chỉ sử dụng câu hỏi trắc nghiệm
        currentQuestions = lessonQuiz.questions.filter(
    question =>
        question.type === "multiple" ||
        question.type === "truefalse" ||
        question.type === "fillblank" ||
        question.type === "matching" ||
        question.type === "dragdrop"
);



        if (currentQuestions.length === 0) {
            alert("Bài học chưa có câu hỏi trắc nghiệm!");
            return;
        }

        currentQuestionIndex = 0;
        quizScore = 0;

        quizGameTitle.textContent = lesson.title;

        quizLessonList.closest(".quiz-lesson-section").hidden = true;
        quizGameSection.hidden = false;
        quizResultSection.hidden = true;

        renderQuizQuestion();

        quizGameSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });


    // Hiển thị câu hỏi
    function renderQuizQuestion() {

        const question = currentQuestions[currentQuestionIndex];

        quizGameContent.innerHTML = `
            <div class="quiz-question-box">

                <div class="quiz-question-progress">
                    Câu ${currentQuestionIndex + 1}
                    / ${currentQuestions.length}
                </div>

 <h3>${question.type === "truefalse"
    ? question.statement
    : question.type === "fillblank"
        ? question.question.replace("____", "........")
        : question.question}</h3>
		
		


${
    question.type === "dragdrop"
    ? `
        <div class="dragdrop-container">

            <h4>🎯 Các thẻ thông tin</h4>

            <div class="dragdrop-items" id="dragdropItems">
                ${question.items.map((item, index) => `
                    <div
                        class="dragdrop-item"
                        draggable="true"
                        data-item="${index}">
                        ${item}
                    </div>
                `).join("")}
            </div>

            <h4>📦 Kéo thẻ vào vị trí phù hợp</h4>

            <div class="dragdrop-targets" id="dragdropTargets">
                ${question.targets.map((target, index) => `
                    <div class="dragdrop-target" data-target="${index}">
                        <p>${target.label}</p>

                        <div class="dragdrop-dropzone"
                            data-answer="${target.answer}">
                            Thả đáp án vào đây
                        </div>
                    </div>
                `).join("")}
            </div>

        </div>
    `
    : question.type === "matching"
    ? `
        <div class="matching-container" id="matchingContainer">

            <svg class="matching-lines" id="matchingLines"></svg>

            <div class="matching-column" id="matchingLeft">
                ${question.pairs.map((pair, index) => `
                    <button type="button"
                        class="matching-item"
                        data-index="${index}">
                        ${pair.left}
                    </button>
                `).join("")}
            </div>

            <div class="matching-column" id="matchingRight">
                ${(() => {
                    const shuffledPairs = question.pairs.map((pair, index) => ({
                        right: pair.right,
                        index: index
                    }));

                    for (let i = shuffledPairs.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledPairs[i], shuffledPairs[j]] =
                        [shuffledPairs[j], shuffledPairs[i]];
                    }

                    let newOrder = shuffledPairs.map(item => item.index).join(",");

                    if (
                        newOrder === lastMatchingOrder ||
                        shuffledPairs.every((item, index) => item.index === index)
                    ) {
                        shuffledPairs.push(shuffledPairs.shift());
                        newOrder = shuffledPairs.map(item => item.index).join(",");
                    }

                    lastMatchingOrder = newOrder;

                    return shuffledPairs;
                })().map(item => `
                    <button type="button"
                        class="matching-item"
                        data-index="${item.index}">
                        ${item.right}
                    </button>
                `).join("")}
            </div>

        </div>
    `
    : `
        <div class="quiz-answer-list">
            ${
                question.type === "truefalse"
                ? `
                    <button type="button" class="quiz-answer-button" data-answer="true">
                        Đúng
                    </button>
                    <button type="button" class="quiz-answer-button" data-answer="false">
                        Sai
                    </button>
                `
                : question.options.map((option, index) => `
                    <button type="button"
                        class="quiz-answer-button"
                        data-answer="${index}">
                        ${String.fromCharCode(65 + index)}. ${option}
                    </button>
                `).join("")
            }
        </div>
    `
}




                <div id="quizFeedback"></div>

            </div>
        `;
// XỬ LÝ CÂU HỎI NỐI CẶP
// XỬ LÝ CÂU HỎI NỐI CẶP
if (question.type === "matching") {
    handleMatchingQuestion(question);
    return;
}

// XỬ LÝ CÂU HỎI KÉO THẢ
if (question.type === "dragdrop") {
    handleDragDropQuestion(question);
    return;
}	

        const answerButtons = quizGameContent.querySelectorAll(
            ".quiz-answer-button"
        );

        answerButtons.forEach(function (answerButton) {

            answerButton.addEventListener("click", function () {

                const selectedAnswer = question.type === "truefalse"
    ? answerButton.dataset.answer === "true"
    : Number(answerButton.dataset.answer);

const isCorrect = selectedAnswer === question.answer;

                if (isCorrect) {
                    quizScore++;
                }

                answerButtons.forEach(function (button, index) {

                    button.disabled = true;

                    if (index === question.answer) {
                        button.classList.add("answer-correct");
                    } else if (index === selectedAnswer) {
                        button.classList.add("answer-incorrect");
                    }

                });

                const feedback = document.getElementById("quizFeedback");

                feedback.innerHTML = `
                    <div class="${isCorrect ? "quiz-feedback-correct" : "quiz-feedback-incorrect"}">
                        <strong>
                            ${isCorrect ? "🎉 Chính xác!" : "💡 Chưa chính xác!"}
                        </strong>
                        <p>${question.explanation || ""}</p>
                    </div>

                    <button type="button" id="quizNextButton">
                        ${currentQuestionIndex < currentQuestions.length - 1
                            ? "Câu tiếp theo →"
                            : "Hoàn thành"}
                    </button>
                `;

                document.getElementById("quizNextButton")
                    .addEventListener("click", function () {

                        currentQuestionIndex++;

                        if (currentQuestionIndex < currentQuestions.length) {
                            renderQuizQuestion();
                        } else {
                            showQuizFinish();
                        }

                    });

            });

        });

    }
	
	
function handleMatchingQuestion(question) {

    let selectedLeft = null;
    let selectedRight = null;
    let matchedCount = 0;

    const leftItems = document.querySelectorAll(
        "#matchingLeft .matching-item"
    );

    const rightItems = document.querySelectorAll(
        "#matchingRight .matching-item"
    );
	
// VẼ ĐƯỜNG CONG NỐI HAI Ô
function drawMatchingLine(leftIndex, rightIndex) {

    const container = document.getElementById("matchingContainer");
    const svg = document.getElementById("matchingLines");

    const leftItem = document.querySelector(
        `#matchingLeft [data-index="${leftIndex}"]`
    );

    const rightItem = document.querySelector(
        `#matchingRight [data-index="${rightIndex}"]`
    );

    if (!container || !svg || !leftItem || !rightItem) return;

    const containerRect = container.getBoundingClientRect();
    const leftRect = leftItem.getBoundingClientRect();
    const rightRect = rightItem.getBoundingClientRect();

    const x1 = leftRect.right - containerRect.left;
    const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;

    const x2 = rightRect.left - containerRect.left;
    const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

    const distance = Math.max(30, (x2 - x1) * 0.5);

    const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );

    path.setAttribute(
        "d",
        `M ${x1} ${y1} C ${x1 + distance} ${y1},
         ${x2 - distance} ${y2}, ${x2} ${y2}`
    );

    path.setAttribute("class", "matching-curve");

    svg.appendChild(path);
}	
	
	

    function checkMatching() {

        if (selectedLeft === null || selectedRight === null) {
            return;
        }

        const isCorrect = selectedLeft === selectedRight;

        if (isCorrect) {

            leftItems.forEach(item => {
                if (Number(item.dataset.index) === selectedLeft) {
                    item.classList.add("matched");
                    item.disabled = true;
                }
            });

            rightItems.forEach(item => {
                if (Number(item.dataset.index) === selectedRight) {
                    item.classList.add("matched");
                    item.disabled = true;
                }
            });
			
			drawMatchingLine(selectedLeft, selectedRight);

            matchedCount++;

        } else {

            alert("Chưa đúng rồi! Em hãy thử lại nhé.");

        }

        leftItems.forEach(item => item.classList.remove("selected"));
        rightItems.forEach(item => item.classList.remove("selected"));

        selectedLeft = null;
        selectedRight = null;

        if (matchedCount === question.pairs.length) {
            quizScore++;

            document.getElementById("quizFeedback").innerHTML = `
                <div class="quiz-feedback-correct">
                    <strong>🎉 Tuyệt vời! Em đã nối đúng tất cả các cặp!</strong>
                    <p>${question.explanation || ""}</p>
                </div>

                <button type="button" id="quizNextButton">
                    ${currentQuestionIndex < currentQuestions.length - 1
                        ? "Câu tiếp theo →"
                        : "Hoàn thành"}
                </button>
            `;

            document.getElementById("quizNextButton")
                .addEventListener("click", function () {
                    currentQuestionIndex++;

                    if (currentQuestionIndex < currentQuestions.length) {
                        renderQuizQuestion();
                    } else {
                        showQuizFinish();
                    }
                });
        }
    }

    leftItems.forEach(item => {
        item.addEventListener("click", function () {

            if (item.disabled) return;

            leftItems.forEach(button =>
                button.classList.remove("selected")
            );

            item.classList.add("selected");
            selectedLeft = Number(item.dataset.index);

            checkMatching();
        });
    });

    rightItems.forEach(item => {
        item.addEventListener("click", function () {

            if (item.disabled) return;

            rightItems.forEach(button =>
                button.classList.remove("selected")
            );

            item.classList.add("selected");
            selectedRight = Number(item.dataset.index);

            checkMatching();
        });
    });
}	


function handleDragDropQuestion(question) {

    const items = document.querySelectorAll(".dragdrop-item");
    const dropzones = document.querySelectorAll(".dragdrop-dropzone");

    let completedCount = 0;

    // Xử lý khi thả đáp án vào ô
    function checkDrop(item, dropzone) {

        if (!item || !dropzone) return;
        if (item.classList.contains("dragdrop-used")) return;
        if (dropzone.classList.contains("dragdrop-filled")) return;

        const selectedAnswer = item.textContent.trim();
        const correctAnswer = dropzone.dataset.answer;

        if (selectedAnswer === correctAnswer) {

            dropzone.textContent = selectedAnswer;
            dropzone.classList.add("dragdrop-filled", "dragdrop-correct");

            item.classList.add("dragdrop-used");

            completedCount++;

            if (completedCount === dropzones.length) {
                finishDragDrop();
            }

        } else {

            dropzone.classList.add("dragdrop-wrong");

            setTimeout(() => {
                dropzone.classList.remove("dragdrop-wrong");
            }, 500);

        }
    }

    // Kéo thả bằng chuột
    items.forEach(item => {

        item.addEventListener("dragstart", function (event) {

            if (item.classList.contains("dragdrop-used")) {
                event.preventDefault();
                return;
            }

            event.dataTransfer.setData(
                "text/plain",
                item.dataset.item
            );

        });

    });

    dropzones.forEach(dropzone => {

        dropzone.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        dropzone.addEventListener("drop", function (event) {

            event.preventDefault();

            const itemIndex = event.dataTransfer.getData("text/plain");

            const item = document.querySelector(
                `.dragdrop-item[data-item="${itemIndex}"]`
            );

            checkDrop(item, dropzone);

        });

    });

    // Chạm chọn thẻ rồi chạm vào ô nhận trên điện thoại
    let selectedItem = null;

    items.forEach(item => {

        item.addEventListener("click", function () {

            if (item.classList.contains("dragdrop-used")) return;

            items.forEach(button =>
                button.classList.remove("dragdrop-selected")
            );

            item.classList.add("dragdrop-selected");
            selectedItem = item;

        });

    });

    dropzones.forEach(dropzone => {

        dropzone.addEventListener("click", function () {

            if (!selectedItem) return;

            checkDrop(selectedItem, dropzone);

            if (selectedItem.classList.contains("dragdrop-used")) {
                selectedItem.classList.remove("dragdrop-selected");
                selectedItem = null;
            }

        });

    });

    // Hoàn thành câu hỏi
    function finishDragDrop() {

        quizScore++;

        document.getElementById("quizFeedback").innerHTML = `
            <div class="quiz-feedback-correct">
                <strong>🎉 Tuyệt vời! Em đã hoàn thành tất cả!</strong>
                <p>${question.explanation || ""}</p>
            </div>

            <button type="button" id="quizNextButton">
                ${currentQuestionIndex < currentQuestions.length - 1
                    ? "Câu tiếp theo →"
                    : "Hoàn thành"}
            </button>
        `;

        document.getElementById("quizNextButton")
            .addEventListener("click", function () {

                currentQuestionIndex++;

                if (currentQuestionIndex < currentQuestions.length) {
                    renderQuizQuestion();
                } else {
                    showQuizFinish();
                }

            });

    }

}



    
// Kết thúc lượt thử tài
function showQuizFinish() {

    // Số XP được nhận trong lượt chơi
    const earnedXP = quizScore * 10;
	
    // LƯU LỊCH SỬ THỬ TÀI KIẾN THỨC
    const historyKey = "tinHoc3_practiceResults";

    let practiceResults = {};

    try {
        practiceResults = JSON.parse(
            localStorage.getItem(historyKey) || "{}"
        );

        if (
            !practiceResults ||
            typeof practiceResults !== "object" ||
            Array.isArray(practiceResults)
        ) {
            practiceResults = {};
        }

    } catch (error) {
        practiceResults = {};
    }

    // Tạo khóa riêng cho trò chơi
    const quizHistoryId = "quiz_" + currentLessonId;

    if (!Array.isArray(practiceResults[quizHistoryId])) {
        practiceResults[quizHistoryId] = [];
    }

    // Lưu kết quả lượt chơi
    practiceResults[quizHistoryId].push({
        type: "quiz",
        title: "Thử tài kiến thức - " +
            (window.lessonsData.find(
                item => item.id === currentLessonId
            )?.title || "Bài học " + currentLessonId),
        correct: quizScore,
        total: currentQuestions.length,
        date: new Date().toISOString()
    });

    localStorage.setItem(
        historyKey,
        JSON.stringify(practiceResults)
    );	

    // Các khóa lưu trữ XP
    const xpKey = "tinHoc3_xp";
    const rewardKey = "tinHoc3_quizRewards";

    // Đọc danh sách bài đã nhận thưởng
    let rewards = [];

    try {
        rewards = JSON.parse(
            localStorage.getItem(rewardKey) || "[]"
        );

        if (!Array.isArray(rewards)) {
            rewards = [];
        }

    } catch (error) {
        rewards = [];
    }

    let actualXP = 0;
    let rewardMessage = "";

    // Kiểm tra bài học đã nhận XP chưa
    if (!rewards.includes(currentLessonId)) {

        // Cộng XP
        const currentXP = Number(
            localStorage.getItem(xpKey) || 0
        );

        localStorage.setItem(
            xpKey,
            String(currentXP + earnedXP)
        );

        // Đánh dấu bài đã nhận thưởng
        rewards.push(currentLessonId);

        localStorage.setItem(
            rewardKey,
            JSON.stringify(rewards)
        );

        actualXP = earnedXP;

        rewardMessage = `
            <p class="quiz-xp-earned">
                🌟 Em nhận được <strong>+${actualXP} XP</strong>!
            </p>
        `;

    } else {

        rewardMessage = `
            <p class="quiz-xp-earned">
                🎁 Em đã nhận XP của bài học này trước đó!
            </p>
        `;

    }

    quizGameContent.innerHTML = `
        <div class="quiz-finish-box">

            <h2>🎉 Em đã hoàn thành!</h2>

            <p>
                Số câu trả lời đúng:
                <strong>${quizScore}/${currentQuestions.length}</strong>
            </p>

            ${rewardMessage}

            <p>
                Hãy tiếp tục cố gắng trong những thử thách tiếp theo nhé!
            </p>

            <button type="button" id="quizReturnButton">
                📚 Quay lại danh sách bài học
            </button>

        </div>
    `;

    document.getElementById("quizReturnButton")
        .addEventListener("click", returnToLessonList);

}



    // Quay lại danh sách bài học
    function returnToLessonList() {

        quizGameSection.hidden = true;
        quizResultSection.hidden = true;

        quizLessonList.closest(".quiz-lesson-section").hidden = false;

        quizGameContent.innerHTML = "";

    }


    quizBackButton.addEventListener("click", returnToLessonList);

});
