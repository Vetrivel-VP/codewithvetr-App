var mainMiddleContainer = document.getElementById("maindMiddleContainer");
var API_Users = "/api/users";
var API_Users_ID = "/api/users/read/";
// variable for file upload
let file;

// variable for imageUrl
var downloadImageUrl;

// alert Notifications
var adminAlert = document.getElementById("adminAlert");
function adminAlertNotifications(msg, alertWidth, bgAlertColor) {
  adminAlert.style.display = "block";
  adminAlert.style.setProperty("--alertWidth", alertWidth);
  adminAlert.style.setProperty("--bgAlertColor", bgAlertColor);

  adminAlert.innerHTML = `<div class="content">
  <i class='bx bxs-badge-check'></i>
  <p>${msg}</p>
  <i class='bx bx-x' id="alerCloseX"></i>
</div>`;
  document.getElementById("alerCloseX").onclick = () => {
    adminAlert.style.display = "none";
  };
  setTimeout(() => {
    adminAlert.style.display = "none";
  }, 4000);
}

var allUsers;
var getAllUsers = () => {
  const API_URL = `${API_BASE_URL}${API_Users}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allUsers = data.data;
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
var allCourses;
const getAllCourses = () => {
  const API_URL = `${API_BASE_URL}${API_COURSES}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allCourses = data.data;
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
var allTrainer;
const getAllTrainers = () => {
  const API_URL = `${API_BASE_URL}${API_TRAINERS}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allTrainer = data.data;
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
var allConcepts;
const getAllCaoncepts = () => {
  const API_URL = `${API_BASE_URL}${API_CONCEPTS}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      allConcepts = data.data;
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
  }, 2000);
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
    buildCourseList();
  };
  xhttp.open("GET", "./assets/pages/coursesList.html");
  xhttp.send();

  closeOverlayEffect();
};

const buildCourseList = () => {
  let courseDataList = "";

  for (data of allCourses) {
    const courseDate = new Date(
      parseInt(data.course_added_date)
    ).toDateString();
    courseDataList += `
    <div class="card">
        <div class="topcardSection">
            <div class="imgBox">
                <img src="${data.course_img}" alt="">
            </div>
            <div class="contentBox">
                <h3>${data.course_title}</h3>
            </div>
        </div>
        <div class="bottomCardSection">
            <div class="countText">
                <p>Concpets <span>${allCourses.length}</span></p>
            </div>
            <div class="addedDate">
                <p>${courseDate}</p>
            </div>
        </div>
    </div>
    `;
  }
  document.querySelector(".courseMainSection").innerHTML = courseDataList;
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
      const msg = "Upload is " + progress.toFixed(2) + "% done";
      adminAlertNotifications(msg, progress + "%", "green");
    },
    (error) => {},
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        // console.log("File available at", downloadURL);
        downloadImageUrl = downloadURL;
        document.getElementById("saveAction").style.display = "none";
      });
    }
  );
}

// saving the complete new course

var API_COURSE_SAVE = "/api/courses/create";
const saveNewCourse = () => {
  const API_URL = `${API_BASE_URL}${API_COURSE_SAVE}`;
  // courseName Form data
  const courseNameDiv = document.getElementById("courseName");
  const courseName = courseNameDiv.querySelector("input").value;
  // courseTitle Form data
  const courseTitelDiv = document.getElementById("courseTitel");
  const courseTitel = courseTitelDiv.querySelector("input").value;

  document
    .querySelector(".formSection form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      let data = JSON.stringify({
        course_name: courseName,
        course_title: courseTitel,
        course_img: downloadImageUrl,
      });

      adminAlertNotifications("Data saved successfully", "100%", "green");

      fetch(API_URL, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(() => {
        setTimeout(() => {
          location.replace("./admin.html");
        }, 200);
      });
    });
};

// displaying trainers list
const trainersList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
    buildTrainersList();
  };
  xhttp.open("GET", "./assets/pages/getallTrainers.html");
  xhttp.send();
  closeOverlayEffect();
};

