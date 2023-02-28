// select items
const $video = document.querySelector(".video-container"),
    $switchBtn = document.querySelector(".switch-btn"),
    $preloader = document.querySelector(".preloader"),
    $pause = document.getElementById("pause"),
    $play = document.getElementById("play");

// event pause
$pause.addEventListener("click", () => {
    $switchBtn.classList.add("slide");
    $video.pause();
});

// event play
$play.addEventListener("click", () => {
    $switchBtn.classList.remove("slide");
    $video.play();
});

// event switch button
/*$switchBtn.addEventListener("click", () => {
    if (!$switchBtn.classList.contains("slide")) {
        $switchBtn.classList.add("slide");
        $video.pause();
    } else {
        $switchBtn.classList.remove("slide");
        $video.play();
    }
});*/

// event hide preloader
window.addEventListener("load", () => {
    $preloader.classList.add("hide-preloader");
});
