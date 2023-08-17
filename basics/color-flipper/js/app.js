// local colors data
const colors = [
    "green",
    "red",
    "rgba(133, 122, 200)",
    "#f15025"
];

// select items
const $btn = document.getElementById("btn"),
    $color = document.querySelector(".color");

// get random number
const getRandomNumber = () => Math.floor(Math.random()*colors.length);

// event button
$btn.addEventListener("click", (e) => {
    const randomNumber = getRandomNumber();
    document.body.style.backgroundColor = colors[randomNumber];
    $color.textContent = colors[randomNumber];
    $color.style.color = colors[randomNumber];
});