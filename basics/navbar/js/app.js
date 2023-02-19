// select items
const $btnNavToggle = document.querySelector(".nav-toggle"),
    $link = document.querySelector(".links");

// event navbar button
$btnNavToggle.addEventListener("click", (e) => {
    $link.classList.toggle("show-links");
});