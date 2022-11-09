import React from 'react';

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

  render() {
    const { name, email } = this.state;

    const acceptablePassword = 1;
    const passwordValidation = name.length > acceptablePassword;
    const emailValidation = email
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const enable = emailValidation && passwordValidation;

    return (
      <div>
        <input
          name="email"
          onChange={ this.handleChange }
          type="email"
          data-testid="input-gravatar-email"
        />

        <input
          name="name"
          onChange={ this.handleChange }
          type="text"
          data-testid="input-player-name"
        />

        <button
          disabled={ !enable }
          type="submit"
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
