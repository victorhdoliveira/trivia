import React from 'react';
import { screen } from '@testing-library/react';
/* import userEvent from '@testing-library/user-event'; */
import { renderWithRouterAndRedux as render } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testing Feedback Page', () => {
  it('Renders correctly all elements on page', async () => {
    const { store } = render(
      <App />,
      {
        initialState: {
          player: {
            name: 'playerName',
            assertions: 5,
            score: 1000,
            gravatarEmail: 'test@test.com',
          },
        },
        initialEntries: (['/feedback']) },
    );

    expect(store.getState().player.name).toEqual('playerName');
    expect(await screen.getByRole('heading', { name: /well done!/i })).toBeInTheDocument();
  });
});
