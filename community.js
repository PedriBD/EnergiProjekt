
const slides = [
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
let index = 0;

function fadeIn(element) {
  element.classList.remove("fade-out");
  element.classList.add("fade-in");
}

function fadeOut(element, callback) {
  element.classList.remove("fade-in");
  element.classList.add("fade-out");
  element.addEventListener("animationend", callback, { once: true });
}

function renderSlide() {
  const icon = document.getElementById("slide-icon");
  const title = document.getElementById("slide-title");
  const text = document.getElementById("slide-text");

  fadeOut(icon, () => {
    icon.src = slides[index].icon;
    fadeIn(icon);
  });
  fadeOut(title, () => {
    title.textContent = slides[index].title;
    fadeIn(title);
  });
  fadeOut(text, () => {
    text.textContent = slides[index].text;
    fadeIn(text);
  });
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  renderSlide();
}

function nextSlide() {
  index = (index + 1) % slides.length;
  renderSlide();
}

document.addEventListener("DOMContentLoaded", renderSlide);
