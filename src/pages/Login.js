import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginInfo } from '../Redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onClickBtn = async () => {
    const url = 'https://opentdb.com/api_token.php?command=request';
    const require = await fetch(url);
    const result = await require.json();
    localStorage.setItem('token', result.token);
    const { history, dispatch } = this.props;
    dispatch(loginInfo(this.state));
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;

    const acceptablePassword = 1;
    const passwordValidation = name.length > acceptablePassword;
    const emailValidation = email
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const enable = emailValidation && passwordValidation;

    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            onChange={ this.handleChange }
            type="email"
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="name">
          name:
          <input
            name="name"
            onChange={ this.handleChange }
            type="text"
            data-testid="input-player-name"
          />
        </label>
        <button
          onClick={ this.onClickBtn }
          disabled={ !enable }
          type="submit"
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          type="submit"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          config
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

/* const mapStateToProps = ({ loginReducer: { name, email } }) => ({
  name,
  email,
}); */

export default connect(/* mapStateToProps */)(Login);
