
// ==================================
// HỆ THỐNG HUY CHƯƠNG TIN HỌC 3
// ==================================

window.checkPracticeBadges = function () {
    const resultsKey = "tinHoc3_practiceResults";
    const badgesKey = "tinHoc3_badges";

    let results = {};
    let badges = [];

    try {
        results = JSON.parse(
            localStorage.getItem(resultsKey) || "{}"
        );

        badges = JSON.parse(
            localStorage.getItem(badgesKey) || "[]"
        );

        if (!Array.isArray(badges)) {
            badges = [];
        }
    } catch (error) {
        results = {};
        badges = [];
    }

    // Các bài đã hoàn thành luyện tập
    const completedIds = Object.keys(results)
        .filter(id => Array.isArray(results[id]) &&
                      results[id].length > 0);

    // Các bài từng đạt 100%
    const perfectIds = completedIds.filter(id =>
        results[id].some(item =>
            item.total > 0 &&
            item.correct === item.total
        )
    );

    // Danh sách huy chương
    const badgeRules = [
        {
            id: "starter",
            name: "Khởi đầu",
            icon: "🌱",
            condition: completedIds.length >= 1
        },
        {
            id: "hardworking",
            name: "Chăm chỉ",
            icon: "🥉",
            condition: completedIds.length >= 4
        },
        {
            id: "persistent",
            name: "Kiên trì",
            icon: "🥈",
            condition: completedIds.length >= 8
        },
        {
            id: "conqueror",
            name: "Chinh phục",
            icon: "🥇",
            condition: completedIds.length >= 12
        },
        {
            id: "genius",
            name: "Siêu trí tuệ",
            icon: "💎",
            condition: completedIds.length >= 16
        },
        {
            id: "excellent",
            name: "Học giỏi",
            icon: "⭐",
            condition: perfectIds.length >= 5
        },
        {
            id: "master",
            name: "Cao thủ Tin học",
            icon: "🏆",
            condition: perfectIds.length >= 16
        }
    ];

    // Trao huy chương nếu đủ điều kiện
    badgeRules.forEach(function (badge) {
        if (badge.condition && !badges.includes(badge.id)) {
            badges.push(badge.id);
        }
    });

    localStorage.setItem(
        badgesKey,
        JSON.stringify(badges)
    );

    return badges;
};
