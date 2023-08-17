import { Question } from "./Question.js";

export class Quiz {
  /**
   * @param {number} questionIndex number question of quiz
   */
  questionIndex = 0;
  /**
   * @param {number} score score of quiz
   */
  score = 0;

  /**
   *
   * @param {Question[]} questions
   */
  constructor(questions) {
    this.questions = questions;
  }

  /**
   *
   * @returns {Question} the question found
   */
  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  isEnded() {
    return this.questions.length === this.questionIndex;
  }

  /**
   *
   * @param {string} answer some text
   */
  guess(answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }
}