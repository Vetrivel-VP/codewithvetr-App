var rightNav = document.querySelector(".rightNav");

const menuShowHide = () => {
  if (rightNav.querySelector(".menuContaier").classList.contains("active")) {
    rightNav.querySelector(".menuContaier").classList.remove("active");
    document.getElementById("down").style.transform = "rotate(0deg)";
  } else {
    rightNav.querySelector(".menuContaier").classList.add("active");
    document.getElementById("down").style.transform = "rotate(540deg)";
  }
};
// dropIcon.addEventListener("click", menuShowHide);

const rightMenuclickOutside = (e) => {
  if (e.target == rightNav) {
    profileMenuContainer.classList.remove("active");
    dropMenuIconDown.classList.toggle("active");
    dropMenuIconUp.classList.toggle("active");
  }
};

window.addEventListener("scroll", () => {
  if (rightNav.querySelector(".menuContaier").classList.contains("active")) {
    rightNav.querySelector(".menuContaier").classList.remove("active");
    document.getElementById("up").classList.toggle("active");
    document.getElementById("down").classList.toggle("active");
  }
});
window.addEventListener("click", rightMenuclickOutside);
