import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CapitalMainWidget from './CapitalMainWidget'

import Countries from 'src/dataMock/Countries';
import { newCountries } from 'src/dataMock/Countries';

test('Input is only enabled after pressing start button', async() => {
  const user = userEvent.setup();
  render(<CapitalMainWidget countries={newCountries} />);
  const startBtnEle: HTMLButtonElement = screen.getByRole('button', {name: /Start Game/i});
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  expect(inputEle.disabled).toBeTruthy();
  await user.click(startBtnEle);
  expect(inputEle.disabled).toBeFalsy();
});

test('Capital main widget start timer while input', async () => {
  const user = userEvent.setup();
  render(<CapitalMainWidget countries={newCountries} />);
  const startBtnEle: HTMLButtonElement = screen.getByRole('button', {name: /Start Game/i});
  expect(startBtnEle.textContent).toBe('Start Game');
  const inputEle = screen.getByTestId('answer-input');
  // simulate user input some text and timer is expected to start
  await user.type(inputEle, 'any text');
  expect(startBtnEle.textContent).not.toBe('0');
});

test('Show time spent in the table after answer the right answer', async () => {
  const user = userEvent.setup();
  const singleCountry = [
    {
      country: 'Korea',
      capital: ['Seoul']
    }
  ]
  render(<CapitalMainWidget countries={singleCountry} />);
  // start the game
  const startBtnEle: HTMLButtonElement = screen.getByRole('button', {name: /Start Game/i});
  await user.click(startBtnEle);
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
  const singleCountry = [
    {
      country: 'Korea',
      capital: ['Seoul']
    }
  ]
  render(<CapitalMainWidget countries={singleCountry} />);
  const inputEle: HTMLInputElement = screen.getByTestId('answer-input');
  const startBtnEle: HTMLButtonElement = screen.getByRole('button', {name: /Start Game/i});
  await user.click(startBtnEle);
  await userEvent.type(inputEle, 'Seoul', { delay: 10 });
  expect(inputEle.disabled).toBeTruthy();
});

//TODO: test the popup notification
//TODO: test the "next quest" functionality when input the right answer
// screen.logTestingPlaygroundURL();