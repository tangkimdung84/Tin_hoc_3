// ==================================
// 1. LẤY THÔNG TIN HỌC SINH
// ==================================

const studentName =
    localStorage.getItem("tinHoc3_studentName");

if (!studentName) {
    window.location.href = "index.html";
}

const headerStudentName =
    document.getElementById("headerStudentName");

if (headerStudentName) {
    headerStudentName.textContent = studentName || "Bạn nhỏ";
}


// ==================================
// 2. LẤY DỮ LIỆU HỌC TẬP
// ==================================

const xp = Number(
    localStorage.getItem("tinHoc3_xp") || 0
);

const level = Math.floor(xp / 100) + 1;

let badges = [];
let practiceResults = {};

try {
    badges = JSON.parse(
        localStorage.getItem("tinHoc3_badges") || "[]"
    );

    practiceResults = JSON.parse(
        localStorage.getItem("tinHoc3_practiceResults") || "{}"
    );

    if (!Array.isArray(badges)) {
        badges = [];
    }

    if (
        !practiceResults ||
        typeof practiceResults !== "object" ||
        Array.isArray(practiceResults)
    ) {
        practiceResults = {};
    }

} catch (error) {
    badges = [];
    practiceResults = {};
}


// ==================================
// 3. DANH SÁCH 16 BÀI HỌC
// ==================================

const lessonNames = {
    1: "Thông tin và quyết định",
    2: "Xử lí thông tin",
    3: "Máy tính và em",
    4: "Làm việc với máy tính",
    5: "Sử dụng bàn phím",
    6: "Khám phá thông tin trên Internet",
    7: "Sắp xếp để dễ tìm",
    8: "Sơ đồ hình cây - Tổ chức thông tin",
    9: "Thực hành với tệp và thư mục",
    10: "Bảo vệ thông tin khi dùng máy tính",
    11: "Bài trình chiếu của em",
    12: "Tìm hiểu về thế giới tự nhiên",
    13: "Luyện tập sử dụng chuột",
    14: "Em thực hiện công việc như thế nào",
    15: "Công việc được thực hiện theo điều kiện",
    16: "Công việc của em và sự hỗ trợ của máy tính"
};


// ==================================
// 4. TÍNH SỐ BÀI ĐÃ LUYỆN TẬP
// ==================================

const completedPracticeIds = Object.keys(practiceResults)
    .filter(function(id) {
        return !id.startsWith("quiz_") &&
               Array.isArray(practiceResults[id]) &&
               practiceResults[id].length > 0;
    });
// ==================================
// 4.1. TÍNH THỐNG KÊ LUYỆN TẬP
// ==================================

let totalAttempts = 0;
let totalQuestions = 0;
let totalCorrect = 0;

Object.keys(practiceResults).forEach(function(id) {

    const attempts = practiceResults[id];

    if (Array.isArray(attempts)) {

        attempts.forEach(function(attempt) {

            totalAttempts++;

            totalQuestions += Number(attempt.total) || 0;

            totalCorrect += Number(attempt.correct) || 0;

        });
    }
});

// Tính tỉ lệ trả lời đúng
const accuracyRate = totalQuestions > 0
    ? Math.round((totalCorrect / totalQuestions) * 100)
    : 0;


// ==================================
// 4.2. HIỂN THỊ THỐNG KÊ LUYỆN TẬP
// ==================================

document.getElementById("totalAttempts").textContent =
    totalAttempts;

document.getElementById("totalQuestions").textContent =
    totalQuestions;

document.getElementById("totalCorrect").textContent =
    totalCorrect;

document.getElementById("accuracyRate").textContent =
    accuracyRate + "%";

// ==================================
// 4.3. CẬP NHẬT BIỂU ĐỒ KẾT QUẢ
// ==================================

// Tính tổng số câu chưa đúng
const totalWrong = totalQuestions - totalCorrect;

// Hiển thị số liệu
document.getElementById("chartCorrect").textContent =
    totalCorrect;

document.getElementById("chartWrong").textContent =
    totalWrong;

