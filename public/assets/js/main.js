let suggestions = [];

window.addEventListener("load", async () => {
  try {
    setOverlayEffect();
    concepts = await loadConcepts();

    concepts.data.forEach((element) => {
      suggestions.push({ id: element.concept_id, name: element.concept_name });
    });
    closeOverlayEffect();
  } catch (error) {
    console.log(error);
  }
});

var currentLI = 0;
const searcWrapper = document.querySelector(".searchInput");
const inputBox = searcWrapper.querySelector("input");
const suggestionBox = searcWrapper.querySelector(".automCom_box");
const course_search = document.getElementById("course_search");
const rightSide_container = document.querySelector(".rightSide_container");
const main_container = document.querySelector(".main");

inputBox.onkeyup = (e) => {
  let userValue = e.target.value;
  var emptyArray = [];
  if (userValue) {
    document.querySelector(".search_icon").style.display = "flex";
    emptyArray = suggestions.filter((data) => {
      // filtering array value and converting user data into lowecase and
      // returning only the character startswith character which matches with user search data
      const name = data.name;
      return name.toLocaleLowerCase().startsWith(userValue.toLocaleLowerCase());
    });

    emptyArray = emptyArray.map((data) => {
      return (data = `<li id="${data.id}">${data.name}</li>`);
    });

    searcWrapper.classList.add("active"); //show autosuggestions
    showSuggestions(emptyArray);

    let allLi = suggestionBox.querySelectorAll("li");
    allLi.forEach((element) => {
      element.setAttribute("onclick", "selectSuggestElement(this)");
    });

    var listItems = suggestionBox.querySelectorAll("li");
    if (e.keyCode == 38 || e.keyCode == 40) {
      listItems[currentLI].classList.add("highlight");

      // Set up a key event handler for the document
      // Check for up/down key presses
      switch (e.keyCode) {
        case 38: // Up arrow
          // Remove the highlighting from the previous element
          listItems[currentLI].classList.remove("highlight");

          currentLI = currentLI > 0 ? --currentLI : 0; // Decrease the counter
          listItems[currentLI].classList.add("highlight"); // Highlight the new element
          break;
        case 40: // Down arrow
          // Remove the highlighting from the previous element
          listItems[currentLI].classList.remove("highlight");
          currentLI =
            currentLI < listItems.length - 1
              ? ++currentLI
              : listItems.length - 1; // Increase counter
          listItems[currentLI].classList.add("highlight"); // Highlight the new element
          // selectSuggestElement(listItems[currentLI]);
          break;
      }
    }
  } else {
    document.querySelector(".search_icon").style.display = "none";
    suggestionBox.innerHTML = "";
    searcWrapper.classList.remove("active"); //remove autosuggestions
  }
};

// Suggestion Element
const selectSuggestElement = (element) => {
  let selectUserData = element.innerText;
  inputBox.value = selectUserData;
  if (element.id) {
    fetchSuggestionSeaarch(element.id);
    searcWrapper.classList.remove("active");
  } else {
    alertCustomizations("Not Found  😑", "#B85B09", "#B55704");
  }
};

const removeSuggestionsIcon = () => {
  document.querySelector(".search_icon").style.display = "none";
  inputBox.value = "";
  suggestionBox.innerHTML = "";
  searcWrapper.classList.remove("active");
  buildCourseMainContent("Web");
  courseList_container("Web");
};

const fetchSuggestionSeaarch = (id) => {
  var API_CONCEPTS_ID = "/api/concept/read/";
  const API_URL = `${API_BASE_URL}${API_CONCEPTS_ID}${id}`;
  fetch(API_URL, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      buildSuggestionSeaarch(data.data);
    });
};

const buildSuggestionSeaarch = (data) => {
  let courseContent = "";
  const concept_added_date = new Date(
    parseInt(data.concept_added_date)
  ).toDateString();
  courseContent += `
  <div class="courseContainer">
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
      <i class="bx bx-play-circle" id="playBtn" onclick="videoModal('${data.concept_video}')"></i>
    </div>
    <div class="sourseCodeContaienr">
      <div class="momentContainer">
        <p>${concept_added_date}</p>
        <a href="#"  class="downloadButton"  onclick="gitHubLinkNavigate('${data.github_link}')">
          Download Source</a>
      </div>
    </div>
  </div>
`;
  setOverlayEffect();
  document.getElementById("courseContent").innerHTML = courseContent;
  closeOverlayEffect();
};

// show suggestions
const showSuggestions = (list) => {
  let listdata;
  if (!list.length) {
    userValue = inputBox.value;
    listdata = `<li><p>${userValue}</p></li>`;
  } else {
    listdata = list.join("");
  }
  suggestionBox.innerHTML = listdata;
};

//close on click outside
const suggestOutsideClick = (e) => {
  if (e.target == rightSide_container || e.target == main_container) {
    searcWrapper.classList.remove("active");
  }
};

window.addEventListener("click", suggestOutsideClick);

// show on click inside the textbox
const showSuggestionAgain = (e) => {
  if (suggestionBox.innerHTML) {
    searcWrapper.classList.add("active");
  }
};

course_search.addEventListener("click", showSuggestionAgain);

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("pre code").forEach((el) => {
    hljs.highlightElement(el);
  });
});
