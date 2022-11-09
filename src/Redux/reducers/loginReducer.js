import { LOGIN_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_INFO:
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    });
  default:
    return state;
  }
};

export default loginReducer;
