const API_COURSE_URL = "http://localhost:3000/api/cources";
const API_TRAINER_URL = "http://localhost:3000/api/trainers";
const API_BASE_URL = "http://localhost:3000/";

window.addEventListener("load", () => {
  getCourses();
});

let getCourses = () => {
  fetch(API_COURSE_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      buildCourse(data);
    });
};

let buildCourse = (data) => {
  let courseContent = "";
  for (main of data) {
    for (content of main.data) {
      const contentImage = `${API_BASE_URL}${content.post_image}`;
      courseContent += `
      <div class="courseContainer">
          <div class="courseTitleContainer">
              <div class="titleImageContainer">
              <img src="./assets/img/Vetri.jpg" alt="" srcset="" />
              </div>
              <div class="titleNameContainer">
              <p>How to create a responsive landing page ?</p>
              </div>
              <div class="favoriteContainer">
              <span>&hearts;</span>
              </div>
          </div>
          <div class="videoContainer">
              <img src="./assets/img/thumb.jpg" alt="" />
              <i class="bx bx-play-circle" id="playBtn"></i>
          </div>
          <div class="sourseCodeContaienr">
              <div class="momentContainer">
              <p>2 minutes ago</p>
              <a href="#" class="downloadButton" id="downloadSource">
                  Download Source</a>
             </div>
          </div>
      </div>
    `;
    }
  }
};
