import styles from 'src/styles/AnswerRecord.module.module.css'

const AnswerRecord = ({answerRecord}: {answerRecord: Array<{country: string; capital: string}>}) => {
  return(
    <div className={styles.answerRecordTable}>
      <div className={styles.title}>
        <div>Country</div>
        <div>Capital</div>
        <div>Time spent</div>
      </div>
      {answerRecord.map(singleAnswer => 
        <div key={singleAnswer.country} className={styles.singleRow}>
          <div>{singleAnswer.country}</div>
          <div>{singleAnswer.capital}</div>
          <div>1000</div>
        </div>
      )}
    </div>
  )
}

export default AnswerRecord