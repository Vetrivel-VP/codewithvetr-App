let admindropeMenu_btn = document.getElementById("admindropeMenu_btn");
let adminDropMenuContainer = document.getElementById("adminDropMenuContainer");

admindropeMenu_btn.addEventListener("click", () => {
  admindropeMenu_btn.style.transform = "rotate(540deg)";
  adminDropMenuContainer.style.display = "block";
});

adminDropMenuContainer.addEventListener("click", (e) => {
  admindropeMenu_btn.style.transform = "rotate(0deg)";
  adminDropMenuContainer.style.display = "none";
});
