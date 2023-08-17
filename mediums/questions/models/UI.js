export class UI {
  constructor() {}

  /**
   *
   * @param {string} text question to render
   */
  showQuestion(text) {
    const questionTitle = document.getElementById("question");
    questionTitle.innerText = text;
  }

  /**
   *
   * @param {string[]} choices the choices of the questions
   */
  showChoices(choices, callback) {
      const choicesContainer = document.getElementById("choices");
      choicesContainer.innerHTML = "";

    choices.map((choice) => {
      const button = document.createElement("button");
      button.innerText = choice;
      button.className = "button";
      button.addEventListener("click", () => callback(choice));
      choicesContainer.append(button);
    });
    }
    
    /**
     * 
     * @param {number} score the total score
     */
    showScores(score) {
        const quizEndHTML = `
            <h1>Result</h1>
            <h2>Your Scores is ${score}</h2>
            <button id="reset">Rest page</button>
        `;
      const quizElement = document.getElementById("quiz");
      quizElement.innerHTML = quizEndHTML;
    }

    /**
     * 
     * @param {number} currentIndex the current index of the quiz
     * @param {number} total the total questions 
     */
    showProgress(currentIndex, total) {
        const progressElement = document.getElementById("progress");
        progressElement.innerHTML = `Question ${currentIndex} of ${total}`;
    }
}