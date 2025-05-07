async function hentData() {
  const weatherKey = "a5a2b36a6bf440e3a2b70805250404";
  const city = "Aarhus";
  let solarPower = 0;
  let uv = 0;
  let is_day = 0;
  let condition = "ukendt";

  try {
    const solarRes = await fetch("https://api.energidataservice.dk/dataset/Forecasts_Hour?limit=10&sort=HourUTC%20DESC&filter=" + encodeURIComponent(JSON.stringify({PriceArea: ["DK1"]})));
    const solarData = await solarRes.json();
    const record = solarData.records.find(r => r.SolarPower !== null);
    if (record) {
      solarPower = record.SolarPower;
    }
  } catch (e) {
    console.log("Fejl i soldata", e);
  }

  try {
    const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${city}&aqi=no`);
    const weather = await weatherRes.json();
    uv = weather.current.uv;
    is_day = weather.current.is_day;
    condition = weather.current.condition.text;
  } catch (e) {
    console.log("Fejl i vejrdata", e);
  }

  const wf = vurderVejrFaktor(uv, is_day, condition);
  const sf = Math.min(solarPower / 1200, 1.0);
  const combined = Math.round((sf * 0.7 + wf * 0.3) * 100) / 100;

  let status = "HIGH";
  if (combined >= 0.7) status = "LOW";
  else if (combined >= 0.4) status = "MEDIUM";

  const statusEl = document.getElementById("status");
  const msgEl = document.getElementById("message");
  statusEl.className = status.toLowerCase();
  statusEl.textContent = {
    LOW: "🔋 Grøn strøm – brug løs!",
    MEDIUM: "⚠️ Brug med omtanke",
    HIGH: "⛔ Vent med forbrug"
  }[status];

  const month = new Date().toLocaleString('da-DK', { month: 'long' });
  const hours = Math.round(solarPower / 5 * 10);
  const co2 = Math.round(solarPower * 0.148 * 1000);
  const drives = Math.round(co2 / (0.12 * 310) * 10) / 10;

  msgEl.textContent = `COMMUNITY: ${month}: Sol ${solarPower.toFixed(1)} MW, UV ${uv}, ${condition}. ${hours} timers drift. ${co2}g CO2 = ${drives} KBH-ture.`;
}

function vurderVejrFaktor(uv, is_day, condition) {
  if (is_day === 0) return 0.0;
  let base = 0.1;
  if (uv >= 7) base = 1.0;
  else if (uv >= 5) base = 0.8;
  else if (uv >= 3) base = 0.6;
  else if (uv >= 1) base = 0.4;
  else if (uv >= 0) base = 0.2;
  condition = condition.toLowerCase();
  if (condition.includes("overcast")) base *= 0.4;
  else if (condition.includes("cloud")) base *= 0.7;
  else if (condition.includes("rain") || condition.includes("snow")) base *= 0.3;
  return Math.round(base * 100) / 100;
}

function toggleCommunity() {
  const el = document.getElementById("community");
  const statusEl = document.getElementById("status");

  if (el.style.display === "none") {
    const statusText = statusEl.textContent.toLowerCase();
    let msg = "";

    if (statusText.includes("grøn strøm")) {
      msg = "🌞 Energifællesskabet sørger i dag for at håndbold kan træne hele aftenen med grøn lokalproduceret strøm. Tak for at være med!";
    } else if (statusText.includes("med omtanke")) {
      msg = "⚠️ Solen hjælper lidt – energifællesskabet dækker dele af forbruget. Det betyder noget, at du tænker over dit elforbrug.";
    } else {
      msg = "⛅ I dag er der mindre sol – men dit fællesskab arbejder stadig for grøn strøm. Tak for at være en del af det!";
    }

    el.textContent = msg;
    el.style.display = "block";
    statusEl.style.display = "none";
  } else {
    el.style.display = "none";
    statusEl.style.display = "block";
  }
}

hentData();
setInterval(hentData, 5 * 60 * 1000);
