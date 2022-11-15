import { useState, useMemo } from 'react';

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
const QuestAndHint = ({ quest, timer, showBlur }:
  { quest: TQuestObj, timer: number, showBlur: boolean }) => {
  // hint provide to gamer
  const [hintIdx, setHintIdx] = useState<number>(0);

  if (hintIdx !== 0 && timer < GameConfig.SECOND_PASSED_TO_GIVE_HINT) {
    setHintIdx(0);
  }
  if (timer > GameConfig.SECOND_PASSED_TO_GIVE_HINT + hintIdx * GameConfig.INTERVAL_TO_GIVE_HINT) {
    console.log('Give next hint');
    setHintIdx(prev => prev + 1);
  }

  const calculateAggregatedCapital = (capital: string[]) => {
    const aggregatedCapital = capital.reduce((prev, cur, curIdx) => {
      let result: string = prev;
      if (curIdx !== 0) {
        result += ' or ';
      }
      result += cur;
      return result;
    }, '');
    return aggregatedCapital;
  }

  const aggregatedCapital = useMemo<string>(
    () => calculateAggregatedCapital(quest.capital), [quest.capital]);

  return (
    <div key={quest.country} className={`${styles.countryTitle} ${styles.countryTitleLyt}`}>
      {showBlur ?
        <p className={`${styles.hintCharBlur} ${styles.hintCharLyt} ${styles.titlePLyt}`}>
          Quest placeholder
        </p> :
        <>
          <p className={`${styles.hintChar} ${styles.hintCharLyt} ${styles.titlePLyt}`}>
            {`${quest.country}:`}
          </p>
          {[...Array(hintIdx)].map((x, i) =>
            // key here: e.g., ['kyiv', 'kiev'] will become 'kyiv,kiev'
            <HintChar capital={aggregatedCapital} idx={i} key={`${quest.capital}${i}`} />
          )}
        </>
      }
    </div>
  )
}

export default QuestAndHint