import { useRef, useReducer, useState } from 'react';
import type { ChangeEvent } from 'react';

import QuestAndHint from 'src/components/answerForm/QuestAndHint';
import AnswerInput from 'src/components/answerForm/AnswerInput';
import QuestOption from './answerForm/QuestOption';
import StartButton from 'src/components/answerForm/StartButton';
import AnswerRecord from 'src/components/dashboard/AnswerRecord';
import PopupNotification from 'src/components/notification/PopupNotification';

import useTimer from 'src/hooks/useTimer';
import useQuestfetch from 'src/hooks/useQuestfetch';
import QuestStateReducer from 'src/reducer/QuestStateReducer';
import { QuestActionEnum } from 'src/reducer/QuestStateReducer';

import styles from 'src/styles/components/CapitalMainWidget.module.css'

const CapitalMainWidget = () => {
  // quest amount state
  const [questAmount, setQuestAmount] = useState<number>(1);
  // quest data fetch
  const { quests, isLoading, isError, refetch } = useQuestfetch(questAmount);
  // input ref to manipulate due to different game status
  const inputEle = useRef<HTMLInputElement>(null);
  // state for tracking each anwser's spent time (display on the screen)
  const { timer, startTimer, stopTimer } = useTimer(10);
  // show game ends notification
  const [notifyGameEnd, setNotifyGameEnd] = useState<boolean>(true);
  // main state for maintaining quest feature
  const [questState, gameUpdate] = useReducer(QuestStateReducer, {
    quest: { country: '', capital: [''] },
    answerRecord: [],
    gameOngoing: false,
    remainQuest: []
  });

  const actions = {
    quests: quests ? quests: [],
    inputEle,
    timer,
    startTimer,
    stopTimer
  }

  const startNewGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.textContent = 'Game started';
    gameUpdate({ type: QuestActionEnum.START, ...actions });
  }

  const checkAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    // initialize the game on first typing
    if (!questState.gameOngoing) {
      gameUpdate({ type: QuestActionEnum.TYPE_TO_START, ...actions });
    }
    let answerMatched = false;
    questState.quest.capital.forEach(capitalName => {
      if (e.target.value.toLowerCase() === capitalName.toLowerCase()) {
        answerMatched = true;
      }
    });
    if (answerMatched) {
      gameUpdate({ type: QuestActionEnum.ANSWER_MATCHED, ...actions });
      // the quest amount state will be updated in the next render
      // here need to get the REAL remaining quests by minus 1
      if (Object.keys(questState.remainQuest).length - 1 > 0) {
        gameUpdate({ type: QuestActionEnum.NEXT_QUEST, ...actions });
      } else {
        console.log('ended');
        gameUpdate({ type: QuestActionEnum.QUEST_END, ...actions });
        setNotifyGameEnd((prev) => !prev);
      }
    }
  }


  return (
    <div className={`${styles.mainWidgetLyt} ${styles.mainWidget}`}>
      {/* {isLoading && <div>loading</div>} */}
      {isError && <div>Error fetching data</div>}
      <div className={styles.leftRegionLyt}>
        <QuestAndHint quest={questState.quest} 
          timer={timer} showBlur={Object.keys(questState.remainQuest).length === 0}/>
        <AnswerInput {...{ inputEle, checkAnswer }} />
        {/* TODO: re-fetch data on start button */}
        <div className={`${styles.buttonContainerLyt}`}>
          <QuestOption setTargetQuestAmount={setQuestAmount} />
          <StartButton {...{ questState, startNewGame, timer, pending: isLoading}} />
        </div>
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