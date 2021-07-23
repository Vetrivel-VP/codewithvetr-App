var rightNav = document.querySelector(".rightNav");

const menuShowHide = () => {
  let dropIcon = document.getElementById("rightMenu_dropIcon");
  let profileMenuContainer = rightNav.querySelector(".menuContaier");
  let dropMenuIconUp = document.getElementById("up");
  let dropMenuIconDown = document.getElementById("down");

  profileMenuContainer.classList.toggle("active");
  dropMenuIconDown.classList.toggle("active");
  dropMenuIconUp.classList.toggle("active");
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
  if (profileMenuContainer.classList.contains("active")) {
    profileMenuContainer.classList.remove("active");
    dropMenuIconDown.classList.toggle("active");
    dropMenuIconUp.classList.toggle("active");
  }
});
window.addEventListener("click", rightMenuclickOutside);
