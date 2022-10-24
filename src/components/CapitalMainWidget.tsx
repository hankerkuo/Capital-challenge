import { useState, useEffect, useRef } from 'react';
import type { ChangeEvent } from 'react';

import AnswerRecord from 'src/components/AnswerRecord';
import RandomUtil from 'src/utils/RandomUtil';
import styles from 'src/styles/CapitalMainWidget.module.css'

import type { TQuestObj, TAnswerRecord } from 'src/types/TQuest';

//TODO: replace by data in database
import Countries from 'src/dataMock/Countries';

const CapitalMainWidget = () => {
  const [quest, setQuest] = useState<TQuestObj>({ country: '', capital: '' });
  const [answerMatch, setAnswerMatch] = useState<boolean>(false);
  const [renewQuest, setRenewQuest] = useState<boolean>(true);
  // add answer record for tacking user input answer and time spent
  const [answerRecord, setAnswerRecord] = useState<TAnswerRecord>([]);
  // remaining quests
  const [remainQuest, setRemainQuest] = useState<{ [country: string]: string }>(Countries);
  // ref for input element
  const inputEle = useRef<HTMLInputElement>(null);
  //TODO: add ref for tracking each anwser's spent time

  useEffect(() => {
    const randomQuestion = RandomUtil.getOneKeyValueFromObj(remainQuest);
    if (randomQuestion === null) {
      // disable button
      inputEle.current!.disabled = true;
    } else {
      setQuest({
        country: randomQuestion.key,
        capital: randomQuestion.value
      });
    }
  }, [renewQuest]);

  const checkAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerMatch(false);
    if (e.target.value.toLowerCase() === quest.capital.toLowerCase()) {
      setAnswerMatch(true);
      setRenewQuest(!renewQuest);

      // add answered record
      const newRecord = [...answerRecord];
      newRecord.push({
        country: quest.country,
        capital: quest.capital,
        timeSpent: 0
      });
      setAnswerRecord(newRecord);

      // remove the answered one from the remain task
      const remain = { ...remainQuest };
      delete remain[quest.country];
      setRemainQuest(remain);

      // (document.getElementById('capitalInput') as HTMLInputElement).value = '';
      inputEle.current!.value = '';
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
          {answerMatch ? `Got it!` : ''}
        </div>
      </div>
      <div>
        <AnswerRecord answerRecord={answerRecord} />
      </div>
    </div>
  )
}

export default CapitalMainWidget