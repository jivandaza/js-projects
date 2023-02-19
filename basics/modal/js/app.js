// select items
const $modalBtn = document.querySelector(".modal-btn"),
    $closeBtn = document.querySelector(".close-btn"),
    $modalShow = document.querySelector(".modal-overlay");

// event modal button
$modalBtn.addEventListener("click", () => {
    $modalShow.classList.add("open-modal");
});

// event close button
$closeBtn.addEventListener("click", () => {
    $modalShow.classList.remove("open-modal");
});
