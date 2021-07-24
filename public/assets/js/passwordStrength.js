let cssAfterPass = window.getComputedStyle(passwordField, "::after");
let cssAfterEmail = window.getComputedStyle(creatUserFormEmailId, "::after");
// getComputedStyle() used to get pseudo element styles

inputPass.onkeyup = (e) => {
  passwordCheck(inputPass.value);
  if (e.keyCode == 13) {
    signInUser();
  }
};

creatUserFormEmailId.onkeyup = (e) => {
  if (validateEmail(creatUserFormEmailId.value)) {
    userEmailDiv.style.setProperty("--primary-color", "#06bf06");
    userEmailDiv.style.setProperty("--widthSize", "100%");
    UserActionButton.disabled = false;
  } else {
    userEmailDiv.style.setProperty("--primary-color", "#FF0000");
    userEmailDiv.style.setProperty("--widthSize", "100%");
    UserActionButton.disabled = true;
  }
  if (creatUserFormEmailId.value.length == 0) {
    userEmailDiv.style.setProperty("--primary-color", "#FF0000");
    userEmailDiv.style.setProperty("--widthSize", "0%");
  }
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function passwordCheck(password) {
  let strength = 0;
  if (password.length >= 8) strength += 1;

  if (password.match(/(?=.*[0-9])/)) strength += 1;

  if (password.match(/(?=.*[!,%,&,@,#,$,^,*,?,_,~,<,>,])/)) strength += 1;

  if (password.match(/(?=.*[a-z])/)) strength += 1;

  if (password.match(/(?=.*[A-Z])/)) strength += 1;

  displayBar(strength);
}

function displayBar(strength) {
  switch (strength) {
    case 1:
      passwordField.style.setProperty("--primary-color", "#FF0000");
      passwordField.style.setProperty("--widthSize", "20%");

      break;

    case 2:
      passwordField.style.setProperty("--primary-color", "#FE9E00");
      passwordField.style.setProperty("--widthSize", "40%");

      break;

    case 3:
      passwordField.style.setProperty("--primary-color", "#D4FE00");
      passwordField.style.setProperty("--widthSize", "60%");

      break;

    case 4:
      passwordField.style.setProperty("--primary-color", "#FFA200");
      passwordField.style.setProperty("--widthSize", "80%");

      break;

    case 5:
      passwordField.style.setProperty("--primary-color", "#06bf06");
      passwordField.style.setProperty("--widthSize", "100%");

      break;

    default:
      passwordField.style.setProperty("--primary-color", "#de1616");
      passwordField.style.setProperty("--widthSize", "0%");
  }
}