// Tính độ dài hai thanh biểu đồ
const correctPercent = totalQuestions > 0
    ? (totalCorrect / totalQuestions) * 100
    : 0;

const wrongPercent = totalQuestions > 0
    ? (totalWrong / totalQuestions) * 100
    : 0;

// Cập nhật thanh biểu đồ
document.getElementById("correctBar").style.width =
    correctPercent + "%";

document.getElementById("wrongBar").style.width =
    wrongPercent + "%";

// Thông báo kết quả
const chartMessage =
    document.getElementById("chartMessage");

if (totalQuestions === 0) {

    chartMessage.textContent =
        "🌟 Hãy bắt đầu luyện tập để xem kết quả của em nhé!";

} else if (accuracyRate >= 80) {

    chartMessage.textContent =
        "🏆 Tuyệt vời! Em đang học rất tốt. Hãy tiếp tục phát huy nhé!";

} else if (accuracyRate >= 50) {

    chartMessage.textContent =
        "👏 Em đã có tiến bộ! Hãy cố gắng thêm một chút nữa nhé!";

} else {

    chartMessage.textContent =
        "💪 Đừng nản lòng! Em hãy ôn lại kiến thức và thử sức lần nữa nhé!";
}

// ==================================
// 5. HIỂN THỊ CÁC Ô THỐNG KÊ
// ==================================

document.getElementById("totalXP").textContent =
    xp + " XP";

document.getElementById("totalPracticed").textContent =
    completedPracticeIds.length + " bài";

document.getElementById("totalBadges").textContent =
    badges.length;

document.getElementById("currentLevel").textContent =
    "Cấp " + level;


// ==================================
// 6. DANH SÁCH HUY CHƯƠNG
// ==================================

const badgeList = [
    {
        id: "starter",
        name: "Khởi đầu",
        icon: "🌱",
        description: "Hoàn thành bài luyện tập đầu tiên"
    },
    {
        id: "hardworking",
        name: "Chăm chỉ",
        icon: "🥉",
        description: "Hoàn thành 4 bài luyện tập"
    },
    {
        id: "persistent",
        name: "Kiên trì",
        icon: "🥈",
        description: "Hoàn thành 8 bài luyện tập"
    },
    {
        id: "conqueror",
        name: "Chinh phục",
        icon: "🥇",
        description: "Hoàn thành 12 bài luyện tập"
    },
    {
        id: "genius",
        name: "Siêu trí tuệ",
        icon: "💎",
        description: "Hoàn thành cả 16 bài luyện tập"
    },
    {
        id: "excellent",
        name: "Học giỏi",
        icon: "⭐",
        description: "Đạt 100% ở 5 bài khác nhau"
    },
    {
        id: "master",
        name: "Cao thủ Tin học",
        icon: "🏆",
        description: "Đạt 100% ở cả 16 bài"
    }
];

const achievementBadges =
    document.getElementById("achievementBadges");

if (achievementBadges) {
    achievementBadges.innerHTML = "";

    badgeList.forEach(function(badge) {
        const earned = badges.includes(badge.id);

        const item = document.createElement("div");

        item.className = earned
            ? "achievement-badge earned"
            : "achievement-badge locked";

        item.innerHTML = `
            <div class="achievement-badge-icon">
                ${badge.icon}
            </div>

            <h3>${badge.name}</h3>

            <p>${badge.description}</p>

            <span>
                ${earned ? "Đã đạt được" : "Chưa đạt"}
            </span>
        `;

        achievementBadges.appendChild(item);
    });
}


// ==================================
// 7. HIỂN THỊ LỊCH SỬ LUYỆN TẬP
// ==================================

const practiceHistory =
    document.getElementById("practiceHistory");

