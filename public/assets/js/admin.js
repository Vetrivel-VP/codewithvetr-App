let admindropeMenu_btn = document.getElementById("admindropeMenu_btn");
let adminDropMenuContainer = document.getElementById("adminDropMenuContainer");

var API_BASE_URL =
  // "http://localhost:5001/codewithvetriapi-c56e3/us-central1/app";
  "https://us-central1-codewithvetriapi-c56e3.cloudfunctions.net/app";

admindropeMenu_btn.addEventListener("click", () => {
  if (adminDropMenuContainer.style.display == "block") {
    admindropeMenu_btn.style.transform = "rotate(0deg)";
    adminDropMenuContainer.style.display = "none";
  } else {
    admindropeMenu_btn.style.transform = "rotate(540deg)";
    adminDropMenuContainer.style.display = "block";
  }
});

adminDropMenuContainer.addEventListener("click", (e) => {
  admindropeMenu_btn.style.transform = "rotate(0deg)";
  adminDropMenuContainer.style.display = "none";
});

function menutrainer() {
  document.getElementById("Menutrainer").classList.toggle("active");

  document.getElementById("Menutrainer").addEventListener("click", () => {
    if (document.getElementById("Menutrainer").classList.contains("active")) {
      document.getElementById("Menutrainer").classList.toggle("active");
    }
  });
}

function menuUsers() {
  document.getElementById("MenuUsers").classList.toggle("active");
  document.getElementById("MenuUsers").addEventListener("click", () => {
    if (document.getElementById("MenuUsers").classList.contains("active")) {
      document.getElementById("MenuUsers").classList.toggle("active");
    }
  });
}

function menuCourses() {
  document.getElementById("MenuCourses").classList.toggle("active");
  document.getElementById("MenuCourses").addEventListener("click", () => {
    if (document.getElementById("MenuCourses").classList.contains("active")) {
      document.getElementById("MenuCourses").classList.toggle("active");
    }
  });
}

function firstCardMenuCourses() {
  document.getElementById("firstCardMenuCourses").classList.toggle("active");
  document
    .getElementById("firstCardMenuCourses")
    .addEventListener("click", () => {
      document.getElementById("firstCardMenuCourses").remove("active");
    });
}

function firstCardMenuConcepts() {
  document.getElementById("firstCardMenuConcepts").classList.toggle("active");
  document
    .getElementById("firstCardMenutrainers")
    .addEventListener("click", () => {
      document.getElementById("firstCardMenutrainers").remove("active");
    });
}

function firstCardMenutrainers() {
  document.getElementById("firstCardMenutrainers").classList.toggle("active");
  document
    .getElementById("firstCardMenutrainers")
    .addEventListener("click", () => {
      document.getElementById("firstCardMenutrainers").remove("active");
    });
}

const checkAdminUser = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      let adminUsersList = ["Q6zLci0DGvQsCof8O1u2SNL61zS2"];
      if (adminUsersList.includes(user.uid)) {
        showAdminUser(user);
      } else {
        location.replace("./index.html");
      }
      //   console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
      console.log("not signed in");
    }
  });
};

function signOutUser() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.replace("./index.html");
      //   profileContainer.style.display = "none";
      //   document.querySelector(".menuContaier").style.display = "none";
      //   loginContainer.style.display = "block";
    })
    .catch((e) => {
      console.log(e);
    });
}

let showAdminUser = (user) => {
  const imgURL = "./assets/img/profile.svg";
  document.getElementById("admin-UserMenuImg").innerHTML = `<img src="${
    user.photoURL ? user.photoURL : imgURL
  }" alt="">`;
};

window.addEventListener("load", () => {
  checkAdminUser();
});
