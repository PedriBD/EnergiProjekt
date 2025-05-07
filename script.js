
fetch("status.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").textContent = data.status;
    document.getElementById("message").textContent = data.message;
    document.getElementById("weather").textContent = "UV: " + data.uv + ", " + data.condition;
  })
  .catch(error => {
    document.getElementById("status").textContent = "Fejl!";
    document.getElementById("message").textContent = "Kunne ikke hente data.";
  });
