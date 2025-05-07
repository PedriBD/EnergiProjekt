
async function hentData() {
  try {
    const res = await fetch("status.json");
    const data = await res.json();

    const status = data.status || "HIGH";
    const message = data.message || "Ingen besked tilgængelig.";

    const statusEl = document.getElementById("status");
    const messageEl = document.getElementById("message");
    const communityEl = document.getElementById("community");

    statusEl.className = status.toLowerCase();
    statusEl.textContent = {
      LOW: "🔋 Grøn strøm – brug løs!",
      MEDIUM: "⚠️ Brug med omtanke",
      HIGH: "⛔ Vent med forbrug"
    }[status];

    messageEl.textContent = message;
    communityEl.style.display = "none"; // Skjul community som standard
    statusEl.style.display = "block";   // Vis status
  } catch (e) {
    console.error("Fejl ved hentning af status.json", e);
  }
}

function toggleCommunity() {
  const statusEl = document.getElementById("status");
  const communityEl = document.getElementById("community");

  if (communityEl.style.display === "none") {
    communityEl.style.display = "block";
    statusEl.style.display = "none";
  } else {
    communityEl.style.display = "none";
    statusEl.style.display = "block";
  }
}

hentData();
setInterval(hentData, 5 * 60 * 1000);
