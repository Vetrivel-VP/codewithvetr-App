// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCucAMt5mp10JeG5a6eGYQXAaE5n_2pIwU",
  authDomain: "codewithvetri.firebaseapp.com",
  projectId: "codewithvetri",
  storageBucket: "codewithvetri.appspot.com",
  messagingSenderId: "273773670963",
  appId: "1:273773670963:web:4913653d7899f20e236946",
  measurementId: "G-3BSS2Q8D31",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const loginGoogle = document.getElementById("loginGoogle");
const profileContainer = document.querySelector(".profileContainer");
const signOutBtn = document.querySelector(".signout");
let alertNotification = document.querySelector(".alertNotification");
const alertCloseBtn = document.querySelector(".alertCloseBtn");
let favoriteContainer = document.querySelector(".favoriteContainer");

// Create the provider for google authentications
let googleProvider = new firebase.auth.GoogleAuthProvider();

loginGoogle.addEventListener("click", GoogleAuth);
signOutBtn.addEventListener("click", signOutUser);

function GoogleAuth() {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      // console.log(res);
      loginModal.style.display = "none";
      loginContainer.style.display = "none";
      profileContainer.style.display = "flex";
      const msg = `Welcome : ${res.user.displayName}`;
      alertCustomizations(
        msg,
        "#00FF49",
        "#008C28",
        "#03E644",
        "#008C28",
        "#00BA36"
      );
      showUserDetails(res.user);
    })
    .catch((e) => {
      console.log(e);
    });
}

function showUserDetails(user) {
  profileContainer.innerHTML = `
    <div class="userImage">
    <img src="${user.photoURL}" alt="" srcset="">
    </div>
    <div class="userName">${user.displayName}</div>
    <div class="dropIcon" id="rightMenu_dropIcon"  onclick="menuShowHide()">
        <i class='bx bx-chevron-down' id="down"></i>
        <i class='bx bx-chevron-up' id="up"></i>
    </div>
    `;
}

function signOutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      profileContainer.style.display = "none";
      document.querySelector(".menuContaier").style.display = "none";
      loginContainer.style.display = "block";

      alertCustomizations(
        "Thank you",
        "#00FF49",
        "#008C28",
        "#03E644",
        "#008C28",
        "#00BA36"
      );
    })
    .catch((e) => {
      console.log(e);
    });
}

function checkAuthState() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginContainer.style.display = "none";
      profileContainer.style.display = "flex";
      favoriteContainer.style.display = "block";
      showUserDetails(user);
    } else {
      profileContainer.style.display = "none";
      loginContainer.style.display = "block";
    }
  });
}
checkAuthState();

const closeAlert = () => {
  alertNotification.classList.remove("show");
  alertNotification.classList.add("hide");
};

function alertCustomizations(
  msg,
  alertBg,
  alertText,
  alertClose,
  alertBorder,
  alertHover
) {
  alertNotification.classList.remove("hide");
  alertNotification.classList.add("show");
  alertNotification.innerHTML = `
  <i class='bx bx-smile leftIcon'></i>
  <span class="msg">${msg}</span>
  <span class="alertCloseBtn"  onclick="closeAlert()">
      <i class='bx bx-x rightIcon'></i>
  </span>
  `;

  alertNotification.style.setProperty("--alertBg", alertBg);
  alertNotification.style.setProperty("--alertText", alertText);
  alertNotification.style.setProperty("--alertClose", alertClose);
  alertNotification.style.setProperty("--alertBorder", alertBorder);
  alertNotification.style.setProperty("--alertHover", alertHover);

  setTimeout(() => {
    alertNotification.classList.remove("show");
    alertNotification.classList.add("hide");
  }, 2000);
}
