import { render, screen } from '@testing-library/react'

import QuestAndHint from './QuestAndHint'
import type { TQuestObj } from 'src/types/TQuest';

test('Quest title properly shows current quest', () => {
  const quest: TQuestObj = {
    country: 'Taiwan',
    capital: 'Taipei'
  }
  render(<QuestAndHint quest={quest} timer={0} />);
  expect(() => screen.getByText(/Taiwan:/i)).not.toThrowError();
  expect(() => screen.getByText(/Japan:/i)).toThrowError();
});

//TODO: test the hint functionality