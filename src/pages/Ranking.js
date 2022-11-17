import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { clearInfo } from '../Redux/actions';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const getStorage = localStorage.getItem('ranking');
    const getRanking = JSON.parse(getStorage);

    if (getRanking.length >= 1) {
      const rankingSorted = getRanking.sort((a, b) => b.score - a.score);
      this.setState({ ranking: rankingSorted });
    }
  }

  clearData = () => {
    const { history, dispatch } = this.props;
    dispatch(clearInfo());
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img src={ player.picture } alt="Gravatar Profile " />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.clearData }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ player }) => player;

export default connect(mapStateToProps)(Ranking);
