
fetch("status.json")
  .then(response => response.json())
  .then(data => {
    const level = data.level.toLowerCase();
    document.getElementById("level").textContent = data.level;
    document.getElementById("level").classList.add(level); // fx .low
    document.getElementById("status-text").textContent = data.status;
    document.getElementById("message").textContent = data.message;
  })
  .catch(err => {
    console.error("Fejl ved indlæsning af status.json:", err);
  });
