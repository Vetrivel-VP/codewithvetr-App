var API_Users = "/api/users";
var API_Users_ID = "/api/users/read/";

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

window.onload = () => {
  getAllUsers();
  getAllCourses();
  getAllTrainers();
  getAllCaoncepts();
};
