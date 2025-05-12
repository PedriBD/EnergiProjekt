
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
    }
  ]
};

let slideIndex = 0;
let filteredSlides = [];
let communityDemo = localStorage.getItem("demoMode") === "true";

function updateDemoButton() {
  document.getElementById("demo-toggle").textContent = "Demo: " + (communityDemo ? "TIL" : "FRA");
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
  if (!communityDemo) return;
  slideIndex = (slideIndex - 1 + filteredSlides.length) % filteredSlides.length;
  renderSlide();
}

function nextSlide() {
  if (!communityDemo) return;
  slideIndex = (slideIndex + 1) % filteredSlides.length;
  renderSlide();
}

function toggleCommunityDemo() {
  communityDemo = !communityDemo;
  localStorage.setItem("demoMode", communityDemo);
  updateDemoButton();
  if (communityDemo) {
    prepareSlidesFromLevel();
    renderSlide();
  }
}

function prepareSlidesFromLevel() {
  const level = localStorage.getItem("demoStatusLevel") || "low";
  filteredSlides = allSlides[level] || [];
  slideIndex = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  updateDemoButton();
  if (communityDemo) {
    prepareSlidesFromLevel();
    renderSlide();
  }
});
