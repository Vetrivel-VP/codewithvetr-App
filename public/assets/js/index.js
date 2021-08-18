var API_BASE_URL =
  "http://localhost:5001/codewithvetriapi-c56e3/us-central1/app";
// "https://us-central1-codewithvetriapi-c56e3.cloudfunctions.net/app";

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
    });
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
    });
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
    });
};

window.addEventListener("load", () => {
  getAllCourses();
  getAllTrainers();
  getAllCaoncepts();
});
