import type { TAnswerRecord } from 'src/types/TQuest';

import styles from 'src/styles/AnswerRecord.module.css'

const AnswerRecord = ({answerRecord}: {answerRecord: TAnswerRecord}) => {
  return(
    <div className={styles.answerRecordTable}>
      <div className={styles.title}>
        <div className={styles.col1Layout}>Country</div>
        <div className={styles.col2Layout}>Capital</div>
        <div className={styles.col3Layout}>Time spent</div>
      </div>
      {answerRecord.map(singleAnswer => 
        <div key={singleAnswer.country} className={styles.singleRow}>
          <div className={styles.col1Layout}>{singleAnswer.country}</div>
          <div className={styles.col2Layout}>{singleAnswer.capital}</div>
          <div className={styles.col3Layout}>{singleAnswer.timeSpent}</div>
        </div>
      )}
    </div>
  )
}

export default AnswerRecord