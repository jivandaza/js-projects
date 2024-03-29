export class Question {
    /**
     * 
     * @param {string} text this is text of question
     * @param {string[]} choices this are the choices of the question
     * @param {string} answer this is the answer of the question
     */
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    /**
     * 
     * @param {string} choice done text to guess
     * @returns {boolean} return true if the answer is correct
     */
    correctAnswer(choice) {
        return choice === this.answer;
    } 
}