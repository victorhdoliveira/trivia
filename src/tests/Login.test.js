import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Login Screen tests', () => {
  it('Render correctly inputs amount', () => {
    renderWithRouterAndRedux(<App />);
    const testTarget = screen.getAllByRole('textbox');
    expect(testTarget.length).toEqual(2);
  });

  it('Renders Play and Settings buttons', () => {
    renderWithRouterAndRedux(<App />);
    const btnPlay = screen.getByRole('button', {
      name: /play/i,
    });
    const btnSettings = screen.getByRole('button', { name: /config/i });
    expect(btnPlay).toBeDisabled();
    expect(btnPlay).toBeInTheDocument();
    expect(btnSettings).toBeInTheDocument();
  });

  it('Refresh correctly component state after typing', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const testTarget1 = screen.getByTestId('input-player-name');
    const testTarget2 = screen.getByTestId('input-gravatar-email');
    userEvent.type(testTarget1, 'name');
    userEvent.type(testTarget2, 'email@email.com');
    const playBtn = screen.getByRole('button', {
      name: /play/i,
    });
    expect(playBtn).not.toBeDisabled();
    userEvent.click(playBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/game'));
  });

  it('Config button renders correctly', async () => {
    const { getByRole, history } = renderWithRouterAndRedux(<App />);
    const configBtn = getByRole('button', { name: /config/i });
    expect(configBtn).toBeInTheDocument();
    userEvent.click(configBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/settings'));
  });
});