const addNewToTrainerList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
    addNewCourseDragOver();

    var API_Verify_Trainer = "/api/trainer/verify/";

    const trainerId_input = document.getElementById("trainerId_input");
    trainerId_input.onkeyup = (e) => {
      let trainer_id = e.target.value;
      const API_URL = `${API_BASE_URL}${API_Verify_Trainer}${trainer_id}`;
      if (trainer_id != "") {
        fetch(API_URL, { method: "GET" })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.data.includes("Valid User")) {
              trainerId_input.style.setProperty("--border_color", "#34ac8e");
              trainerId_input.style.setProperty("--text_color", "#d0cfcf");
              document
                .getElementById("trainerId")
                .querySelector("i")
                .classList.remove("bxs-user-x");
              document
                .getElementById("trainerId")
                .querySelector("i")
                .classList.add("bxs-user-check");
              document
                .getElementById("trainerId")
                .querySelector("i").style.color = "#34ac8e";

              document.getElementById("trainerNew_submit").disabled = false;
            } else {
              trainerId_input.style.setProperty("--border_color", "red");
              trainerId_input.style.setProperty("--text_color", "red");
              document
                .getElementById("trainerId")
                .querySelector("i")
                .classList.remove("bxs-user-check");
              document
                .getElementById("trainerId")
                .querySelector("i")
                .classList.add("bxs-user-x");
              document
                .getElementById("trainerId")
                .querySelector("i").style.color = "red";
              document.getElementById("trainerNew_submit").disabled = true;
            }
          });
      } else {
        trainerId_input.style.setProperty("--border_color", "red");
        trainerId_input.style.setProperty("--text_color", "red");
        document
          .getElementById("trainerId")
          .querySelector("i")
          .classList.remove("bxs-user-check");
        document
          .getElementById("trainerId")
          .querySelector("i")
          .classList.add("bxs-user-x");
        document.getElementById("trainerId").querySelector("i").style.color =
          "red";
        document.getElementById("trainerNew_submit").disabled = true;
      }
    };

    const trainerEmail_input = document.getElementById("trainerEmail_input");
    trainerEmail_input.onkeyup = (e) => {
      if (validateEmail(trainerEmail_input.value)) {
        trainerEmail_input.style.border = "1px solid #34ac9e";
      } else {
        trainerEmail_input.style.border = "1px solid #FF0000";
        // document.getElementById("trainerNew_submit").disabled = true;
      }
      if (trainerEmail_input.value.length == 0) {
        trainerEmail_input.style.border = "1px solid #FF0000";
        // document.getElementById("trainerNew_submit").disabled = true;
      }
    };
  };
  xhttp.open("GET", "./assets/pages/newTrainer.html");
  xhttp.send();
  closeOverlayEffect();
};

// saving the complete new Trainer

var API_Trainer_SAVE = "/api/trainer/create";
const saveNewTrainer = () => {
  const API_URL = `${API_BASE_URL}${API_Trainer_SAVE}`;

  //  fomr data
  const trainerName_input = document.getElementById("trainerName_input").value;
  const trainerId_input = document.getElementById("trainerId_input").value;
  const trainerEmail_input =
    document.getElementById("trainerEmail_input").value;
  const trainerMobile_input = document.getElementById(
    "trainerMobile_input"
  ).value;
  const trainerfacebook_input = document.getElementById(
    "trainerfacebook_input"
  ).value;
  const trainertwitter_input = document.getElementById(
    "trainertwitter_input"
  ).value;
  const trainerInstagram_input = document.getElementById(
    "trainerInstagram_input"
  ).value;
  const trainerGitHub_input = document.getElementById(
    "trainerGitHub_input"
  ).value;
  document
    .querySelector(".formSection form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      let data = JSON.stringify({
        trainer_id: trainerId_input,
        trainer_name: trainerName_input,
        email: trainerEmail_input,
        mobile: trainerMobile_input,
        trainer_img: downloadImageUrl,
        facebook: trainerfacebook_input,
        twitter: trainertwitter_input,
        instagram: trainerInstagram_input,
        github: trainerGitHub_input,
      });
      adminAlertNotifications("Data saved successfully", "100%", "green");

      fetch(API_URL, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(() => {
        setTimeout(() => {
          location.replace("./admin.html");
        }, 200);
      });
    });
};

// email verfication
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const buildTrainersList = () => {
  let trainersDataList = "";

  for (data of allTrainer) {
    const trainerDate = new Date(
      parseInt(data.trainer_added_date)
    ).toDateString();
    trainersDataList += `
    <div class="trainerCard">
          <div class="bgimg"><img src="${data.trainer_img}" alt="" srcset=""></div>

          <figcaption>
              <div class="profile"><img src="${data.trainer_img}" alt="" srcset=""></div>
              <h3>${data.trainer_name}</h3>
              <div class="icons">
                  <a href="${data.facebook}"><i class='bx bxl-facebook'></i></a>
                  <a href="${data.twitter}"><i class='bx bxl-instagram'></i></a>
                  <a href="${data.instagram}"><i class='bx bxl-twitter'></i></a>
                  <a href="${data.github}"><i class='bx bxl-github'></i></a>
              </div>
          </figcaption>

          <div class="addedDate">
                  <h5>${trainerDate}</h5>
              </div>
      </div>
    `;
  }
  document.querySelector(".courseMainSection").innerHTML = trainersDataList;
};

