
const demoSlides = [
  {
    icon: "icon_handball.png",
    title: "Håndboldtræning i aften",
    text: "Energifællesskabet sørger for lys og varme til håndbold i hallen hele aftenen!",
    level: "low"
  },
  {
    icon: "icon_football.png",
    title: "Fodbold for alle",
    text: "Den grønne strøm gør det muligt at spille fodbold med god samvittighed!",
    level: "medium"
  },
  {
    icon: "icon_petanque.png",
    title: "Petanque og hygge",
    text: "Petanquebanen holdes kørende på lokal solenergi – tak for dit bidrag!",
    level: "high"
  },
  {
    icon: "icon_badminton.png",
    title: "Badminton på grøn strøm",
    text: "Med solens hjælp kan badmintonspillerne nyde træning i grøn energi!",
    level: "medium"
  }
];

let filteredSlides = [];
let slideIndex = 0;
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
    prepareFilteredSlides();
    renderSlide();
  }
}

function prepareFilteredSlides() {
  const currentLevel = localStorage.getItem("demoStatusLevel") || "low";
  filteredSlides = demoSlides.filter(slide => slide.level === currentLevel);
  slideIndex = 0;
}

document.addEventListener("DOMContentLoaded", () => {
  updateDemoButton();
  if (communityDemo) {
    prepareFilteredSlides();
    renderSlide();
  }
});
