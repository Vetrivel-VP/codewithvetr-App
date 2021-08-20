const loginGoogle = document.getElementById("loginGoogle");
const profileContainer = document.querySelector(".profileContainer");
const signOutBtn = document.querySelector(".signout");
let alertNotification = document.querySelector(".alertNotification");
const alertCloseBtn = document.querySelector(".alertCloseBtn");
// let favoriteContainer = document.querySelector(".favoriteContainer");

// Create Or Login User
let UserActionButton = document.getElementById("UserActionButton");
let signUpUser = document.getElementById("signUpUser");

let userEmailDiv = document.getElementById("userEmailDiv");
let creatUserFormEmailId = userEmailDiv.querySelector("input");

let passwordField = document.getElementById("passwordField");
let inputPass = passwordField.querySelector("input");

// Create the provider for google authentications
let googleProvider = new firebase.auth.GoogleAuthProvider();

loginGoogle.addEventListener("click", GoogleAuth);
signOutBtn.addEventListener("click", signOutUser);

function GoogleAuth() {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      loginModal.style.display = "none";
      loginContainer.style.display = "none";
      profileContainer.style.display = "flex";
      const msg = `Welcome : ${res.user.displayName}`;
      alertCustomizations(msg, "#008C28", "#008C28");
      showUserDetails(res.user);
    })
    .catch((e) => {
      console.log(e);
    });
}

function showUserDetails(user) {
  const imgURL = "./assets/img/profile.svg";
  profileContainer.innerHTML = `
    <div class="userImage">
    <img src="${user.photoURL ? user.photoURL : imgURL}" alt="" srcset="">
    </div>
    <div class="userName">${
      user.displayName ? user.displayName : user.email
    }</div>
    <div class="dropIcon" id="rightMenu_dropIcon"  onclick="menuShowHide()">
        <i class='bx bx-chevron-down' id="down"></i>
    </div>
    `;

  if (user.uid === "Q6zLci0DGvQsCof8O1u2SNL61zS2") {
    document.querySelector(".menuContaier ul").innerHTML = `
      <a href="./admin.html"><li>Dashboard</li></a>
    `;
  } else {
    document.querySelector(".menuContaier ul").innerHTML = `
      <a href=""><li>Favourite</li></a>
    `;
  }
}

function signOutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      profileContainer.style.display = "none";
      document.querySelector(".menuContaier").style.display = "none";
      loginContainer.style.display = "block";

      alertCustomizations("Thank you", "#008C28", "#008C28");

      creatUserFormEmailId.value = "";
      inputPass.value = "";
      passwordField.style.setProperty("--widthSize", "0%");
      userEmailDiv.style.setProperty("--widthSize", "0%");
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
      // favoriteContainer.style.display = "block";
      showUserDetails(user);
    } else {
      profileContainer.style.display = "none";
      loginContainer.style.display = "block";
      // favoriteContainer.style.display = "none";
    }
  });
}
checkAuthState();

const closeAlert = () => {
  alertNotification.classList.remove("show");
  alertNotification.classList.add("hide");
};

function alertCustomizations(msg, alertText, alertBorder) {
  document.getElementById("alertNotification").style.display = "flex";
  alertNotification.classList.remove("hide");
  alertNotification.classList.add("show");
  alertNotification.innerHTML = `
  <i class='bx bxs-info-circle leftIcon'></i>
  <span class="msg">${msg}</span>
  <span class="alertCloseBtn"  onclick="closeAlert()">
      <i class='bx bx-x rightIcon'></i>
  </span>
  `;

  // alertNotification.style.setProperty("--alertBg", alertBg);
  alertNotification.style.setProperty("--alertText", alertText);
  // alertNotification.style.setProperty("--alertClose", alertClose);
  alertNotification.style.setProperty("--alertBorder", alertBorder);
  // alertNotification.style.setProperty("--alertHover", alertHover);

  setTimeout(() => {
    alertNotification.classList.remove("show");
    alertNotification.classList.add("hide");
  }, 2000);
}

signUpUser.addEventListener("click", () => {
  if (signUpUser.innerText === "Sign Up") {
    signUpUser.innerText = "Sign In";
    UserActionButton.value = "Sign Up";
  } else {
    signUpUser.innerText = "Sign Up";
    UserActionButton.value = "Sign In";
  }
});

document.querySelector(".formcontainer form").addEventListener("submit", () => {
  UserActionButton.value == "Sign In" ? signInUser() : signUpNewUser();
});

let signUpNewUser = () => {
  const userMail = creatUserFormEmailId.value;
  const userPassword = inputPass.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(userMail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      loginModal.style.display = "none";
      loginContainer.style.display = "none";
      profileContainer.style.display = "flex";
      const msg = `
      Created : Check your email!`;
      sendVerficationLink(user);
      alertCustomizations(msg, "#008C28", "#008C28");
      showUserDetails(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
};

function sendVerficationLink(user) {
  console.log("sign up verfy");
  user
    .sendEmailVerification()
    .then(() => {})
    .catch((e) => {
      console.log(e);
    });
}

let signInUser = () => {
  const userMail = creatUserFormEmailId.value;
  const userPassword = inputPass.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userMail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      loginModal.style.display = "none";
      loginContainer.style.display = "none";
      profileContainer.style.display = "flex";
      const msg = `
      Welcome : ${user.displayName ? user.displayName : user.email}`;
      alertCustomizations(msg, "#008C28", "#008C28");

      showUserDetails(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/user-not-found") {
        alertCustomizations(
          "Invalid Email: User Not Found",
          "#B85B09",
          "#B55704"
        );
      } else {
        alertCustomizations("Warning: Password Mismatch", "#B85B09", "#B55704");
      }
    });
};

// window.onload = () => {
//   checkAuthState();
// };
