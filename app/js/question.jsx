'use strict';

var Question = React.createClass({
  selectMisradAnswer: function selectMisradAnswer() {
    this.props.selectAnswer(IS_MISRAD);
  },
  selectMitradAnswer: function selectMitradAnswer() {
    this.props.selectAnswer(IS_MITRAD);
  },
  render: function() {
    return (
      <div className="question">
        <h1 className="question-name">{this.props.question.name}</h1>
        <ul className="question-buttons">
          <li><button className="btn btn-lg btn-default question-button-misrad" onClick={this.selectMisradAnswer}>Big Data</button></li>
          <li><button className="btn btn-lg btn-default question-button-mitrad" onClick={this.selectMitradAnswer}>Pokemon</button></li>
        </ul>
      </div>
    )
  }
});

