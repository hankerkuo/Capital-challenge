import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

import GameConfig from 'src/const/GameConfig';
import QuestAndHint from './QuestAndHint'
import type { TQuestObj } from 'src/types/TQuest';

test('Quest title properly shows current quest', () => {
  const quest: TQuestObj = {
    country: 'Taiwan',
    capital: ['Taipei']
  }
  // with blur effect
  render(<QuestAndHint quest={quest} timer={0} showBlur={true}/>);
  expect(screen.queryByText(/Taiwan:/i)).not.toBeInTheDocument();
  cleanup();
  // without blur effect
  render(<QuestAndHint quest={quest} timer={0} showBlur={false}/>);
  expect(screen.queryByText(/Taiwan:/i)).toBeInTheDocument();
  expect(screen.queryByText(/Japan:/i)).not.toBeInTheDocument();
});

test('Hint shows after specified period', () => {
  const quest: TQuestObj = {
    country: 'Taiwan',
    capital: ['Taipei']
  }
  // timer smaller than SECOND_PASSED_TO_GIVE_HINT
  render(<QuestAndHint quest={quest} timer={0} showBlur={false}/>);
  expect(screen.queryByText(/Taipei:/i)).not.toBeInTheDocument();
  cleanup();
  // after timing to show all the hints
  const timer = GameConfig.SECOND_PASSED_TO_GIVE_HINT + GameConfig.INTERVAL_TO_GIVE_HINT * 6;
  render(<QuestAndHint quest={quest} timer={timer} showBlur={false}/>);
  const hintEle = screen.queryAllByText(/^.$/);
  // check hint shows up (p tag with single text)
  expect(hintEle.length).toBeGreaterThan(0);
  hintEle.forEach(ele => {
    expect(ele.tagName).toBe('P');
  });
});