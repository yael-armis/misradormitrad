'use strict';

var Answer = React.createClass({
  render: function() {
    var classes = classNames({
      'answer': true,
      'answer-correct bg-success': this.props.isAnswerCorrect,
      'answer-incorrect bg-danger': !this.props.isAnswerCorrect
    });
    var img = "./img/" + this.props.question.img;
    var name = this.props.question.name;
    var url = this.props.question.url;
    var text = this.props.question.text;
    var type = this.props.question.type === IS_MISRAD ? 'Big Data' : 'Pokémon';

    return (
      <div className={classes}>
        <h1 className="answer-name">
            <a href={url} target="_blank">{name}</a> is {type}!
        </h1>
        <div className="answer-picture"><img src={img} alt={name} /></div>
        <div className="answer-text">{text}</div>
        <div className="answer-next">
          <button className="btn btn-lg btn-primary answer-button-next" onClick={this.props.nextQuestion}>Next question</button>
        </div>
      </div>
    )
  }
});

