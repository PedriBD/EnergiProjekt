

const demoData = [
  {
    level: "low",
    status: "DER ER GRØN OVERSKUDSSTRØM TIL JER",
    message: "Udnyt den lokalt producerede grønne strøm og deltag i fællesskabet"
  },
  {
    level: "medium",
    status: "GRØN STRØM ER LIGE PÅ TRAPPERNE",
    message: "Der forventes snart lokalt produceret grøn strøm - vær klar til at bidrage"
  },
  {
    level: "high",
    status: "INGEN GRØN OVERSKUDSSTRØM I ENERGIFÆLLESSKABET",
    message: "Solcelleproduktionen er lav - overvej om I kan tilpasse jeres energiforbrug"
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
  document.getElementById("status-toggle").style.display = demoMode ? "block" : "none";
  updateDemoButton();
  if (demoMode) {
    localStorage.setItem("demoStatusLevel", demoData[demoIndex].level);
    renderStatus(demoData[demoIndex]);
  } else {
    loadRealStatus();
  }
};