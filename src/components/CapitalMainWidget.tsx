import { useEffect, useRef, useReducer, useState } from 'react';
import type { ChangeEvent } from 'react';

import QuestAndHint from 'src/components/answerForm/QuestAndHint';
import AnswerInput from 'src/components/answerForm/AnswerInput';
import StartButton from 'src/components/answerForm/StartButton';
import AnswerRecord from 'src/components/dashboard/AnswerRecord';
import PopupNotification from './notification/PopupNotification';

import useTimer from 'src/hooks/useTimer';
import QuestStateReducer from 'src/reducer/QuestStateReducer';
import { QuestActionType } from 'src/reducer/QuestStateReducer';

import styles from 'src/styles/components/CapitalMainWidget.module.css'

type TCapitalMainWidgetProps = {
  countries: { [country: string]: string[] };
}

const CapitalMainWidget = ({ countries }: TCapitalMainWidgetProps) => {
  // input ref to manipulate due to different game status
  const inputEle = useRef<HTMLInputElement>(null);
  // state for tracking each anwser's spent time (display on the screen)
  const { timer, startTimer, resetTimer, setPause } = useTimer(10);
  // show game ends notification
  const [notifyGameEnd, setNotifyGameEnd] = useState<boolean>(true);
  // main state for maintaining quest feature
  const [questState, gameUpdate] = useReducer(QuestStateReducer, {
    quest: { country: '', capital: [''] },
    answerRecord: [],
    gameOngoing: false,
    remainQuest: countries
  });

  const actions = {
    countries,
    inputEle,
    timer,
    startTimer,
    resetTimer,
    setPause
  }

  useEffect(() => {
    if (Object.keys(questState.remainQuest).length > 0) {
      gameUpdate({ type: QuestActionType.NEXT_QUEST, ...actions });
    } else {
      gameUpdate({ type: QuestActionType.QUEST_END, ...actions });
      setNotifyGameEnd((prev) => !prev);
    }
  }, [questState.remainQuest]);

  const startNewGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.textContent = 'Game started';
    gameUpdate({ type: QuestActionType.START, ...actions });
  }

  const checkAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    // initialize the game on first typing
    if (!questState.gameOngoing) {
      gameUpdate({ type: QuestActionType.TYPE_TO_START, ...actions });
    }
    let answerMatched = false;
    questState.quest.capital.forEach(capitalName => {
      if (e.target.value.toLowerCase() === capitalName.toLowerCase()) {
        answerMatched = true;
      }
    });
    if (answerMatched) {
      gameUpdate({ type: QuestActionType.ANSWER_MATCHED, ...actions });
    }
  }

  return (
    <div className={styles.mainWidgetLyt}>
      <div className={styles.leftRegionLyt}>
        <QuestAndHint quest={questState.quest} timer={timer} />
        <AnswerInput {...{ inputEle, checkAnswer }} />
        <StartButton {...{ questState, startNewGame, timer }} />
      </div>
      <div className={`${styles.rightRegionLyt} ${styles.rightRegion}`}>
        <AnswerRecord answerRecord={questState.answerRecord} />
      </div>
      <div>
        <PopupNotification renewSignal={notifyGameEnd} text={'Game Completed and recorded!'}/>
      </div>
    </div>
  )
}

export default CapitalMainWidget