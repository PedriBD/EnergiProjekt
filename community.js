
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
function renderSlide() {
  const s = slides[index];
  document.getElementById("slide-icon").src = s.icon;
  document.getElementById("slide-title").textContent = s.title;
  document.getElementById("slide-text").textContent = s.text;
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
