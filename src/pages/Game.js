import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      triviaInfo: {},
      changeQuestion: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    const url = `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`;
    const require = await fetch(url);
    const result = await require.json();
    if (result.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      return history.push('/');
    } this.setState({
      triviaInfo: result.results,
      loading: true,
    });
  }

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
    const { triviaInfo, changeQuestion, loading } = this.state;
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
                key={ index }
                type="button"
                data-testid="correct-answer"
              >
                {answers}
              </button>)
              : (
                <button
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
