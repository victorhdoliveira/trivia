import { ASSERTIONS_INFO, LOGIN_INFO, SCORE_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_INFO:
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  case SCORE_INFO:
    return ({
      ...state,
      score: state.score + action.payload,
    });
  case ASSERTIONS_INFO:
    return ({
      ...state,
      assertions: state.assertions + action.payload,
    });
  default:
    return state;
  }
};

export default playerReducer;
