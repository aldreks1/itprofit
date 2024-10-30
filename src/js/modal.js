document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".modal");
  const openModalBtn = document.getElementById("open-modal");
  const closeModalBtn = modal.querySelector(".close");

  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
