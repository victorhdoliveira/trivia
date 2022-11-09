import React from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      urlGravatar: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const emailUrl = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${emailUrl}`;
    this.setState({
      urlGravatar: url,
    });
  }

  render() {
    const { name } = this.props;
    const { urlGravatar } = this.state;
    return (
      <div>
        <img
          src={ urlGravatar }
          alt="gravatarImg"
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          Placar: 0
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ loginReducer: { name, email } }) => ({
  name,
  email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
