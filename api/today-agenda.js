const fs = require("fs/promises");
const path = require("path");

module.exports = async function handler(_req, res) {
  try {
    const schedulePath = path.join(process.cwd(), "data", "schedules.json");
    const raw = await fs.readFile(schedulePath, "utf8");
    const schedules = JSON.parse(raw);

    const today = new Date();
    const todayLocal = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(today);

    const items = schedules[todayLocal] || [];

    res.status(200).json({
      date: todayLocal,
      items
    });
  } catch (error) {
    res.status(500).json({
      message: "スケジュールの読み込みに失敗しました。",
      detail: error.message
    });
  }
};
