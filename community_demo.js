
const demoSlides = [
  {
    icon: "icon_handball.png",
    title: "Håndboldtræning i aften",
    text: "Energifællesskabet sørger for lys og varme til håndbold i hallen hele aftenen!"
  },
  {
    icon: "icon_football.png",
    title: "Fodbold for alle",
    text: "Den grønne strøm gør det muligt at spille fodbold med god samvittighed!"
  },
  {
    icon: "icon_petanque.png",
    title: "Petanque og hygge",
    text: "Petanquebanen holdes kørende på lokal solenergi – tak for dit bidrag!"
  },
  {
    icon: "icon_badminton.png",
    title: "Badminton på grøn strøm",
    text: "Med solens hjælp kan badmintonspillerne nyde træning i grøn energi!"
  }
];

let slideIndex = 0;
let communityDemo = localStorage.getItem("communityDemo") === "true";

function updateDemoButton() {
  document.getElementById("demo-toggle").textContent = "Demo-tilstand: " + (communityDemo ? "TIL" : "FRA");
}

function renderSlide() {
  const s = demoSlides[slideIndex];
  document.getElementById("slide-icon").src = s.icon;
  document.getElementById("slide-title").textContent = s.title;
  document.getElementById("slide-text").textContent = s.text;
}

function prevSlide() {
  if (!communityDemo) return;
  slideIndex = (slideIndex - 1 + demoSlides.length) % demoSlides.length;
  renderSlide();
}

function nextSlide() {
  if (!communityDemo) return;
  slideIndex = (slideIndex + 1) % demoSlides.length;
  renderSlide();
}

function toggleCommunityDemo() {
  communityDemo = !communityDemo;
  localStorage.setItem("communityDemo", communityDemo);
  updateDemoButton();
  if (communityDemo) {
    renderSlide();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateDemoButton();
  if (communityDemo) {
    renderSlide();
  }
});
