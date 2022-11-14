export const LOGIN_INFO = 'LOGIN_INFO';
export const SCORE_INFO = 'SCORE_INFO';

export const loginInfo = (payload) => ({
  type: LOGIN_INFO,
  payload,
});

export const scoreInfo = (payload) => ({
  type: SCORE_INFO,
  payload,
});
