import { useEffect, useRef, useReducer } from 'react';
import type { ChangeEvent, RefObject, 
  Reducer, Dispatch, SetStateAction } from 'react';

import AnswerRecord from 'src/components/AnswerRecord';
import RandomUtil from 'src/utils/RandomUtil';
import useTimer from 'src/hooks/useTimer';
import styles from 'src/styles/CapitalMainWidget.module.css'
import type { TQuestObj, TAnswerRecord } from 'src/types/TQuest';

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

type TQuestState = {
  // current quest
  quest: TQuestObj;
  // answer record for tracking user input answer and time spent
  answerRecord: TAnswerRecord;
  // track the game start and end
  gameOngoing: boolean;
  // for extracting next quest
  remainQuest: { [country: string]: string };
}

enum QuestActionType {
  START,
  ANSWER_MATCHED,
  QUEST_END,
  NEXT_QUEST,
  TYPE_TO_START,
}

type TQuestAction = {
  type: QuestActionType;
  countries: { [country: string]: string };
  inputEle: RefObject<HTMLInputElement>;
  timer: number;
  startTimer: () => void;
  resetTimer: () => void;
  setPause: Dispatch<SetStateAction<boolean>>;
}

const reducer: Reducer<TQuestState, TQuestAction> = (state, action) => {
  switch (action.type) {
    case QuestActionType.START:
      action.inputEle.current!.disabled = false;
      action.inputEle.current!.placeholder = 'TYPE YOUR ANSWER';
      return { ...state, remainQuest: action.countries, answerRecord: [] };
    case QuestActionType.ANSWER_MATCHED:
      // add answered record
      const newRecord = [...state.answerRecord];
      newRecord.push({
        country: state.quest.country,
        capital: state.quest.capital,
        timeSpent: action.timer
      });
      // remove the answered one from the remain task
      const newRemain = { ...state.remainQuest };
      delete newRemain[state.quest.country];
      // remove text from the input
      action.inputEle.current!.value = '';
      action.resetTimer();
      return { ...state, answerRecord: newRecord, remainQuest: newRemain };
    case QuestActionType.QUEST_END:
      // disable button after all quests are done
      action.inputEle.current!.disabled = true;
      action.inputEle.current!.placeholder = 'FINISHED ALL QUESTS';
      action.setPause(true);
      return { ...state, gameOngoing: false };
    case QuestActionType.NEXT_QUEST:
      const randomQuestion = RandomUtil.getOneKeyValueFromObj(state.remainQuest);
      return {
        ...state, quest: {
          country: randomQuestion!.key,
          capital: randomQuestion!.value
        }
      };
    case QuestActionType.TYPE_TO_START:
      action.startTimer();
      return { ...state, gameOngoing: true };
    // default return is important for Reducer type checking,
    // or switch case has chance to return 'undefined'
    default:
      throw new Error();
  }
}

//TODO: add feature for giving hint to user time-by-time
const CapitalMainWidget = ({ countries }: TCapitalMainWidgetProps) => {
  // input ref to manipulate due to different game status
  const inputEle = useRef<HTMLInputElement>(null);
  // state for tracking each anwser's spent time (display on the screen)
  const { timer, startTimer, resetTimer, setPause } = useTimer(10);
  // main state for maintaining quest feature
  const [questState, gameUpdate] = useReducer(reducer, {
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