if (practiceHistory) {
    practiceHistory.innerHTML = "";

    const historyItems = [];

   Object.keys(practiceResults)
    .filter(function(id) {
        return Array.isArray(practiceResults[id]) &&
               practiceResults[id].length > 0;
    })
    .forEach(function(id) {

    const attempts = practiceResults[id];

    attempts.forEach(function(attempt, index) {

        const isQuiz = id.startsWith("quiz_");

        historyItems.push({
            lessonId: id,
            lessonName: isQuiz
                ? (attempt.title || "Thử tài kiến thức")
                : (lessonNames[id] || "Bài học " + id),

            type: isQuiz ? "quiz" : "practice",

            attempt: index + 1,
            correct: Number(attempt.correct) || 0,
            total: Number(attempt.total) || 0,
            date: attempt.date || ""
        });

    });
});

    // Sắp xếp lần luyện tập mới nhất lên trước
    historyItems.sort(function(a, b) {
        return new Date(b.date || 0) -
               new Date(a.date || 0);
    });

    if (historyItems.length === 0) {
        practiceHistory.innerHTML = `
            <div class="empty-history">
                <span>📚</span>
                <p>Em chưa có lịch sử luyện tập.</p>
                <p>Hãy chọn một bài học và bắt đầu thử sức nhé!</p>
            </div>
        `;
    } else {
        historyItems.forEach(function(item) {
           const lessonName = item.lessonName ||
    lessonNames[item.lessonId] ||
    "Bài học " + item.lessonId;

const historyIcon = item.type === "quiz"
    ? "🧠"
    : "📘";

const historyLabel = item.type === "quiz"
    ? "Thử tài kiến thức"
    : "Luyện tập";

            const dateText = item.date
                ? new Date(item.date).toLocaleString("vi-VN")
                : "Chưa có thông tin thời gian";

            const historyItem =
                document.createElement("div");

            historyItem.className = "history-item";

            historyItem.innerHTML = `
    <div class="history-info">
        <h3>
    ${historyIcon} ${lessonName}
</h3>
		
		

        <p>
            ${historyLabel} - Lần ${item.attempt}
            · ${dateText}
        </p>
    </div>

    <div class="history-action">

        <div class="history-action">
		
		
		

    <div class="history-score">
        ⭐ ${item.correct}/${item.total} câu đúng
    </div>

    <button
        class="view-detail-btn"
        data-lesson-id="${item.lessonId}"
        data-attempt="${item.attempt}">
        🔍 Xem chi tiết
    </button>

    <button
        class="retry-practice-btn"
        data-lesson-id="${item.lessonId}">
        🔄 Luyện tập lại
    </button>

</div>
`;

            practiceHistory.appendChild(historyItem);
        });
    }
}


// ==================================
// 8. HIỂN THỊ TIẾN ĐỘ 16 BÀI HỌC
// ==================================

const lessonProgressList =
    document.getElementById("lessonProgressList");

const lessonProgressText =
    document.getElementById("lessonProgressText");

const lessonProgressFill =
    document.getElementById("lessonProgressFill");

const totalLessons = 16;

const practicedCount = completedPracticeIds.length;

const progressPercent =
    (practicedCount / totalLessons) * 100;


// Cập nhật số bài và thanh tiến trình
if (lessonProgressText) {
    lessonProgressText.textContent =
        practicedCount + "/" + totalLessons + " bài";
}

if (lessonProgressFill) {
    lessonProgressFill.style.width =
        progressPercent + "%";
}


// Tạo danh sách 16 bài học
if (lessonProgressList) {
    lessonProgressList.innerHTML = "";

    for (let i = 1; i <= totalLessons; i++) {

        const completed =
            completedPracticeIds.includes(String(i));

        const item = document.createElement("div");

        item.className = completed
            ? "lesson-progress-item completed"
            : "lesson-progress-item";

        item.innerHTML = `
            <div class="lesson-progress-number">
                ${i}
            </div>

            <div class="lesson-progress-info">
                <h3>${lessonNames[i]}</h3>

                <p>
                    ${completed
                        ? "Đã luyện tập"
                        : "Chưa luyện tập"}
                </p>
            </div>

            <div class="lesson-progress-status">
                ${completed ? "✅" : "🔒"}
            </div>
        `;

        lessonProgressList.appendChild(item);
    }
}

// ==================================
// 9. XỬ LÝ NÚT LUYỆN TẬP LẠI
// ==================================

