const rightMenuIcon = document.getElementById("rightMenuIcon");
const rightMenuClose = document.getElementById("rightMenuClose");

const leftMenuIcon = document.getElementById("leftMenuIcon");
const leftMenuClose = document.getElementById("leftMenuClose");

const leftSide_container = document.getElementById("leftSide_container");

// const menuHideOnClickOutside = (e) => {
//   if (
//     e.target == document.querySelector(".main") ||
//     e.target == document.querySelector(".leftSide_container") ||
//     document.querySelector(".rightSide_container")
//   ) {
//     rightSide_container.style.right = "-100%";
//   }
// };

rightMenuIcon.addEventListener("click", () => {
  rightSide_container.style.right = 0;
});

rightMenuClose.addEventListener("click", () => {
  rightSide_container.style.right = "-100%";
});

// window.addEventListener("click", menuHideOnClickOutside);

leftMenuIcon.addEventListener("click", () => {
  leftSide_container.style.left = 0;
});

leftMenuClose.addEventListener("click", () => {
  leftSide_container.style.left = "-100%";
});
