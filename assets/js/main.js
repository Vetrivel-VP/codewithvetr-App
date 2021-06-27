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

const searcWrapper = document.querySelector(".searchInput");
const inputBox = searcWrapper.querySelector("input");
const suggestionBox = searcWrapper.querySelector(".automCom_box");

inputBox.onkeyup = (e) => {
  let userValue = e.target.value;
  let emptyArray = [];
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
    let allList = suggestionBox.querySelectorAll("li");
    allList.forEach((element) => {
      element.setAttribute("onclick", "selectSuggestElement(this)");
    });
  } else {
    searcWrapper.classList.remove("active"); //remove autosuggestions
  }
};

const selectSuggestElement = (element) => {
  let selectUserData = element.innerText;
  inputBox.value = selectUserData;
  console.log(selectUserData);
};

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
