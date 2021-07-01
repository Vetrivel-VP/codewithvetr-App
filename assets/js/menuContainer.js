const rightNav = document.querySelector(".rightNav");
const dropIcon = document.getElementById("rightMenu_dropIcon");
const profileMenuContainer = rightNav.querySelector(".menuContaier");
const dropMenuIconUp = document.getElementById("up");
const dropMenuIconDown = document.getElementById("down");

const menuShowHide = () => {
  profileMenuContainer.classList.toggle("active");
  dropMenuIconDown.classList.toggle("active");
  dropMenuIconUp.classList.toggle("active");
};
dropIcon.addEventListener("click", menuShowHide);

const rightMenuclickOutside = (e) => {
  if (e.target == rightNav) {
    profileMenuContainer.classList.remove("active");
    dropMenuIconDown.classList.toggle("active");
    dropMenuIconUp.classList.toggle("active");
  }
};

window.addEventListener("scroll", () => {
  if (profileMenuContainer.classList.contains("active")) {
    profileMenuContainer.classList.remove("active");
    dropMenuIconDown.classList.toggle("active");
    dropMenuIconUp.classList.toggle("active");
  }
});
window.addEventListener("click", rightMenuclickOutside);
