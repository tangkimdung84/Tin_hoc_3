
/* =====================================
   DỮ LIỆU THỬ TÀI KIẾN THỨC TIN HỌC 3
   Mỗi bài có số lượng câu hỏi tùy ý
===================================== */

window.quizData = {

    // BÀI 1
    1: {
        questions: [

            // Câu hỏi trắc nghiệm
            {
                type: "multiple",
                question: "Thông tin giúp con người làm gì?",
                options: [
                    "Đưa ra quyết định",
                    "Ngủ ngon hơn",
                    "Chạy nhanh hơn",
                    "Ăn nhiều hơn"
                ],
                answer: 0,
                explanation: "Thông tin giúp con người hiểu biết và đưa ra quyết định."
            },

            // Câu hỏi điền từ
            {
                type: "fillblank",
                question: "Em xem dự báo thời tiết để biết hôm nay trời có thể ____.",
                options: [
                    "mưa",
                    "ngủ",
                    "học bài",
                    "đọc sách"
                ],
                answer: 0,
                explanation: "Dự báo thời tiết cung cấp thông tin về tình hình thời tiết."
            },

            // Câu hỏi đúng hoặc sai
            {
                type: "truefalse",
                statement: "Thông tin có thể giúp chúng ta lựa chọn việc cần làm.",
                answer: true,
                explanation: "Đúng. Thông tin giúp chúng ta lựa chọn và đưa ra quyết định."
            },
			// cau hoi ghep noi
			{
    type: "matching",
    question: "Hãy nối thông tin ở cột A với quyết định phù hợp ở cột B.",
    pairs: [
        {
            left: "Trời đang mưa",
            right: "Mang áo mưa"
        },
        {
            left: "Trời nắng nóng",
            right: "Đội mũ khi ra ngoài"
        },
        {
            left: "Đồng hồ báo giờ học",
            right: "Chuẩn bị sách vở"
        }
    ],
    explanation: "Thông tin giúp chúng ta lựa chọn việc cần làm phù hợp."
},
//keo tha
{
    type: "dragdrop",
    question: "Hãy kéo tên dạng thông tin vào ô phù hợp.",
    items: [
        "Hình ảnh",
        "Âm thanh",
        "Văn bản"
    ],
    targets: [
        {
            label: "Bức tranh",
            answer: "Hình ảnh"
        },
        {
            label: "Tiếng chim hót",
            answer: "Âm thanh"
        },
        {
            label: "Một đoạn chữ trong sách",
            answer: "Văn bản"
        }
    ],
    explanation: "Thông tin có thể được thể hiện dưới dạng văn bản, hình ảnh và âm thanh."
}

        ]
    },

    // BÀI 2
    2: {
        questions: [
            // Sẽ bổ sung câu hỏi sau
        ]
    }

};
