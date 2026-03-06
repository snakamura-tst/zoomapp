const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const app = express();
const initialPort = Number(process.env.PORT) || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/today-agenda", async (_req, res) => {
  try {
    const schedulePath = path.join(__dirname, "data", "schedules.json");
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

    res.json({
      date: todayLocal,
      items
    });
  } catch (error) {
    res.status(500).json({
      message: "スケジュールの読み込みに失敗しました。",
      detail: error.message
    });
  }
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Zoom agenda app is running on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.warn(`Port ${port} is in use. Retrying on ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
}

startServer(initialPort);
