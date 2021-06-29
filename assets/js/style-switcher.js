const style_toggler = document.querySelector(".style_toggler");
const allColors = document.querySelectorAll(".colors span");
const alternateStyles = document.querySelectorAll(".alternate_style");
const day_night = document.querySelector(".day_night");

function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color == style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}
style_toggler.addEventListener("click", () => {
  document.querySelector(".style_switcher").classList.toggle("open");
});

// hide the style switcher on scroll

window.addEventListener("scroll", () => {
  if (document.querySelector(".style_switcher").classList.contains("open")) {
    document.querySelector(".style_switcher").classList.remove("open");
  }
});

window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    day_night.querySelector("i").classList.add("bx-sun");
  } else {
    day_night.querySelector("i").classList.add("bx-moon");
  }
});

day_night.addEventListener("click", () => {
  day_night.querySelector("i").classList.toggle("bx-sun");
  day_night.querySelector("i").classList.toggle("bx-moon");
  document.body.classList.toggle("dark");
});
