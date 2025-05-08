
fetch("status.json")
  .then(response => response.json())
  .then(data => {
    const statusEl = document.getElementById("status-text");
    statusEl.textContent = data.status;
    statusEl.classList.add(data.level.toLowerCase()); // farve
    document.getElementById("message").textContent = data.message;
  })
  .catch(err => {
    console.error("Fejl ved indlæsning af status.json:", err);
  });
