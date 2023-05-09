import type { TAnswerRecord } from 'src/types/TQuest';

import styles from 'src/styles/components/AnswerRecord.module.css'

const ShowEachCapitalName = ({ capitalNames, onlyFirst=false }: 
  { capitalNames: string[], onlyFirst?: boolean }) => {
  if (onlyFirst) {
    capitalNames = [capitalNames[0]];
  }
  return (
    <>
      {capitalNames.map((capitalName, idx) => {
        if (idx > 0) {
          return (<div key={capitalName}>, {capitalName} </div>)
        } else {
          return (<div key={capitalName}>{capitalName}</div>)
        }
      })}
    </>
  )
}

const AnswerRecord = ({ answerRecord }: { answerRecord: TAnswerRecord }) => {
  return (
    <div className={styles.answerRecordTable}>
      <div className={styles.title}>
        <div className={`${styles.col1} ${styles.col1Layout}`}>
          Country
        </div>
        <div className={`${styles.col2} ${styles.col2Layout}`}>
          Capital
        </div>
        <div className={`${styles.col3} ${styles.col3Layout}`}>
          Speed
        </div>
      </div>
      {answerRecord.map(singleAnswer =>
        <div key={singleAnswer.country} className={styles.singleRow}>
          <div className={`${styles.col1} ${styles.col1Layout}`}
            data-testid={`${singleAnswer.country}-col1-record`}>
            {singleAnswer.country}
          </div>
          <div className={`${styles.col2} ${styles.col2Layout}`}
            data-testid={`${singleAnswer.country}-col2-record`}>
            <ShowEachCapitalName capitalNames={singleAnswer.capital} onlyFirst={true}/>
          </div>
          <div className={`${styles.col3} ${styles.col3Layout}`}
            data-testid={`${singleAnswer.country}-col3-record`}>
            {singleAnswer.timeSpent}
          </div>
        </div>
      )}
    </div>
  )
}

export default AnswerRecord