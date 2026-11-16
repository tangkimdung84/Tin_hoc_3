document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const lessonId = Number(params.get("id"));

  const lessonTitles = {
    1: "Bài 1. Thông tin và quyết định",
    2: "Bài 2. Xử lí thông tin",
    3: "Bài 3. Máy tính và em",
    4: "Bài 4. Làm việc với máy tính",
    5: "Bài 5. Sử dụng bàn phím",
    6: "Bài 6. Khám phá thông tin trên Internet",
    7: "Bài 7. Sắp xếp để dễ tìm",
    8: "Bài 8. Sơ đồ hình cây - Tổ chức thông tin",
    9: "Bài 9. Thực hành với tệp và thư mục",
    10: "Bài 10. Bảo vệ thông tin khi dùng máy tính",
    11: "Bài 11. Bài trình chiếu của em",
    12: "Bài 12. Tìm hiểu về thế giới tự nhiên",
    13: "Bài 13. Luyện tập sử dụng chuột",
    14: "Bài 14. Em thực hiện công việc như thế nào",
    15: "Bài 15. Công việc được thực hiện theo điều kiện",
    16: "Bài 16. Công việc của em và sự hỗ trợ của máy tính"
  };

  const studentName =
    localStorage.getItem("tinHoc3_studentName") || "Bạn nhỏ";

  document.getElementById("studentName").textContent = studentName;

  const titleElement = document.getElementById("lessonTitle");
  const objectivesSection = document.getElementById("objectivesSection");
  const theorySection = document.getElementById("theorySection");
  const unavailableSection = document.getElementById("unavailableSection");
  
  //them
  const memorySection = document.getElementById("memorySection");
const lessonMemory = document.getElementById("lessonMemory");
//het
  
  

  const lesson = window.lessonContentData
    ? window.lessonContentData[lessonId]
    : null;
	
	

  if (!lessonTitles[lessonId]) {
    titleElement.textContent = "Không tìm thấy bài học";
    objectivesSection.hidden = true;
    theorySection.hidden = true;
    unavailableSection.hidden = false;
	memorySection.hidden = true;
    return;
  }

  titleElement.textContent = lessonTitles[lessonId];

  if (!lesson) {
    objectivesSection.hidden = true;
    theorySection.hidden = true;
    unavailableSection.hidden = false;
	memorySection.hidden = true;

    // Bài 3 có dữ liệu cũ bị trùng với Bài 2,
    // nên chưa sử dụng dữ liệu đó.
    if (lessonId === 3) {
      unavailableSection.querySelector("p").textContent =
        "Dữ liệu cũ của bài này đang bị trùng với Bài 2. " +
        "Nội dung sẽ được bổ sung sau khi kiểm tra lại tài liệu bài học.";
    }

    return;
  }

  objectivesSection.hidden = false;
  theorySection.hidden = false;
  unavailableSection.hidden = true;

  const objectivesList = document.getElementById("lessonObjectives");
  objectivesList.innerHTML = "";

  lesson.objectives.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    objectivesList.appendChild(li);
  });

  document.getElementById("lessonTheory").innerHTML = lesson.theory;
  // Hiển thị phần Em cần ghi nhớ
lessonMemory.innerHTML = "";

if (lesson.memory && lesson.memory.length > 0) {
    lesson.memory.forEach(function (item) {
        const memoryItem = document.createElement("div");
        memoryItem.className = "memory-item";
        memoryItem.textContent = item;
        lessonMemory.appendChild(memoryItem);
    });

    memorySection.hidden = false;
} else {
    memorySection.hidden = true;
}
  
  
  
  

  
});