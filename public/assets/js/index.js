var API_BASE_URL =
  // "http://localhost:5001/codewithvetriapi-c56e3/us-central1/app";
  "https://us-central1-codewithvetriapi-c56e3.cloudfunctions.net/app";

var courses = [];
async function loadCourses() {
  var API_COURSES = "/api/courses";
  const API_URL = `${API_BASE_URL}${API_COURSES}`;
  const courses = await fetch(API_URL, { method: "GET" }).then((response) => {
    return response.json();
  });
  return courses;
}

var concepts = [];
async function loadConcepts() {
  var API_CONCEPTS = "/api/concept";
  const API_URL = `${API_BASE_URL}${API_CONCEPTS}`;
  const concepts = await fetch(API_URL, { method: "GET" }).then((response) => {
    return response.json();
  });
  return concepts;
}

var trainers = [];
async function loadtrainers() {
  var API_TRAINERS = "/api/trainer";
  const API_URL = `${API_BASE_URL}${API_TRAINERS}`;
  const trainers = await fetch(API_URL, { method: "GET" }).then((response) => {
    return response.json();
  });
  return trainers;
}

const setOverlayEffect = () => {
  document.getElementById("overlay").style.display = "flex";
  // document.getElementById("overlay").style.animation = "fade 1s ease";
};

const closeOverlayEffect = () => {
  setTimeout(() => {
    document.getElementById("overlay").style.display = "none";
  }, 1000);
};

window.addEventListener("load", async () => {
  try {
    // setOverlayEffect();
    courses = await loadCourses();
    concepts = await loadConcepts();
    trainers = await loadtrainers();
    buildCourseMainContent("Web");
    buildCategoryCard();
    swriperTrainerSlide();
    courseList_container("Web");

    window.addEventListener("click", outsideClickVideoModal);
    // createScriptTag();
    // checkAuthState();
    // closeOverlayEffect();
  } catch (error) {
    console.log(error);
  }
});

const myFavorite = (element, concept_id) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      element.classList.add("active");
      console.log(concept_id);
      // onclick="myFavorite(this, ${data.concept_id})"
    } else {
      alertCustomizations("Login to add!", "#B85B09", "#B55704");
      console.log(concept_id);
    }
  });
};

const swriperTrainerSlide = () => {
  let swipperWrapper = "";

  for (data of trainers.data) {
    swipperWrapper += `
    <div class="swiper-slide">
        <div class="trainerCard">
            <div class="imageBox">
                <img src="${data.trainer_img}" alt="" srcset="" />
            </div>
            <div class="textBox">
                <h3>${data.trainer_name}</h3>
                <p>${data.designation}</p>
            </div>
            <div class="socialBox">
                <a href="${data.facebook}"><i class="bx bxl-facebook-circle"></i></a>
                <a href="${data.instagram}"><i class="bx bxl-instagram"></i></a>
                <a href="${data.github}"><i class="bx bxl-github"></i></a>
                <a href="${data.twitter}"><i class="bx bxl-twitter"></i></a>
            </div>
        </div>
    </div>
    `;
  }

  document.getElementById("swiper-wrapper").innerHTML = swipperWrapper;

  var swiper = new Swiper(".swiper-container", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
};

const buildCategoryCard = () => {
  let categoryCard = "";

  for (data of courses.data) {
    categoryCard += `
        <div class="cardContainer" onclick=" courseList_container('${data.course_name}'); buildCourseMainContent('${data.course_name}');">
            <div class="imageBox">
            <img src="${data.course_img}" alt="" srcset="" />
            </div>
            <div class="textBox">
            <h3>${data.course_title}</h3>
            </div>
        </div>
      `;
  }

  document.querySelector(".categoryCard").innerHTML = categoryCard;
};

const courseList_container = (courseName) => {
  let courseList_container = "";

  //   courseList_container += `
  //   <a href="#">
  //     <div class="link_container">
  //         <div class="icon_container">
  //         <img src="./assets/img/Vetri.jpg" alt="" srcset="" />
  //         </div>
  //         <div class="link_text">Home</div>
  //     </div>
  //     </a>
  //     `;
  concepts.data.sort(
    (a, b) => parseInt(b.concept_added_date) - parseInt(a.concept_added_date)
  );
  for (data of concepts.data) {
    if (data.course_id == courseName) {
      courseList_container += `
              <a href="#${data.concept_id}">
              <div class="link_container">
                  <div class="icon_container">
                  <img src="${data.concept_img}" alt="" srcset="" />
                  </div>
                  <div class="link_text">
                  ${data.concept_name}
                  </div>
              </div>
              </a>
            `;
    }
  }

  document.querySelector(".courseList_container").innerHTML =
    courseList_container;
};

const buildCourseMainContent = (courseName) => {
  setOverlayEffect();
  let courseContent = "";

  concepts.data.sort(
    (a, b) => parseInt(b.concept_added_date) - parseInt(a.concept_added_date)
  );
  for (data of courses.data) {
    if (data.course_name == courseName) {
      courseContent += `
            <div class="tittleWrapper">
                    <div class="tittleSection">
                      <h1>${data.course_title}</h1>
                    </div>
                    <div class="titleImageSection">
                      <img src="${data.course_img}" alt="" srcset="" />
                    </div>
                  </div>
                  `;
    }
  }

  for (data of concepts.data) {
    if (data.course_id == courseName) {
      const concept_added_date = new Date(
        parseInt(data.concept_added_date)
      ).toISOString();
      courseContent += `
                  <div class="courseContainer" id="${data.concept_id}">
                    <div class="courseTitleContainer">
                      <div class="titleImageContainer">
                        <img src="${data.concept_img}" alt="" srcset="" />
                      </div>
                      <div class="titleNameContainer">
                        <p>${data.concept_name}</p>
                      </div>
                      <div class="favoriteContainer"  id="favoriteContainer">
                        <span>&hearts;</span>
                      </div>
                    </div>
                    <div class="videoContainer">
                      <img src="${data.concept_img}" alt="" />
                      <i class="bx bx-play-circle" id="playBtn" onclick="videoModal('${
                        data.concept_video
                      }')"></i>
                    </div>
                    <div class="sourseCodeContaienr">
                      <div class="momentContainer">
                        <p>${moment(concept_added_date).fromNow()}</p>
                        <a href="#"  class="downloadButton"  onclick="gitHubLinkNavigate('${
                          data.github_link
                        }')">
                          Download Source</a>
                      </div>
                    </div>
                  </div>
            `;
    }
  }

  document.getElementById("courseContent").innerHTML = courseContent;
  closeOverlayEffect();
};

const gitHubLinkNavigate = (github_link) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.open(github_link, "_blank") ||
        window.location.replace(github_link);

      // alert message
    } else {
      // alert message
      alertCustomizations("Warning: Login to download!", "#B85B09", "#B55704");
      loginModal.style.display = "flex";
    }
  });
};

// Opening Video Modal

const videoModal = (data) => {
  document.getElementById("videoModal").style.display = "flex";
  let videoModal = "";

  videoModal += `
  <div class="modalContent">
    <div class="close" id="closeBtn" onclick="closeVideoModal()">
        <span class="closeButton">&times;</span>
    </div>
    <div class="responsive_youtube">
        <iframe src="${data}" title="YouTube video player" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    </div>
  `;

  document.getElementById("videoModal").innerHTML = videoModal;
};

const closeVideoModal = () => {
  document.getElementById("videoModal").style.display = "none";
};

const outsideClickVideoModal = (e) => {
  if (e.target == document.getElementById("videoModal")) {
    document.getElementById("videoModal").style.display = "none";
  }
};
