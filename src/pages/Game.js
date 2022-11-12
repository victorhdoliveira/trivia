import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Games.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      triviaInfo: {},
      changeQuestion: 0,
      loading: false,
      clicked: false,
      disabled: false,
    };
  }

  async componentDidMount() {
    const url = `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`;
    const require = await fetch(url);
    const result = await require.json();
    this.expiredQuestion();
    if (result.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      return history.push('/');
    } this.setState({
      triviaInfo: result.results,
      loading: true,
    });
  }

  questionCheck = () => {
    this.setState({ clicked: true });
  };

  expiredQuestion = () => {
    const seconds = 30000;
    setTimeout(() => { this.setState({ disabled: true }); }, seconds);
  };

  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArrayy(arr) {
    // Loop em todos os elementos
    for (let i = arr.length - 1; i > 0; i -= 1) {
      // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    return arr;
  }

  render() {
    const { triviaInfo, changeQuestion, loading, clicked, disabled } = this.state;

    let correctStyle = {};
    let wrongStyle = {};
    if (clicked || disabled) {
      correctStyle = {
        border: '3px solid rgb(6, 240, 15)',
      };
    }
    if (clicked || disabled) {
      wrongStyle = {
        border: '3px solid red',
      };
    }

    // const incorrectStyle = (clicked || disabled)
    //   && { border: '3px solid red' };

    if (loading === false) {
      return <span>loading</span>;
    }
    // console.log(triviaInfo);
    const { category, question } = triviaInfo[changeQuestion];
    const correctAnswer = triviaInfo[changeQuestion].correct_answer;
    const incorrectAnswers = triviaInfo[changeQuestion].incorrect_answers;
    // console.log(correctAnswer);
    const answer = [correctAnswer, ...incorrectAnswers];
    // função que embaralha o array que recebe por argumento.

    // console.log(answer);
    // console.log(incorrect_answers);
    // console.log(correct_answer);
    return (
      <div>
        <Header />
        <p
          data-testid="question-category"
        >
          {category}
        </p>
        <p
          data-testid="question-text"
        >
          {question}
        </p>
        <section
          data-testid="answer-options"
        >
          { this.shuffleArrayy(answer).map((answers, index) => (
            answers === correctAnswer ? (
              <button
                disabled={ disabled }
                style={ correctStyle }
                onClick={ this.questionCheck }
                className="answer"
                key={ index }
                type="button"
                data-testid="correct-answer"
              >
                {answers}
              </button>)
              : (
                <button
                  disabled={ disabled }
                  onClick={ this.questionCheck }
                  style={ wrongStyle }
                  className="answer"
                  key={ index }
                  type="button"
                  data-testid={ `"wrong-answer-${index}"` }
                >
                  {answers}
                </button>)
          )) }
        </section>
        <p>game</p>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
