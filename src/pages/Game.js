import PropTypes, { element } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { scoreInfo } from '../Redux/actions/index';
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
      timer: 30,
      answersOptions: [],
      difficulty: '',
    };
  }

  async componentDidMount() {
    const { changeQuestion } = this.state;
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
      answersOptions: [result.results[changeQuestion].correct_answer,
        ...result.results[changeQuestion].incorrect_answers],
    }, () => this.shuffleArrayy());
  }

  componentDidUpdate() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(element.id);
    }
  }

  questionCheck = ({ target: { id } }) => {
    this.setState({ clicked: true });
    const { dispatch } = this.props;
    const { timer, difficulty } = this.state;
    const constant = 10;
    const easyValue = 1;
    const mediumValue = 2;
    const hardValue = 3;
    if (id === 'correct-answer') {
      if (difficulty === 'easy') {
        dispatch(scoreInfo(constant + (timer * easyValue)));
      } else if (difficulty === 'medium') {
        dispatch(scoreInfo(constant + (timer * mediumValue)));
      } else {
        dispatch(scoreInfo(constant + (timer * hardValue)));
      }
    }
  };

  expiredQuestion = () => {
    const { timer } = this.state;
    const oneSecond = 1000;
    if (timer !== 0) {
      element.id = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }, oneSecond);
    }
  };

  // https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  shuffleArrayy() {
    // Loop em todos os elementos
    const answersOptions = this.state;
    const arr = answersOptions.answersOptions;
    for (let i = arr.length - 1; i > 0; i -= 1) {
    // Escolhendo elemento aleatório
      const j = Math.floor(Math.random() * (i + 1));
      // Reposicionando elemento
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    // Retornando array com aleatoriedade
    this.setState({ answersOptions: arr });
  }

  render() {
    const { triviaInfo, changeQuestion, loading, clicked,
      disabled, timer, answersOptions } = this.state;

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
    //   && { border: '3px solid red' }; testes de condicional

    if (loading === false) {
      return <span>loading</span>;
    }
    // console.log(triviaInfo);
    const { category, question } = triviaInfo[changeQuestion];
    const correctAnswer = triviaInfo[changeQuestion].correct_answer;
    // const incorrectAnswers = triviaInfo[changeQuestion].incorrect_answers;
    // console.log(correctAnswer);
    // const answer = [correctAnswer, ...incorrectAnswers];

    // função que embaralha o array que recebe por argumento.

    // console.log(answer);
    // console.log(incorrect_answers);
    // console.log(correct_answer);
    return (
      <div>
        <Header />
        <h2>{ timer }</h2>
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
          { answersOptions.map((answers, index) => (
            answers === correctAnswer ? (
              <button
                disabled={ timer === 0 }
                style={ correctStyle }
                onClick={ this.questionCheck }
                className="answer"
                id="correct-answer"
                key={ index }
                type="button"
                data-testid="correct-answer"
              >
                { answers }
              </button>)
              : (
                <button
                  disabled={ timer === 0 }
                  onClick={ this.questionCheck }
                  style={ wrongStyle }
                  className="answer"
                  id="wrong-answer"
                  key={ index }
                  type="button"
                  data-testid={ `"wrong-answer-${index}"` }
                >
                  { answers }
                </button>)
          )) }
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
