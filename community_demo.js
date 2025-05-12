
const allSlides = {
  low: [
    {
      icon: "icon_handball.png",
      title: "Fuld energi til hallen",
      text: "Alt kører på sol – nu er det tid til at bruge energien med god samvittighed!",
      level: "low"
    },
    {
      icon: "icon_badminton.png",
      title: "Badminton og varme bade",
      text: "Energien er grøn og rigelig – fællesskabet giver plads til lidt ekstra komfort.",
      level: "low"
    },
    {
      icon: "icon_handball.png",
      title: "Fuld gang i hallen!",
      text: "Hallen kører 100% på sol – tak fordi I er med i fællesskabet.",
      level: "low"
    },
    {
      icon: "icon_petanque.png",
      title: "Petanque og fællesskab",
      text: "Nu er der grøn strøm til både spil og fællesspisning!",
      level: "low"
    }
  ],
  medium: [
    {
      icon: "icon_badminton.png",
      title: "Badminton med omtanke",
      text: "Fællesskabet leverer strøm nok til aktiviteter – men vi tænker stadig grønt.",
      level: "medium"
    },
    {
      icon: "icon_football.png",
      title: "Fodbold og fællesskab",
      text: "Fodboldtræningen kan køre videre – takket være grøn lokal energi.",
      level: "medium"
    },
    {
      icon: "icon_handball.png",
      title: "Træning som normalt",
      text: "Der er strøm nok – men vi holder stadig fokus på grøn drift i hallen.",
      level: "medium"
    },
    {
      icon: "icon_petanque.png",
      title: "Petanque med varme i klubhuset",
      text: "Tak for at bruge energien ansvarligt – der er nok til hygge og kaffe.",
      level: "medium"
    }
  ],
  high: [
    {
      icon: "icon_petanque.png",
      title: "Rolig petanque-aften",
      text: "Selv med lav produktion holder vi lyset tændt – tak fordi du sparer på strømmen.",
      level: "high"
    },
    {
      icon: "icon_handball.png",
      title: "Begrænset halvarme",
      text: "Hallen er i brug, men vi bruger kun det nødvendige – vi passer på ressourcerne.",
      level: "high"
    },
    {
      icon: "icon_handball.png",
      title: "Håndbold med omtanke",
      text: "Lyset er tændt, men vi begrænser opvarmningen – tak fordi I støtter fællesskabet.",
      level: "high"
    },
    {
      icon: "icon_petanque.png",
      title: "Udendørs hygge",
      text: "Petanque kan spilles uden strøm – den bedste måde at spare i dag.",
      level: "high"
    }
  ]
};

let slideIndex = 0;
let filteredSlides = [];
let communityDemo = localStorage.getItem("demoMode") === "true";

function updateDemoButton() {
  const btn = document.getElementById("demo-toggle");
  if (btn) btn.textContent = "Demo: " + (communityDemo ? "TIL" : "FRA");
}

function renderSlide() {
  if (!filteredSlides.length) return;
  const s = filteredSlides[slideIndex];
  document.getElementById("slide-icon").src = s.icon;
  document.getElementById("slide-title").textContent = s.title;
  document.getElementById("slide-text").textContent = s.text;
  const card = document.querySelector(".card");
  card.className = "card " + s.level;
}

function prevSlide() {
  if (!filteredSlides.length) return;
  slideIndex = (slideIndex - 1 + filteredSlides.length) % filteredSlides.length;
  renderSlide();
}

function nextSlide() {
  if (!filteredSlides.length) return;
  slideIndex = (slideIndex + 1) % filteredSlides.length;
  renderSlide();
}

function toggleCommunityDemo() {
  communityDemo = !communityDemo;
  localStorage.setItem("demoMode", communityDemo);
  updateDemoButton();
  if (communityDemo) {
    const demoLevel = localStorage.getItem("demoStatusLevel") || "low";
    filteredSlides = allSlides[demoLevel];
    renderSlide();
  } else {
    fetchStatusLevel();
  }
}

function fetchStatusLevel() {
  fetch("status.json")
    .then(res => res.json())
    .then(data => {
      const level = deriveLevel(data.status);
      filteredSlides = allSlides[level];
      renderSlide();
    })
    .catch(() => {
      filteredSlides = allSlides["medium"];
      renderSlide();
    });
}

function deriveLevel(statusText) {
  if (!statusText) return "medium";
  statusText = statusText.toLowerCase();
  if (statusText.includes("lav")) return "high";
  if (statusText.includes("snart") || statusText.includes("næsten")) return "medium";
  if (statusText.includes("høj") || statusText.includes("grøn strøm")) return "low";
  return "medium";
}

document.addEventListener("DOMContentLoaded", () => {
  updateDemoButton();
  if (communityDemo) {
    const demoLevel = localStorage.getItem("demoStatusLevel") || "low";
    filteredSlides = allSlides[demoLevel];
    renderSlide();
  } else {
    fetchStatusLevel();
  }
});
