import { questions } from "./../data/questions.js";
import { Quiz } from "./../models/Quiz.js";
import { UI } from "./../models/UI.js";

/**
 * 
 * @param {Quiz} quiz the main quiz object
 * @param {UI} ui UI object
 */
const showPage = (quiz, ui) => {
    ui.showQuestion(quiz.getQuestionIndex().text);
    ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => {
      quiz.guess(currentChoice);
      renderPage(quiz, ui);
    });
    ui.showProgress(quiz.questionIndex + 1, questions.length);
};

// reset quiz and UI
/**
 * 
 * @param {Quiz} quiz the main quiz object
 * @param {UI} ui UI object
 */
const resetQuizUI = (quiz, ui) => {
    quiz.questionIndex = 0;
    quiz.score = 0;
    const quizHTML = `
                <h1>Quiz</h1>
                <hr>
                <h2 id="question"></h2>
                <div id="choices"></div>
                <hr>
                <footer>
                    <p id="progress"></p>
                </footer>
            `;
    const quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizHTML;
    showPage(quiz, ui);
}

// reset quiz of set interval
/**
 * 
 * @param {Quiz} quiz the main quiz object
 * @param {UI} ui UI object
 */
const resetQuizTimeOut = (quiz, ui) => {
  setTimeout(() => {
    resetQuizUI(quiz, ui);
  }, 2000);
};

// reset quiz of button
/**
 * 
 * @param {Quiz} quiz the main quiz object
 * @param {UI} ui UI object
 */
const resetQuizButton = (quiz, ui) => {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
      resetQuizUI(quiz, ui);
    });
}

/**
 * 
 * @param {Quiz} quiz the main quiz object
 * @param {UI} ui UI object
 * 
 */
const renderPage = (quiz, ui) => {
    if (quiz.isEnded()) {
        ui.showScores(quiz.score);
        resetQuizButton(quiz, ui);
        resetQuizTimeOut(quiz, ui);
    } else {
        showPage(quiz, ui);
    }
}

function main() {
    const quiz = new Quiz(questions);
    const ui = new UI();

    renderPage(quiz, ui);
}

main();