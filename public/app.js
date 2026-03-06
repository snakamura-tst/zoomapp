const statusEl = document.getElementById("status");
const todayEl = document.getElementById("today");
const agendaList = document.getElementById("agendaList");

async function initZoom() {
  if (!window.zoomSdk) {
    return;
  }

  try {
    await window.zoomSdk.config({
      version: "0.16",
      capabilities: []
    });
  } catch (error) {
    console.warn("Zoom SDK config failed", error);
  }
}

function renderAgenda(items) {
  agendaList.innerHTML = "";

  for (const item of items) {
    const li = document.createElement("li");
    li.className = "agenda-item";

    li.innerHTML = `
      <div class="time">${item.time}</div>
      <div>
        <p class="topic">${item.title}</p>
        <p class="owner">担当: ${item.owner}</p>
      </div>
    `;

    agendaList.appendChild(li);
  }
}

async function loadAgenda() {
  statusEl.textContent = "本日の予定を取得中...";

  try {
    const response = await fetch("/api/today-agenda");
    const payload = await response.json();

    todayEl.textContent = `日付: ${payload.date}`;

    if (!payload.items?.length) {
      statusEl.textContent = "本日のスケジュールは登録されていません。";
      return;
    }

    statusEl.textContent = "";
    renderAgenda(payload.items);
  } catch (error) {
    statusEl.textContent = "スケジュールの取得に失敗しました。";
    console.error(error);
  }
}

(async () => {
  await initZoom();
  await loadAgenda();
})();
