import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CapitalMainWidget, { QuestTitle } from 'src/components/CapitalMainWidget'
import type { TQuestObj } from 'src/types/TQuest';

import Countries from 'src/dataMock/Countries';

test('Quest title properly shows current quest', () => {
  const quest: TQuestObj = {
    country: 'Taiwan',
    capital: 'Taipei'
  }
  render(<QuestTitle quest={quest} />);
  expect(() => screen.getByText(/capital of: taiwan/i)).not.toThrowError();
  expect(() => screen.getByText(/capital of: japan/i)).toThrowError();
});

test('Capital main widget start timer while input', async () => {
  const user = userEvent.setup();
  render(<CapitalMainWidget countries={Countries} />);
  const timerEle = screen.getByTestId('start-btn-and-timer');
  expect(timerEle.textContent).toBe('Start Game');
  const inputEle = screen.getByTestId('answer-input');
  // simulate user input some text and timer is expected to start
  await userEvent.type(inputEle, 'any text');
  expect(timerEle.textContent).not.toBe('0');
});

test('Show time spent in the table after answer the right answer', async () => {
  const user = userEvent.setup();
  const singleCountry = {
    'Korea': 'Seoul'
  }
  render(<CapitalMainWidget countries={singleCountry} />);
  // start the game
  const startGameBtn: HTMLButtonElement = screen.getByTestId('start-btn-and-timer');
  await userEvent.click(startGameBtn);
  const inputEle = screen.getByTestId('answer-input');
  // simulate user's typying time, delay between each character
  await userEvent.type(inputEle, 'Seoul', { delay: 50 });
  // check all the information has been shown in the table
  expect(screen.getByTestId('Korea-col1-record').textContent).toBe('Korea');
  expect(screen.getByTestId('Korea-col2-record').textContent).toBe('Seoul');
  expect(screen.getByTestId('Korea-col3-record').textContent).not.toBe('0');
});

test('Disable the input element after all the quests been answered', async () => {
  const user = userEvent.setup();
  const singleCountry = {
    'Korea': 'Seoul'
  }
  render(<CapitalMainWidget countries={singleCountry} />);
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  expect(inputEle.disabled).toBeTruthy();
  const startGameBtn: HTMLButtonElement = screen.getByTestId('start-btn-and-timer');
  await userEvent.click(startGameBtn);
  expect(inputEle.disabled).toBeFalsy();
  await userEvent.type(inputEle, 'Seoul', { delay: 10 });
  expect(inputEle.disabled).toBeTruthy();
});

// screen.logTestingPlaygroundURL();