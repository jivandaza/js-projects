// select items
const $aboutBtns = document.querySelectorAll(".tab-btn"),
    $about = document.querySelector(".about"),
    $articlesInfo = document.querySelectorAll(".content");

// event click about
$about.addEventListener("click", (e) => {
    //console.log(e.target.dataset.id);
    const id = e.target.dataset.id;

    if (id) {
        // remove active from others buttons
        $aboutBtns.forEach((btn) => {
            btn.classList.remove("active");
            e.target.classList.add("active");
        })

        // hide other articles
        $articlesInfo.forEach((article) => {
            article.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
    }
});

