import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import AnswerRecord from './AnswerRecord'

test('display answer record on table properly', () => {

  const answerRecord = [
    {
      country: 'Taiwan',
      capital: ['Taipei'],
      timeSpent: 200
    },
    {
      country: 'Japan',
      capital: ['Tokyo'],
      timeSpent: 300
    },
  ];

  // RENDER target
  render(<AnswerRecord answerRecord={answerRecord} />);
  
  // check table label is present
  const tableLabel1 = screen.queryByText(/country/i);
  expect(tableLabel1).not.toBeNull();
  const tableLabel2 = screen.queryByText(/Capital/i);
  expect(tableLabel2).not.toBeNull();
  const tableLabel3 = screen.queryByText(/Speed/i);
  expect(tableLabel3).not.toBeNull();
  
  // check each record in the list has been displayed on the screen
  answerRecord.forEach(ele => {
    let countryToCheck = screen.queryByText(ele.country);
    expect(countryToCheck).not.toBeNull();
    let capitalToCheck = screen.queryByText(ele.capital[0]);
    expect(capitalToCheck).not.toBeNull();
    let timeSpentToCheck = screen.queryByText(ele.timeSpent.toString());
    expect(timeSpentToCheck).not.toBeNull();
  });
})