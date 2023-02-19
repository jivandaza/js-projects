// select items
const $toggleBtn = document.querySelector(".sidebar-toggle"),
    $closeBtn = document.querySelector(".close-btn"),
    $sidebar = document.querySelector(".sidebar");

// event toggle button
$toggleBtn.addEventListener("click", () => {
    $sidebar.classList.toggle("show-sidebar");
});

// event close button
$closeBtn.addEventListener("click", () => {
    $sidebar.classList.remove("show-sidebar");
});