
// =====================================
// 1. KIỂM TRA TÊN HỌC SINH
// =====================================

const studentName =
    localStorage.getItem("tinHoc3_studentName");

if (!studentName) {
    window.location.href = "index.html";
}

document.getElementById("lessonStudentName").textContent =
    studentName || "Bạn nhỏ";


// =====================================
// 2. LẤY DỮ LIỆU BÀI HỌC
// =====================================

const lessons = window.lessonsData || [];

const lessonGrid = document.getElementById("lessonGrid");
const lessonSearch = document.getElementById("lessonSearch");
const noLesson = document.getElementById("noLesson");
const totalLessons = document.getElementById("totalLessons");

totalLessons.textContent = lessons.length;


// =====================================
// 3. HIỂN THỊ DANH SÁCH BÀI HỌC
// =====================================

function displayLessons(list) {

    lessonGrid.innerHTML = "";

    list.forEach(function(lesson) {

        const card = document.createElement("article");
        card.className = "lesson-item";

        const number = document.createElement("span");
        number.className = "lesson-number";
        number.textContent = "BÀI " + lesson.id;

        const image = document.createElement("img");
        image.className = "lesson-image";
        image.src = lesson.image;
        image.alt = lesson.title;
        image.loading = "lazy";

        // Nếu ảnh không tải được, thay bằng biểu tượng máy tính
        image.addEventListener("error", function() {
            this.onerror = null;
            this.src = "assets/images/hero.png";
        });

        const title = document.createElement("h3");
        title.textContent = lesson.title;

        const footer = document.createElement("div");
        footer.className = "lesson-item-footer";

        const button = document.createElement("button");
        button.className = "lesson-button";
        button.textContent = "🚀 Xem bài học";

        button.addEventListener("click", function() {
		window.location.href = "lesson-detail.html?id=" + lesson.id;
		});

        footer.appendChild(button);

        card.appendChild(number);
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(footer);

        lessonGrid.appendChild(card);

    });

    if (list.length === 0) {
        noLesson.style.display = "block";
    } else {
        noLesson.style.display = "none";
    }

}


// =====================================
// 4. TÌM KIẾM BÀI HỌC
// =====================================

lessonSearch.addEventListener("input", function() {

    const keyword = this.value
        .trim()
        .toLowerCase();

    const filteredLessons = lessons.filter(function(lesson) {

        return lesson.title
            .toLowerCase()
            .includes(keyword);

    });

    displayLessons(filteredLessons);

});


// =====================================
// 5. THÔNG BÁO CHỌN BÀI
// =====================================

function showLessonMessage(lesson) {

    const toast = document.getElementById("lessonToast");

    toast.textContent =
        "📚 Em đã chọn " + lesson.title +
        ". Nội dung bài học sẽ được kết nối ở bước tiếp theo!";

    toast.classList.add("show");

    setTimeout(function() {
        toast.classList.remove("show");
    }, 2500);

}


// =====================================
// 6. HIỂN THỊ LẦN ĐẦU
// =====================================

displayLessons(lessons);
