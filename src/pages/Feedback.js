import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearInfo } from '../Redux/actions';

class Feedback extends React.Component {
  clearData = () => {
    const { history, dispatch } = this.props;
    dispatch(clearInfo());
    history.push('/');
  };

  render() {
    const { name, assertions, score, gravatarEmail, history } = this.props;
    const threeAssertions = 3;
    const rankingData = { name, score, assertions, gravatarEmail };
    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([rankingData]));
    } else {
      localStorage.setItem(
        'ranking',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('ranking')),
          rankingData,
        ]),
      );
    }

    return (
      <>
        <Header />
        { assertions >= threeAssertions ? (
          <h1 data-testid="feedback-text">Well Done!</h1>)
          : (<h1 data-testid="feedback-text">Could be better...</h1>)}
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.clearData }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => player;

export default connect(mapStateToProps)(Feedback);
