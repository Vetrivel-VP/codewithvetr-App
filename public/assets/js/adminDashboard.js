var mainMiddleContainer = document.getElementById("maindMiddleContainer");
var API_Users = "/api/users";
var API_Users_ID = "/api/users/read/";
// variable for file upload
let file;

// alert Notifications
var adminAlert = document.getElementById("adminAlert");
function adminAlertNotifications(msg, alertWidth, bgAlertColor) {
  adminAlert.style.display = "block";
  adminAlert.style.setProperty("--alertWidth", alertWidth);
  adminAlert.style.setProperty("--bgAlertColor", bgAlertColor);

  adminAlert.innerHTML = `<div class="content">
  <p>${msg}</p>
  <i class='bx bx-x'></i>
</div>`;

  setTimeout(() => {
    adminAlert.style.display = "none";
  }, 4000);
}

var getAllUsers = () => {
  const API_URL = `${API_BASE_URL}${API_Users}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userTotalCount(data);
    });
};

const getUserParamId = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("uid");
};

const getUser = () => {
  const uid = getUserParamId();
  console.log(uid);
};

// Usertotal count
const userTotalCount = (userData) => {
  const userCount = userData.data.length;
  document.getElementById(
    "cardRightUser"
  ).innerHTML += `                                   
    <span>${userCount}</span>
    `;

  document.getElementById(
    "userTextContainer"
  ).innerHTML += `                                   
    <p>${userCount}</p>
    `;

  document.getElementById(
    "svgCircleGlow"
  ).style.strokeDashoffset = `calc(440 - (440 * ${userCount / 100}) / 100)`;

  document.getElementById("percentageNumber").innerHTML = `${
    (userCount / 100) * 100
  }<span>%</span>`;
};

// Get all courses
var API_COURSES = "/api/courses";

const getAllCourses = () => {
  const API_URL = `${API_BASE_URL}${API_COURSES}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      courseTotalCount(data);
    });
};

// Courses count
const courseTotalCount = (courseData) => {
  const courseCount = courseData.data.length;
  document.getElementById("firstCard_middle_courses").innerHTML += `
  <p>${courseCount}</p>
  `;

  document.getElementById("bottomSection_card_courses").innerHTML += `
  <p>${courseCount}</p>
  `;

  document.getElementById("sectioncards_cardText_courses").innerHTML += `
  <p>${courseCount}</p>
  `;

  document.getElementById("userCard_text_courses").innerHTML += `
  <span>${courseCount}</span>
  `;
};

// Get All Trainers
var API_TRAINERS = "/api/trainer";
const getAllTrainers = () => {
  const API_URL = `${API_BASE_URL}${API_TRAINERS}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      trainersTotalCount(data);
    });
};

const trainersTotalCount = (trainerData) => {
  const trainerCount = trainerData.data.length;
  document.getElementById("firstCard_text_trainers").innerHTML += `
  <p>${trainerCount}</p>
  `;

  document.getElementById("bottomSection_text_trainer").innerHTML += `
  <p>${trainerCount}</p>
  `;

  document.getElementById("sectionCards_text_trainers").innerHTML += `
  <p>${trainerCount}</p>
  `;
};

// Get All Concepts
var API_CONCEPTS = "/api/concept";
const getAllCaoncepts = () => {
  const API_URL = `${API_BASE_URL}${API_CONCEPTS}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      conceptsTotalCount(data);
    });
};

const conceptsTotalCount = (conceptData) => {
  const conceptCount = conceptData.data.length;
  document.getElementById("firstCard_text_concepts").innerHTML += `
  <p>${conceptCount}</p>
  `;
};

// overlay Effect
const setOverlayEffect = () => {
  document.getElementById("overlay").style.display = "flex";
};

const closeOverlayEffect = () => {
  setTimeout(() => {
    document.getElementById("overlay").style.animation = "fade 1s ease";
    document.getElementById("overlay").style.display = "none";
  }, 1000);
};

// displaying main dashboard
const mainDashboardView = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "./assets/pages/mainDashboard.html");
  xhttp.send();
  closeOverlayEffect();
};

// displaying course list
const coursesList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "./assets/pages/coursesList.html");
  xhttp.send();
  closeOverlayEffect();
};

// add new course to course list
const addNewToCourseList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
    addNewCourseDragOver();
  };
  xhttp.open("GET", "./assets/pages/newCourse.html");
  xhttp.send();
  closeOverlayEffect();
};

const addNewCourseDragOver = () => {
  var dragArea = document.getElementById("dragArea");
  var dragText = document.querySelector("header");
  var dragButton = document.getElementById("browseBtn");
  var dragInput = document.getElementById("fileUploadBtn");

  dragButton.onclick = () => {
    dragInput.click();
  };

  dragInput.addEventListener("change", function () {
    file = this.files[0];
    showFile(file);
  });

  // user drags file over the drag area
  dragArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //prevents from default behaviour
    dragArea.classList.add("active");
    dragText.textContent = "Release to upload";
  });

  // user leave  the dragarea
  dragArea.addEventListener("dragleave", () => {
    dragArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to upload";
  });

  // user drop the file in   the dragarea
  dragArea.addEventListener("drop", (event) => {
    event.preventDefault(); //prevents from default behaviour
    //getting the user dropped file
    file = event.dataTransfer.files[0];
    showFile(file);
  });
};

function showFile(file) {
  let fileType = file.type;
  let validExtensions = ["image/jpeg", "image/png", "image/jpg"];
  if (validExtensions.includes(fileType)) {
    let fileReader = new FileReader(); //create file reader object
    fileReader.onload = () => {
      let fileUrl = fileReader.result; //pass the user source file to file reader
      let imageTag = `<img src="${fileUrl}" alt="" />`;
      dragArea.innerHTML = imageTag;
      document.getElementById("saveAction").style.display = "flex";
    };

    fileReader.readAsDataURL(file); //read the file in base 64 format
  } else {
    console.log("Not a valid file");
  }
}

function fileReload() {
  var input = document.createElement("input");
  input.type = "file";
  input.click();
  input.addEventListener("change", function () {
    file = this.files[0];
    showFile(file);
  });
}

function saveFile() {
  var uploadTask = firebase.storage().ref(`Images/${file.name}`).put(file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      const msg = "Upload is " + progress + "% done";
      adminAlertNotifications(msg, progress + "%", "green");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);

        document.getElementById("saveAction").style.display = "none";
      });
    }
  );
}

// displaying trainers list
const trainersList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "./assets/pages/getallTrainers.html");
  xhttp.send();
  closeOverlayEffect();
};

// displaying users list
const usersList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "./assets/pages/getAllUsers.html");
  xhttp.send();
  closeOverlayEffect();
};

// displaying concepts list
const conceptsList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "./assets/pages/getAllConcepts.html");
  xhttp.send();
  closeOverlayEffect();
};

window.addEventListener("load", () => {
  setOverlayEffect();
  mainDashboardView();
  getAllUsers();
  getAllCourses();
  getAllTrainers();
  getAllCaoncepts();
  closeOverlayEffect();
});
