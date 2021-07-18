var rightNav = document.querySelector(".rightNav");

const menuShowHide = () => {
  var dropIcon = document.getElementById("rightMenu_dropIcon");
  var profileMenuContainer = rightNav.querySelector(".menuContaier");
  var dropMenuIconUp = document.getElementById("up");
  var dropMenuIconDown = document.getElementById("down");

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
