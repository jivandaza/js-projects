// select items
const $questionBtns = document.querySelectorAll(".question-btn"),
    $questions = document.querySelectorAll(".question");

// event show questions
/*$questionBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const question = e.currentTarget.parentElement.parentElement;
        question.classList.toggle("show-text");
    })
});*/

// event show question
$questions.forEach((question) => {
    const btn = question.querySelector(".question-btn");
    btn.addEventListener("click", () => {
        $questions.forEach((item) => {
            if (item !== question) {
                item.classList.remove("show-text");
            }
        });
        question.classList.toggle("show-text");
    });
});