// displaying users list
const usersList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
    buildUsersList();
  };
  xhttp.open("GET", "./assets/pages/getAllUsers.html");
  xhttp.send();
  closeOverlayEffect();
};

const buildUsersList = () => {
  let userDataList = "";

  userDataList = `
  <div class="tableDiv">
  <table>
    <thead>
        <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Email Verified</th>
            <th>Added Date</th>
        </tr>
    </thead>
    <tbody>
  `;

  for (data of allUsers) {
    let displayName = data.displayName == undefined ? "NA" : data.displayName;
    let imgUrl =
      data.photoURL == undefined ? "./assets/img/profile.svg" : data.photoURL;
    userDataList += `
      <tr>
        <td>
            <div class="imgBox">
                <img src="${imgUrl}" alt="">
            </div>
        </td>
        <td>${displayName}</td>
        <td>${data.email}</td>
        <td>${data.emailVerified}</td>
        <td>${data.metadata.creationTime}</td>
      </tr>
    `;
  }
  userDataList += `
  </tbody>
</table>
<div>`;
  document.querySelector(".courseMainSection").innerHTML = userDataList;
};

// displaying concepts list
const conceptsList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
    buildConceptsList();
  };
  xhttp.open("GET", "./assets/pages/getAllConcepts.html");
  xhttp.send();
  closeOverlayEffect();
};

const addNewToconceptsList = () => {
  setOverlayEffect();
  mainMiddleContainer.innerHTML = "";
  const xhttp = new XMLHttpRequest();
  xhttp.onload = () => {
    mainMiddleContainer.innerHTML = xhttp.responseText;
    addNewCourseDragOver();
    loadConceptTrainerCourse();
  };
  xhttp.open("GET", "./assets/pages/newConcept.html");
  xhttp.send();
  closeOverlayEffect();
};
// listing out the trainers name and the course title in the select boxes
const loadConceptTrainerCourse = () => {
  let chooseOptions = "";
  chooseOptions += `
  <div class="chooseOptions">
      <div class="labelMenu"><label id="courseMenuLabel"> Select Course</label><i class='bx bx-chevron-down' id="courseMenuContainerI"></i></div>
      <div class="labelMenuContainer" id="courseMenuContainer">
          <ul id="coursesUl">
          `;
  for (course of allCourses) {
    chooseOptions += `
        <li>${course.course_name}</li>
    `;
  }

  chooseOptions += `
          </ul>
      </div>
    </div>
`;

  chooseOptions += `
  <div class="chooseOptions">
      <div class="labelMenu"><label id="trainerMenuLabel"> Select Trainer</label><i class='bx bx-chevron-down' id="trainerMenuContainerI"></i></div>
      <div class="labelMenuContainer" id="trainerMenuContainer">
          <ul id="trainerUl">
          `;
  for (trainer of allTrainer) {
    chooseOptions += `
        <li>${trainer.trainer_id} </li>
    `;
  }

  chooseOptions += `
          </ul>
      </div>
    </div>
`;

  document.getElementById("conceptIdSection").innerHTML = chooseOptions;

  document.getElementById("courseMenuContainerI").onclick = () => {
    if (
      document.getElementById("courseMenuContainer").style.display == "block"
    ) {
      document.getElementById("courseMenuContainerI").style.transform =
        "rotate(0deg)";
      document.getElementById("courseMenuContainer").style.display = "none";
    } else {
      document.getElementById("courseMenuContainerI").style.transform =
        "rotate(540deg)";
      document.getElementById("courseMenuContainer").style.display = "block";
    }
  };
  document.getElementById("trainerMenuContainerI").onclick = () => {
    if (
      document.getElementById("trainerMenuContainer").style.display == "block"
    ) {
      document.getElementById("trainerMenuContainerI").style.transform =
        "rotate(0deg)";
      document.getElementById("trainerMenuContainer").style.display = "none";
    } else {
      document.getElementById("trainerMenuContainerI").style.transform =
        "rotate(540deg)";
      document.getElementById("trainerMenuContainer").style.display = "block";
    }
  };

  const trainerLi = document
    .getElementById("trainerMenuContainer")
    .querySelectorAll("li");

  const courseLi = document
    .getElementById("courseMenuContainer")
    .querySelectorAll("li");

  courseLi.forEach((element) => {
    element.setAttribute("onclick", "selectCourseElement(this)");
  });

  trainerLi.forEach((element) => {
    element.setAttribute("onclick", "selectTrainerElement(this)");
  });
};
// to change the select box item on click
const selectTrainerElement = (element) => {
  document.getElementById("trainerMenuContainerI").style.transform =
    "rotate(0deg)";
  document.getElementById("trainerMenuContainer").style.display = "none";
  document.getElementById("trainerMenuLabel").innerText = element.innerText;
};

