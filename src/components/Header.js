import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      urlGravatar: '',
    };
  }

  componentDidMount() {
    const { gravatarEmail } = this.props;
    const emailUrl = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${emailUrl}`;
    this.setState({
      urlGravatar: url,
    });
  }

  render() {
    const { name, score } = this.props;
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
          { score }
        </span>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, gravatarEmail, score } }) => ({
  name,
  gravatarEmail,
  score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
