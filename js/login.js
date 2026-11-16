
// Lấy các phần tử trên trang
const loginForm = document.getElementById("loginForm");
const studentName = document.getElementById("studentName");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");


// Kiểm tra học sinh đã nhập tên trước đó chưa
const savedName = localStorage.getItem("tinHoc3_studentName");

if (savedName) {
    studentName.value = savedName;
}


// Xử lý khi học sinh nhấn nút BẮT ĐẦU HỌC
loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = studentName.value.trim();

    // Kiểm tra tên
    if (name.length < 2) {
        errorMessage.textContent =
            "Em hãy nhập tên có ít nhất 2 ký tự nhé!";
        successMessage.textContent = "";
        studentName.focus();
        return;
    }

    // Lưu tên học sinh trên thiết bị
    localStorage.setItem("tinHoc3_studentName", name);

    // Thông báo thành công
    errorMessage.textContent = "";

    successMessage.textContent =
    "🎉 Chào mừng " + name +
    "! Đang mở thế giới Tin học 3...";
	setTimeout(function() {
    window.location.href = "home.html";
	}, 700);

});