document.querySelectorAll(".retry-practice-btn")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            const lessonId = this.dataset.lessonId;

            // Mở đúng trang chi tiết bài học
            window.location.href =
                "lesson-detail.html?id=" + lessonId;

        });

    });

// ==================================
// 10. XỬ LÝ NÚT XEM CHI TIẾT
// ==================================

const detailModal = document.getElementById("detailModal");
const detailContent = document.getElementById("detailContent");
const closeDetailModal = document.getElementById("closeDetailModal");

document.querySelectorAll(".view-detail-btn")
    .forEach(function(button) {

        button.addEventListener("click", function() {

            const lessonId = this.dataset.lessonId;
            const attemptNumber = Number(this.dataset.attempt);

            const attempts = practiceResults[lessonId];

            if (!Array.isArray(attempts)) return;

            const attempt = attempts[attemptNumber - 1];

            if (!attempt) return;

            const correct = Number(attempt.correct) || 0;
            const total = Number(attempt.total) || 0;
            const wrong = total - correct;

            const accuracy = total > 0
                ? Math.round(correct / total * 100)
                : 0;

            const dateText = new Date(attempt.date)
                .toLocaleString("vi-VN");

            let message = "";

            if (accuracy === 100) {
                message = "🌟 Xuất sắc! Em đã trả lời đúng tất cả câu hỏi!";
            } else if (accuracy >= 80) {
                message = "👏 Rất tốt! Em hãy tiếp tục phát huy nhé!";
            } else if (accuracy >= 50) {
                message = "💪 Khá tốt! Em cố gắng luyện tập thêm nhé!";
            } else {
                message = "🌱 Đừng nản lòng! Em hãy ôn tập và thử lại nhé!";
            }

            detailContent.innerHTML = `
    <h3>📘 ${lessonNames[lessonId] || "Bài học"}</h3>

    <p>🔢 Lần luyện tập: <strong>${attemptNumber}</strong></p>
    <p>🕒 Thời gian: <strong>${dateText}</strong></p>

    <hr>

    <p>✅ Số câu đúng: <strong>${correct}</strong></p>
    <p>❌ Số câu sai: <strong>${wrong}</strong></p>
    <p>📝 Tổng số câu: <strong>${total}</strong></p>

    <h3>⭐ Kết quả: ${accuracy}%</h3>
    <p>${message}</p>

    <hr>

    <h3>📖 XEM LẠI TỪNG CÂU HỎI</h3>

    ${
        Array.isArray(attempt.answers) && attempt.answers.length > 0
        ? attempt.answers.map(function(item, index) {

            if (!item) return "";

            const selectedText =
                item.options[item.selectedAnswer] || "Chưa có";

            const correctText =
                item.options[item.correctAnswer] || "Chưa có";

            return `
                <div class="review-question ${item.isCorrect ? "review-correct" : "review-incorrect"}">
                    <h4>Câu ${index + 1}: ${item.question}</h4>

                    <p>📝 Em đã chọn:
                        <strong>${selectedText}</strong>
                    </p>

                    <p>✅ Đáp án đúng:
                        <strong>${correctText}</strong>
                    </p>

                    <p>
                        ${item.isCorrect
                            ? "🎉 Em trả lời chính xác!"
                            : "💡 Em cần chú ý câu này nhé!"}
                    </p>

                    <p>📚 Giải thích: ${item.explanation || "Chưa có giải thích."}</p>
                </div>
            `;
        }).join("")
        : "<p>📌 Lần luyện tập này chưa có dữ liệu chi tiết từng câu. Em hãy thực hiện lượt luyện tập mới để xem lại nhé!</p>"
    }
`;


            detailModal.hidden = false;
        });
    });

// Đóng cửa sổ
closeDetailModal.addEventListener("click", function() {
    detailModal.hidden = true;
});

// Nhấn bên ngoài cửa sổ để đóng
detailModal.addEventListener("click", function(event) {
    if (event.target === detailModal) {
        detailModal.hidden = true;
    }
});