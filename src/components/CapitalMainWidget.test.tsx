import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import CapitalMainWidget, { QuestTitle } from 'src/components/CapitalMainWidget'
import type { TQuestObj, TAnswerRecord } from 'src/types/TQuest';

import Countries from 'src/dataMock/Countries';

test('Quest title properly shows current quest', () => {
  const quest: TQuestObj = {
    country: 'Taiwan',
    capital: 'Taipei'
  }
  render(<QuestTitle quest={quest}/>);
  expect(() => screen.getByText(/capital of: taiwan/i)).not.toThrowError();
  expect(() => screen.getByText(/capital of: japan/i)).toThrowError();
});

test('Capital main widget start timer while input', async() => {
  const user = userEvent.setup();
  render(<CapitalMainWidget countries={Countries}/>);
  const timerEle = screen.getByTestId('timer');
  expect(timerEle.textContent).toBe('0');
  const inputEle = screen.getByTestId('answer-input');
  // simulate user input some text and timer is expected to start
  await userEvent.type(inputEle, 'any text');
  expect(timerEle.textContent).not.toBe('0');
});

// screen.logTestingPlaygroundURL();