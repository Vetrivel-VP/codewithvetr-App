// Password show & hide
const loginModal = document.getElementById("loginModal");
const loginContainer = document.querySelector(".loginContainer");
const loginCloseBtn = document.getElementById("logincloseBtn");

window.addEventListener("load", () => {
  loginContainer.addEventListener("click", openloginModal);
  loginCloseBtn.addEventListener("click", closeLoginModal);
  window.addEventListener("click", outsideClickLoginModal);
});

const openloginModal = () => {
  loginModal.style.display = "flex";
};

const closeLoginModal = () => {
  loginModal.style.display = "none";
};

const outsideClickLoginModal = (e) => {
  if (e.target == loginModal) {
    loginModal.style.display = "none";
  }
};

// const openCodeModal = () => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       codeModal.style.display = "flex";

//       // alert message
//     } else {
//       // alert message
//       alertCustomizations(
//         "Warning: Login to download!",
//         "#FFA14D",
//         "#B85B09",
//         "#F77B0E",
//         "#B55704",
//         "#FF7800"
//       );
//       loginModal.style.display = "flex";
//     }
//   });
// };

// modalTabs.forEach((tab, index) => {
//   tab.addEventListener("click", () => {
//     modalTabs.forEach((tab) => tab.classList.remove("active"));
//     tab.classList.add("active");

//     // to show the content

//     tabContents.forEach((tc) => tc.classList.remove("active"));
//     tabContents[index].classList.add("active");
//   });
// });

// modalTabs[0].click();

// clipboard click event
// clipboardIcon.addEventListener("click", () => {
//   clipboardText.innerHTML = "Copied";
//   copyText(document.querySelectorAll(".codecontent.active .codeText"));
// });

// function copyText(htmlElement) {
//   if (!htmlElement) {
//     return;
//   }

//   let elementText = htmlElement[0].innerText;
//   let inputElement = document.createElement("input");
//   inputElement.setAttribute("value", elementText);
//   document.body.appendChild(inputElement);
//   inputElement.select();
//   document.execCommand("copy");
//   inputElement.parentNode.removeChild(inputElement);
// }
