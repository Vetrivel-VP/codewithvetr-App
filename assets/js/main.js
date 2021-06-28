let suggestions = [
  "Channel",
  "YouTube",
  "YouTuber",
  "YouTube Channel",
  "Blogger",
  "Bollywood",
  "Vlogger",
  "Vechiles",
  "Facebook",
  "Freelancer",
  "Facebook Page",
  "Designer",
  "Developer",
  "Web Designer",
  "Web Developer",
  "Login Form in HTML & CSS",
  "How to learn HTML & CSS",
  "How to learn JavaScript",
  "How to became Freelancer",
  "How to became Web Designer",
  "How to start Gaming Channel",
  "How to start YouTube Channel",
  "What does HTML stands for?",
  "What does CSS stands for?",
];

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
    emptyArray = suggestions.filter((data) => {
      // filtering array value and converting user data into lowecase and
      // returning only the character startswith character which matches with user search data
      return data.toLocaleLowerCase().startsWith(userValue.toLocaleLowerCase());
    });

    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data}</li>`);
    });
    searcWrapper.classList.add("active"); //show autosuggestions
    showSuggestions(emptyArray);

    if (e.keyCode == 38 || e.keyCode == 40) {
      var listItems = suggestionBox.querySelectorAll("li");

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
          console.log(currentLI);
          currentLI =
            currentLI < listItems.length - 1
              ? ++currentLI
              : listItems.length - 1; // Increase counter
          console.log(currentLI);
          listItems[currentLI].classList.add("highlight"); // Highlight the new element
          break;
      }
    }

    listItems.forEach((element) => {
      element.setAttribute("onclick", "selectSuggestElement(this)");
    });
  } else {
    suggestionBox.innerHTML = "";
    searcWrapper.classList.remove("active"); //remove autosuggestions
  }
};

// Suggestion Element
const selectSuggestElement = (element) => {
  let selectUserData = element.innerText;
  inputBox.value = selectUserData;
  console.log(selectUserData);
};

// show suggestions
const showSuggestions = (list) => {
  let listdata;
  if (!list.length) {
    userValue = inputBox.value;
    listdata = `<li>${userValue}</li>`;
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
