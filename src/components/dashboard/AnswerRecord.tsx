import type { TAnswerRecord } from 'src/types/TQuest';

import styles from 'src/styles/components/AnswerRecord.module.css'

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
          Time spent
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
            {singleAnswer.capital}
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