const selectCourseElement = (element) => {
  document.getElementById("courseMenuContainerI").style.transform =
    "rotate(0deg)";
  document.getElementById("courseMenuContainer").style.display = "none";
  document.getElementById("courseMenuLabel").innerText = element.innerText;

  // if (element.innerText == "Web") {
  //   document.getElementById("htmlCode").style.display = "block";
  //   document.getElementById("cssCode").style.display = "block";
  //   document.getElementById("jsCode").style.display = "block";
  // } else {
  //   document.getElementById("htmlCode").style.display = "none";
  //   document.getElementById("cssCode").style.display = "none";
  //   document.getElementById("jsCode").style.display = "none";
  // }
};

var API_Concept_SAVE = "/api/concept/create";
const saveNewConcept = () => {
  const API_URL = `${API_BASE_URL}${API_Concept_SAVE}`;

  //  fomr data
  const courseMenuLabel = document.getElementById("courseMenuLabel").innerText;
  const trainerMenuLabel =
    document.getElementById("trainerMenuLabel").innerText;
  const conceptName_input = document.getElementById("conceptName_input").value;
  const conceptVideo_input =
    document.getElementById("conceptVideo_input").value;
  const conceptDescription_input = document.getElementById(
    "conceptDescription_input"
  ).value;
  const htmlCode_text = document.getElementById("htmlCode_text").value;
  const cssCode_text = document.getElementById("cssCode_text").value;
  const jsCode_text = document.getElementById("jsCode_text").value;
  const otherCode_text = document.getElementById("otherCode_text").value;
  const conceptGitHub_input = document.getElementById(
    "conceptGitHub_input"
  ).value;

  document
    .querySelector(".formSection form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      let data = JSON.stringify({
        course_id: courseMenuLabel,
        trainer_id: trainerMenuLabel,
        concept_name: conceptName_input,
        concept_img: downloadImageUrl,
        concept_video: conceptVideo_input,
        concept_description: conceptDescription_input,
        html_code: htmlCode_text,
        css_code: cssCode_text,
        js_code: jsCode_text,
        other_code: otherCode_text,
        github_link: conceptGitHub_input,
      });
      adminAlertNotifications("Data saved successfully", "100%", "green");

      fetch(API_URL, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(() => {
        setTimeout(() => {
          location.replace("./admin.html");
        }, 200);
      });
    });
};

// Building the concepts list inner html
const buildConceptsList = () => {
  let conceptsDataList = "";

  conceptsDataList += `<div class="tableDiv">
  <table>
      <thead>
          <tr>
              <th>Thumb</th>
              <th>Title</th>
              <th>Course</th>
              <th>Trainer</th>
              <th>Edit/Delete</th>
          </tr>
      </thead>
      <tbody>
  `;

  for (data of allConcepts) {
    const conceptAddedDate = new Date(
      parseInt(data.concept_added_date)
    ).toDateString();

    conceptsDataList += `
            <tr>
                <td>
                    <div class="imgBox conceptImagBx">
                        <img src="${data.concept_img}" alt="">
                    </div>
                </td>
                <td>${data.concept_name}</td>
                <td>${data.course_id}</td>
                <td>${data.trainer_id}</td>
                <td>
                    <div class="editSection">
                        <i class='bx bxs-edit'></i>
                        <i class='bx bxs-trash'></i>
                    </div>
                </td>
            </tr>

    `;
  }
  conceptsDataList += `
  </tbody>
</table>
</div>
`;
  document.querySelector(".courseMainSection").innerHTML = conceptsDataList;
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
