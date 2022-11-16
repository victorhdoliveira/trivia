import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux as render } from './helpers/renderWithRouterAndRedux';

describe('Ranking page tests', () => {
  it('Test if elements renders correctly', async () => {
    const { history } = render(<App />);

    act(() => {
      history.push('/ranking');
    });

    const homeBtn = screen.getByRole('button', { name: /inicio/i });
    expect(screen.getByRole('heading', { name: /ranking/i }))
      .toBeInTheDocument();
    expect(homeBtn)
      .toBeInTheDocument();
    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  });
});
