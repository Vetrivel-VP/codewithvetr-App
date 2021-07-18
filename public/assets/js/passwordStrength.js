const passwordField = document.getElementById("passwordField");
const inputPass = passwordField.querySelector("input");

let cssAfterPass = window.getComputedStyle(passwordField, "::after");
// getComputedStyle() used to get pseudo element styles

inputPass.onkeyup = (e) => {
  passwordCheck(inputPass.value);
};

function passwordCheck(password) {
  let strength = 0;
  if (password.length >= 8) strength += 1;

  if (password.match(/(?=.*[0-9])/)) strength += 1;

  if (password.match(/(?=.*[!,%,&,@,#,$,^,*,?,_,~,<,>,])/)) strength += 1;

  if (password.match(/(?=.*[a-z])/)) strength += 1;

  if (password.match(/(?=.*[A-Z])/)) strength += 1;

  console.log(password.length, strength);

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
