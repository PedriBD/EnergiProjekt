
const demoData = [
  {
    level: "low",
    status: "Grøn strøm er rigeligt i dag!",
    message: "Hallens aktiviteter kører 100% på solenergi."
  },
  {
    level: "medium",
    status: "Solproduktionen er OK",
    message: "Der er energi til de fleste aktiviteter."
  },
  {
    level: "high",
    status: "Lav produktion i dag",
    message: "Strømmen er knap – men vi holder stadig gang i caféen!"
  }
];

let demoIndex = 0;
let demoMode = localStorage.getItem("demoMode") === "true";

function updateDemoButton() {
  const btn = document.getElementById("demo-toggle");
  if (btn) btn.textContent = "Demo: " + (demoMode ? "TIL" : "FRA");
}

function renderStatus(data) {
  const card = document.querySelector(".card");
  card.classList.remove("low", "medium", "high");

  const level = data.level || "medium";
  card.classList.add(level);

  document.getElementById("status-label").textContent = data.status;
  document.getElementById("status-message").textContent = data.message;
}

function loadRealStatus() {
  fetch("status.json")
    .then(res => res.json())
    .then(data => {
      renderStatus(data);
    })
    .catch(() => {
      renderStatus({
        level: "medium",
        status: "Ingen forbindelse",
        message: "Kunne ikke hente live data."
      });
    });
}

function toggleDemo() {
  demoMode = !demoMode;
  localStorage.setItem("demoMode", demoMode);
  updateDemoButton();
  if (demoMode) {
    localStorage.setItem("demoStatusLevel", demoData[demoIndex].level);
    renderStatus(demoData[demoIndex]);
  } else {
    loadRealStatus();
  }
}

function nextDemo() {
  if (!demoMode) return;
  demoIndex = (demoIndex + 1) % demoData.length;
  const current = demoData[demoIndex];
  localStorage.setItem("demoStatusLevel", current.level);
  renderStatus(current);
}

window.onload = () => {
  updateDemoButton();
  if (demoMode) {
    localStorage.setItem("demoStatusLevel", demoData[demoIndex].level);
    renderStatus(demoData[demoIndex]);
  } else {
    loadRealStatus();
  }
};
