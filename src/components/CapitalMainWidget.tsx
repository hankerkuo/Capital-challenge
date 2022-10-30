import { useEffect, useRef, useReducer } from 'react';
import type { ChangeEvent, RefObject } from 'react';

import AnswerRecord from 'src/components/AnswerRecord';
import useTimer from 'src/hooks/useTimer';
import QuestStateReducer from 'src/reducer/QuestStateReducer';
import { QuestActionType } from 'src/reducer/QuestStateReducer';
import type { TQuestObj } from 'src/types/TQuest';

import styles from 'src/styles/CapitalMainWidget.module.css'

const QuestTitle = ({ quest }: { quest: TQuestObj }) => {
  return (
    <div className={`${styles.countryTitle} ${styles.countryTitleLyt}`}>
      Capital of: {quest.country}
    </div>
  )
}

const AnswerInput = (
  props:
    {
      inputEle: RefObject<HTMLInputElement>,
      checkAnswer: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
  return (
    <div className={`${styles.inputLyt}`}>
      <input className={`${styles.capitalInput} ${styles.capitalInputLyt}`}
        ref={props.inputEle} autoComplete='off'
        placeholder='WAIT FOR GAME START' id='capitalInput'
        disabled
        onChange={props.checkAnswer}
        data-testid='answer-input' />
    </div>
  )
}

const Timer = ({ timer }: { timer: number }) => {
  return (
    <div className={styles.bingoNotice} data-testid='timer'>
      {timer}
    </div>
  )
}

type TCapitalMainWidgetProps = {
  countries: { [country: string]: string };
}

//TODO: add feature for giving hint to user time-by-time
const CapitalMainWidget = ({ countries }: TCapitalMainWidgetProps) => {
  // input ref to manipulate due to different game status
  const inputEle = useRef<HTMLInputElement>(null);
  // state for tracking each anwser's spent time (display on the screen)
  const { timer, startTimer, resetTimer, setPause } = useTimer(10);
  // main state for maintaining quest feature
  const [questState, gameUpdate] = useReducer(QuestStateReducer, {
    quest: { country: '', capital: '' },
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
    const answerMatched =
      e.target.value.toLowerCase() === questState.quest.capital.toLowerCase();
    if (answerMatched) {
      gameUpdate({ type: QuestActionType.ANSWER_MATCHED, ...actions });
    }
  }

  return (
    <div className={styles.mainWidgetLyt}>
      <div className={styles.leftRegionLyt}>
        <QuestTitle quest={questState.quest} />
        <AnswerInput {...{ inputEle, checkAnswer }} />
        <button data-testid='start-btn-and-timer'
          className={`${styles.newGameButtonLyt} ${styles.newGameButton}`}
          onClick={startNewGame}>
          {questState.gameOngoing ? timer : 'Start Game'}
        </button>
      </div>
      <div className={`${styles.rightRegionLyt} ${styles.rightRegion}`}>
        <AnswerRecord answerRecord={questState.answerRecord} />
      </div>
    </div>
  )
}

export default CapitalMainWidget
export { QuestTitle, AnswerInput, Timer }