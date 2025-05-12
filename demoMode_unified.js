
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

function toggleDemo() {
  demoMode = !demoMode;
  localStorage.setItem("demoMode", demoMode);
  updateDemoButton();
  if (typeof renderSlide === "function") renderSlide();
  if (typeof renderStatus === "function") renderStatus(demoData[demoIndex]);
}

function nextDemo() {
  if (!demoMode) return;
  demoIndex = (demoIndex + 1) % demoData.length;
  if (typeof renderStatus === "function") renderStatus(demoData[demoIndex]);
}
