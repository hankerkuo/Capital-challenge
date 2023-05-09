import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SWRConfig } from 'swr';
import '@testing-library/jest-dom'
import 'isomorphic-fetch';

import CapitalMainWidget from './CapitalMainWidget'
import ResponseSingleton from '../mocks/ResponseSingleton'

jest.mock('next-auth/react');
import { useSession } from 'next-auth/react';

// mock the useSession hook in next auth
const mockUseSession = useSession as jest.Mock;
// return empty session, as /api/auth/session will return when not logged in
mockUseSession.mockReturnValue({});

afterEach(() => {
  // be sure the set singleton to return default response (1 country)
  // after each test
  const response = ResponseSingleton.getInstance();
  response.setCountryCapitalResponseToDefault();
});

test('Input is only enabled after pressing start button', async () => {
  const user = userEvent.setup();
  render(
    <CapitalMainWidget />
  );
  const startBtnEle: HTMLButtonElement = await screen.findByRole('button', { name: /Start Game/i });
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  expect(inputEle.disabled).toBeTruthy();
  await user.click(startBtnEle);
  expect(inputEle.disabled).toBeFalsy();
});

test('Capital main widget start timer while input', async () => {
  const user = userEvent.setup();
  // be sure to render with SWRConfig to remove cache
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <CapitalMainWidget />
    </SWRConfig>);
  const startBtnEle: HTMLButtonElement = await screen.findByRole('button', { name: /Start Game/i });
  expect(startBtnEle.textContent).toBe('Start Game');
  const inputEle = screen.getByTestId('answer-input');
  // simulate user input some text and timer is expected to start
  await user.type(inputEle, 'any text');
  expect(startBtnEle.textContent).not.toBe('0');
});

test('Show time spent in the table after answer the right answer', async () => {
  const user = userEvent.setup();
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <CapitalMainWidget />
    </SWRConfig>);
  // start the game
  const startBtnEle: HTMLButtonElement = await screen.findByRole('button', { name: /Start Game/i });
  await user.click(startBtnEle);
  const inputEle = screen.getByTestId('answer-input');
  // simulate user's typying time, delay between each character
  await userEvent.type(inputEle, 'Taipei', { delay: 50 });
  // check all the information has been shown in the table
  expect(screen.getByTestId('Taiwan-col1-record').textContent).toBe('Taiwan');
  expect(screen.getByTestId('Taiwan-col2-record').textContent).toBe('Taipei');
  expect(screen.getByTestId('Taiwan-col3-record').textContent).not.toBe('0');
});

test('Disable the input element after all the quests been answered', async () => {
  const user = userEvent.setup();
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <CapitalMainWidget />
    </SWRConfig>);
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  const startBtnEle: HTMLButtonElement = await screen.findByRole('button', { name: /Start Game/i });
  await user.click(startBtnEle);
  await userEvent.type(inputEle, 'Taipei', { delay: 10 });
  expect(inputEle.disabled).toBeTruthy();
});

test('Show the game end notification after all the quests been answered', async () => {
  const user = userEvent.setup();
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <CapitalMainWidget />
    </SWRConfig>);
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  const startBtnEle: HTMLButtonElement = await screen.findByRole('button', { name: /Start Game/i });
  await user.click(startBtnEle);
  await userEvent.type(inputEle, 'Taipei', { delay: 10 });
  const gameEndNotificationCloseBtn = await screen.findByRole('button', { name: /close/i });
  const gameEndNotificationParagraph = await screen.findByText('Game Completed and recorded!');
  expect(gameEndNotificationCloseBtn).toBeInTheDocument();
  expect(gameEndNotificationParagraph).toBeInTheDocument();
});

test('Show the next quest after input the right answer', async () => {
  const response = ResponseSingleton.getInstance();
  response.setCountryCapitalResponseToTwo();
  const user = userEvent.setup();
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <CapitalMainWidget />
    </SWRConfig>);
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  const questOptionEle: HTMLInputElement = screen.getByTestId('quest-option-target-quest-amount');
  const startBtnEle: HTMLButtonElement = await screen.findByRole('button', { name: /Start Game/i });

  await userEvent.type(questOptionEle, '2', { delay: 10 });
  await user.click(startBtnEle);
  const questTitle: HTMLElement | null = screen.queryByText('Taiwan');
  // the first quest will be either Taiwan or Japan
  // so next quest will be the other one
  if (questTitle) {
    await userEvent.type(inputEle, 'Taipei', { delay: 10 });
    // check next quest displayed
    expect(await screen.findByText(/Japan/)).toBeVisible();
  } else {
    await userEvent.type(inputEle, 'Tokyo', { delay: 10 });
    // check next quest displayed
    expect(await screen.findByText(/Taiwan/)).toBeVisible();
  }
});
// screen.logTestingPlaygroundURL();