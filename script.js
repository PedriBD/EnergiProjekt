
function goToCommunity() {
    window.location.href = 'community.html';
}

fetch('status.json')
  .then(response => response.json())
  .then(data => {
      document.getElementById('status').textContent = data.status;
      document.getElementById('message').textContent = data.message;
      document.getElementById('weather').textContent = data.weather;
  })
  .catch(error => {
      document.getElementById('status').textContent = 'Fejl';
      document.getElementById('message').textContent = 'Kunne ikke hente data.';
      console.error('Fetch-fejl:', error);
  });
