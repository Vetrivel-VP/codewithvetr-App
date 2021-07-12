const modal = document.getElementById("videoModal");
const modalBtn = document.getElementById("playBtn");
const closeBtn = document.getElementById("closeBtn");

const modalTabs = document.querySelectorAll(".tabs li");
const tabContents = document.querySelectorAll(".codecontent");

const codeModal = document.getElementById("codeModal");
const codeModalBtn = document.getElementById("downloadSource");
const codeCloseBtn = document.getElementById("modalcloseBtn");

window.onload = () => {
  modalBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", outsideClick);

  codeModalBtn.addEventListener("click", openCodeModal);
  codeCloseBtn.addEventListener("click", closeCodeModal);
  window.addEventListener("click", outsideClickCodeModal);
};

const openModal = () => {
  modal.style.display = "flex";
};

const openCodeModal = () => {
  codeModal.style.display = "flex";
};

const closeModal = () => {
  modal.style.display = "none";
};

const closeCodeModal = () => {
  codeModal.style.display = "none";
};

const outsideClick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

const outsideClickCodeModal = (e) => {
  if (e.target == codeModal) {
    codeModal.style.display = "none";
  }
};

modalTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    modalTabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");

    // to show the content

    tabContents.forEach((tc) => tc.classList.remove("active"));
    tabContents[index].classList.add("active");
  });
});

modalTabs[0].click();
