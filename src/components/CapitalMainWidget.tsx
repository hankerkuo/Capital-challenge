import { useState, useEffect } from 'react';
import RandomUtil from 'src/utils/RandomUtil';
import styles from 'src/styles/CapitalMainWidget.module.css'

import type { Dispatch, SetStateAction, ChangeEvent } from 'react';

//TODO: replace by data in database
import Countries from 'src/dataMock/Countries';

type QuestObj = {
  country: string;
  capital: string
}

const CapitalMainWidget = () => {
  const [quest, setQuest]: [QuestObj, Dispatch<SetStateAction<QuestObj>>] = useState({country: '', capital: ''});
  const [answerMatch, setAnswerMatch]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [renewQuest, setRenewQuest] = useState(true);
  //TODO: add answer record for tacking user input answer and time spent, can pass to AnswerRecord.tsx

  useEffect(() => {
    //TODO: fix to be sure not to choose the pervious problem
    const randomQuestion = RandomUtil.getOneKeyValueFromObj(Countries);
    setQuest({
      country: randomQuestion.key,
      capital: randomQuestion.value
    });
  }, [renewQuest]);

  const checkAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerMatch(false);
    if(e.target.value.toLowerCase() === quest.capital.toLowerCase()) {
      setAnswerMatch(true);
      setRenewQuest(!renewQuest);
      (document.getElementById('capitalInput') as HTMLInputElement).value = '';
    }
  }

  return (
    <div>
      <div className={styles.countryTitle}>
        Capital of: {quest.country}
      </div>
      <div>
        <input className={styles.capitalInput} autoComplete='off'
          placeholder='YOUR ANSWER' id='capitalInput' onChange={checkAnswer}/>
      </div>
      <div className={styles.bingoNotice}>
        {answerMatch? `Got it!`:''}
      </div>
    </div>
  )
}

export default CapitalMainWidget