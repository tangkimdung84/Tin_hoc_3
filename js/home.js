
// ==================================
// 1. LẤY THÔNG TIN HỌC SINH
// ==================================

const studentName =
    localStorage.getItem("tinHoc3_studentName");


// Nếu chưa có tên, quay lại trang đăng nhập
if (!studentName) {
    window.location.href = "index.html";
}


// Hiển thị tên học sinh
document.getElementById("headerStudentName").textContent =
    studentName || "Bạn nhỏ";

document.getElementById("welcomeStudentName").textContent =
    studentName || "Bạn nhỏ";


// ==================================
// 2. LẤY DỮ LIỆU HỌC TẬP
// ==================================

// Các dữ liệu này sẽ được sử dụng chung
// cho những chức năng tiếp theo.

const xp = Number(
    localStorage.getItem("tinHoc3_xp") || 0
);

const completedLessons = Number(
    localStorage.getItem("tinHoc3_completedLessons") || 0
);

let badges = [];

try {
    badges = JSON.parse(
        localStorage.getItem("tinHoc3_badges") || "[]"
    );

    if (!Array.isArray(badges)) {
        badges = [];
    }

} catch (error) {
    badges = [];
}


// ==================================
// 3. TÍNH CẤP ĐỘ
// Mỗi 100 XP lên một cấp
// ==================================

const level = Math.floor(xp / 100) + 1;

const currentXP = xp % 100;


// ==================================
// 4. HIỂN THỊ THÔNG TIN
// ==================================

document.getElementById("studentXP").textContent =
    xp + " XP";

document.getElementById("studentLevel").textContent =
    "Cấp " + level;

document.getElementById("completedLessons").textContent =
    completedLessons + " bài";

document.getElementById("studentBadges").textContent =
    badges.length;


//Thêm

// ==================================
// HIỂN THỊ BỘ SƯU TẬP HUY CHƯƠNG
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

const badgesGrid = document.getElementById("badgesGrid");

if (badgesGrid) {
    badgesGrid.innerHTML = "";

    badgeList.forEach(function (badge) {
        const earned = badges.includes(badge.id);

        const item = document.createElement("div");
        item.className = earned
            ? "badge-item earned"
            : "badge-item locked";

        item.innerHTML = `
            <div class="badge-item-icon">${badge.icon}</div>
            <h3>${badge.name}</h3>
            <p>${badge.description}</p>
            <span>${earned ? "Đã đạt được" : "Chưa đạt"}</span>
        `;

        badgesGrid.appendChild(item);
    });
}



// ==================================
// 5. HIỂN THỊ TIẾN TRÌNH
// ==================================

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");

const progressMessage =
    document.getElementById("progressMessage");

progressFill.style.width = currentXP + "%";

progressText.textContent =
    currentXP + "/100 XP";

progressMessage.textContent =
    "Em đang ở cấp " + level +
    ". Hãy tiếp tục cố gắng nhé!";


// ==================================
// 6. ĐỔI NGƯỜI HỌC
// ==================================

document.getElementById("changeStudent")
    .addEventListener("click", function() {

        window.location.href = "index.html";

    });



// ==================================
// 7. THÔNG BÁO CHỨC NĂNG
// ==================================

const toast = document.getElementById("homeToast");

document.querySelectorAll('[data-feature]:not(.typing-card)')
    .forEach(function(card) {

        card.addEventListener("click", function(event) {

            // Riêng chức năng Thử tài kiến thức
            // cho phép chuyển sang trang quiz.html
            if (
    this.classList.contains("quiz-card") ||
    this.classList.contains("mouse-card")
) {
    return;
}

            // Các chức năng khác vẫn hiện thông báo
            event.preventDefault();

            const feature = this.dataset.feature;

            toast.textContent =
                "🌟 Khu vực " + feature +
                " sẽ được hoàn thiện ở bước tiếp theo nhé!";

            toast.classList.add("show");

            setTimeout(function() {
                toast.classList.remove("show");
            }, 2500);

        });

    });

