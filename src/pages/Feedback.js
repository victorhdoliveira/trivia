import React from 'react';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <h1 data-testid="feedback-text">
          Feedback
        </h1>
        <Header />
      </>
    );
  }
}

export default Feedback;
