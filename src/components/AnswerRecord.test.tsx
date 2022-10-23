import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import AnswerRecord from 'src/components/AnswerRecord'

test('display answer record on table properly', () => {

  const answerRecord = [
    {
      country: 'Taiwan',
      capital: 'Taipei'
    },
    {
      country: 'Japan',
      capital: 'Tokyo'
    },
  ];

  // ARRANGE
  render(<AnswerRecord answerRecord={answerRecord} />);

  // ACT
  screen.findByRole('heading');
  screen.debug();

  // call thrid-party service to debug
  screen.logTestingPlaygroundURL();
  
  // ASSERT
  // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
  // expect(screen.getByRole('button')).toBeDisabled();
})