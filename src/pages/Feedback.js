import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    const threeAssertions = 3;
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
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ player }) => player;

export default connect(mapStateToProps)(Feedback);
