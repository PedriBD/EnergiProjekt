@ -0,0 +1,71 @@

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
  document.getElementById("demo-toggle").textContent = "Demo-tilstand: " + (demoMode ? "TIL" : "FRA");
}

function renderStatus(data) {
  document.getElementById("status-label").textContent = data.status;
  document.getElementById("status-message").textContent = data.message;
  const card = document.querySelector(".card");
  card.classList.remove("low", "medium", "high");
  card.classList.add(data.level);
}

function loadRealStatus() {
  fetch("status.json")
      .then(res => res.json())
      .then(data => renderStatus(data))
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
    renderStatus(demoData[demoIndex]);
  } else {
    loadRealStatus();
  }
}

function nextDemo() {
  if (!demoMode) return;
  demoIndex = (demoIndex + 1) % demoData.length;
  renderStatus(demoData[demoIndex]);
}

window.onload = () => {
  updateDemoButton();
  if (demoMode) {
    renderStatus(demoData[demoIndex]);
  } else {
    loadRealStatus();
  }
};