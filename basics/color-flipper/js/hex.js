// local colors data
const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// select items
const $btn = document.getElementById("btn"),
    $color = document.querySelector(".color");

// get random number
const getRandomNumber = () => Math.floor(Math.random()*colors.length);

// get random color
const getRandomColor = () => {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
        hexColor += colors[getRandomNumber()];
    }
    return hexColor;
}

// event button
$btn.addEventListener("click", (e) => {
    hexColor = getRandomColor();
    document.body.style.backgroundColor = hexColor;
    $color.textContent = hexColor;
});
