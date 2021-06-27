const modal = document.getElementById("videoModal");
const modalBtn = document.getElementById("playBtn");
const closeBtn = document.getElementById("closeBtn");

window.onload = () => {
  modalBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", outsideClick);
};

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "none";
};

const outsideClick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};
