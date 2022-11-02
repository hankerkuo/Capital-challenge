import { useState } from 'react';

import GameConfig from 'src/const/GameConfig';
import type { TQuestObj } from 'src/types/TQuest';

import styles from 'src/styles/components/answerForm/QuestAndHint.module.css'

const HintChar = ({ capital, idx }: { capital: string, idx: number }) => {
  if (capital[idx] === ' ') {
    return (
      <>&nbsp;</>
    )
  } else {
    return (
      <p className={`${styles.hintChar} ${styles.hintCharLyt}`}>
        {capital[idx]}
      </p>
    )
  }
}

// TODO: add more flexbility to the function for different interval
// possible for user to choose lower interval and maybe typing challenge mode?
const QuestAndHint = ({ quest, timer }: { quest: TQuestObj, timer: number }) => {
  // hint provide to gamer
  const [hintIdx, setHintIdx] = useState<number>(0);

  if (hintIdx !== 0 && timer < GameConfig.SECOND_PASSED_TO_GIVE_HINT) {
    setHintIdx(0);
  }
  if (timer > GameConfig.SECOND_PASSED_TO_GIVE_HINT + hintIdx * GameConfig.INTERVAL_TO_GIVE_HINT) {
    console.log('Give next hint');
    setHintIdx(prev => prev + 1);
  }
  return (
    <div key={quest.country} className={`${styles.countryTitle} ${styles.countryTitleLyt}`}>
      <p className={`${styles.hintChar} ${styles.hintCharLyt} ${styles.titlePLyt}`}>
        {`${quest.country}:`}
      </p> 
      {[...Array(hintIdx)].map((x, i) =>
        <HintChar capital={quest.capital} idx={i} key={`${quest.capital}${i}`}/>
      )}
    </div>
  )
}

export default QuestAndHint