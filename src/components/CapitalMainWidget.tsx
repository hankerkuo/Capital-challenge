import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

import AnswerRecord from 'src/components/AnswerRecord';
import RandomUtil from 'src/utils/RandomUtil';
import useTimer from 'src/hooks/useTimer';
import styles from 'src/styles/CapitalMainWidget.module.css'

import type { TQuestObj, TAnswerRecord } from 'src/types/TQuest';

//TODO: replace by data in database
import Countries from 'src/dataMock/Countries';

const CapitalMainWidget = () => {
  const [quest, setQuest] = useState<TQuestObj>({ country: '', capital: '' });
  // add answer record for tacking user input answer and time spent
  const [answerRecord, setAnswerRecord] = useState<TAnswerRecord>([]);
  // remaining quests
  const inputEle = useRef<HTMLInputElement>(null);
  // state for tracking each anwser's spent time (display on the screen)
  const {timer, resetTimer, startTimer, pauseTimer} = useTimer(10);
  // track the game start and end
  const [gameOngoing, setGameOngoing] = useState(false);
  // input ref to manipulate due to different game status
  const [remainQuest, setRemainQuest] = useState<{ [country: string]: string }>(Countries);

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
    if(!gameOngoing) {
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

  return (
    <div className={styles.mainWidgetLayout}>
      <div>
        <div className={`${styles.countryTitle} ${styles.countryTitleLyt}`}>
          Capital of: {quest.country}
        </div>
        <div className={`${styles.inputLyt}`}>
          <input className={`${styles.capitalInput} ${styles.capitalInputLyt}`}
            ref={inputEle} autoComplete='off'
            placeholder='YOUR ANSWER' id='capitalInput' onChange={checkAnswer} />
        </div>
        <div className={styles.bingoNotice}>
          {timer}
        </div>
      </div>
      <div>
        <AnswerRecord answerRecord={answerRecord} />
      </div>
    </div>
  )
}

export default CapitalMainWidget