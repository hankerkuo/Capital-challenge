import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

import AnswerRecord from 'src/components/AnswerRecord';
import RandomUtil from 'src/utils/RandomUtil';
import useTimer from 'src/hooks/useTimer';
import styles from 'src/styles/CapitalMainWidget.module.css'

import type { TQuestObj, TAnswerRecord } from 'src/types/TQuest';
import type { RefObject } from 'react';

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
        placeholder='YOUR ANSWER' id='capitalInput' 
        onChange={props.checkAnswer} 
        data-testid='answer-input' />
    </div>
  )
}

const Timer = ({timer}: {timer: number}) => {
  return (
    <div className={styles.bingoNotice} data-testid='timer'>
      {timer}
    </div>
  )
}

type TCapitalMainWidgetProps = {
  countries: { [country: string]: string };
}

//TODO: add feature for re-starting a game
const CapitalMainWidget = ({countries}: TCapitalMainWidgetProps) => {
  // current quest
  const [quest, setQuest] = useState<TQuestObj>({ country: '', capital: '' });
  // add answer record for tacking user input answer and time spent
  const [answerRecord, setAnswerRecord] = useState<TAnswerRecord>([]);
  // input ref to manipulate due to different game status
  const inputEle = useRef<HTMLInputElement>(null);
  // state for tracking each anwser's spent time (display on the screen)
  const { timer, resetTimer, startTimer, pauseTimer } = useTimer(10);
  // track the game start and end
  const [gameOngoing, setGameOngoing] = useState(false);
  // remaining quests
  const [remainQuest, setRemainQuest] = useState<{ [country: string]: string }>(countries);

  useEffect(() => {
    const randomQuestion = RandomUtil.getOneKeyValueFromObj(remainQuest);
    if (randomQuestion === null) {
      // disable button after all quests are done
      inputEle.current!.disabled = true;
      inputEle.current!.placeholder = 'FINISHED ALL QUESTS';
      setGameOngoing(false);
      pauseTimer();
    } else {
      setQuest({
        country: randomQuestion.key,
        capital: randomQuestion.value
      });
    }
  }, [remainQuest]);

  const checkAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    // initialize the game on first typing
    if (!gameOngoing) {
      startTimer();
      setGameOngoing(true);
    }
    const answerMatched =
      e.target.value.toLowerCase() === quest.capital.toLowerCase();
    if (answerMatched) {
      // add answered record
      const newRecord = [...answerRecord];
      newRecord.push({
        country: quest.country,
        capital: quest.capital,
        timeSpent: timer
      });
      setAnswerRecord(newRecord);

      // remove the answered one from the remain task
      const remain = { ...remainQuest };
      delete remain[quest.country];
      setRemainQuest(remain);

      // remove text from the input
      inputEle.current!.value = '';

      resetTimer();
    }
  }
  // const props = {inputEle, checkAnswer};
  return (
    <div className={styles.mainWidgetLayout}>
      <div>
        <QuestTitle quest={quest} />
        <AnswerInput {...{ inputEle, checkAnswer }} />
        <Timer timer={timer} />
      </div>
      <div>
        <AnswerRecord answerRecord={answerRecord} />
      </div>
    </div>
  )
}

export default CapitalMainWidget
export { QuestTitle, AnswerInput, Timer}