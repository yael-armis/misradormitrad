'use strict';

var APP_STATES = {
  LOADING: 1,
  QUESTION: 2,
  ANSWER: 3,
  FINISHED: 4
};

var IS_MITRAD=0;
var IS_MISRAD=1;

var App = React.createClass({
  getInitialState: function() {
    // Load question data from the server
    var self = this;
    $.get('./questions.json', function(questions) {
      questions = _.shuffle(questions);
      self.setState({
        currentState: APP_STATES.QUESTION,
        questionList: questions,
        currentQuestion: questions[0]
      });
    });

    return {
      currentState: APP_STATES.LOADING,
      currentQuestionIndex: 0,
      currentQuestion: null,
      questionList: [],
      correctAnswers: 0,
      isLastAnswerCorrect: null
    };
  },

  selectAnswer: function selectAnswer(answerType) {
    var isCorrect = this.state.currentQuestion.type === answerType;

    var correctAnswers = this.state.correctAnswers;
    if (isCorrect) {
      correctAnswers++;
    }

    this.setState({
      currentState: APP_STATES.ANSWER,
      correctAnswers: correctAnswers,
      isLastAnswerCorrect: isCorrect
    });
  },

  nextQuestion: function nextQuestion() {
    var newIndex = this.state.currentQuestionIndex+1;

    // End of the game
    if (newIndex === this.state.questionList.length) {
      this.setState({
        currentState: APP_STATES.FINISHED
      });
      return;
    }

    this.setState({
      currentState: APP_STATES.QUESTION,
      currentQuestionIndex: newIndex,
      currentQuestion: this.state.questionList[newIndex]
    });
  },

  render: function() {
    switch (this.state.currentState) {
      case APP_STATES.LOADING:
        return <SplashScreen/>
      case APP_STATES.QUESTION:
        return <Question selectAnswer={this.selectAnswer} question={this.state.currentQuestion} />
      case APP_STATES.ANSWER:
        return <Answer nextQuestion={this.nextQuestion} question={this.state.currentQuestion} isAnswerCorrect={this.state.isLastAnswerCorrect} />
      case APP_STATES.FINISHED:
        return <EndScreen correctAnswers={this.state.correctAnswers} questionList={this.state.questionList} />
    }
  }
});

React.render(
  <App />,
  document.getElementById('body')
);

