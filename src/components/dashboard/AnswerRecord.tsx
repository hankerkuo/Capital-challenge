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
    <table className={styles.answerRecordTable}>
      <thead className={styles.bottomBorder}>
        <tr>
          <th className={`${styles.col1} ${styles.col1Layout}`}>Country</th>
          <th className={`${styles.col2} ${styles.col2Layout}`}>Capital</th>
          <th className={`${styles.col3} ${styles.col3Layout}`}>Speed</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {answerRecord.map(singleAnswer =>
          <tr key={singleAnswer.country} >
            <td className={`${styles.col1} ${styles.col1Layout}`}
              data-testid={`${singleAnswer.country}-col1-record`}>
              {singleAnswer.country}
            </td>
            <td className={`${styles.col2} ${styles.col2Layout}`}
              data-testid={`${singleAnswer.country}-col2-record`}>
              <ShowEachCapitalName capitalNames={singleAnswer.capital} onlyFirst={true}/>
            </td>
            <td className={`${styles.col3} ${styles.col3Layout}`}
              data-testid={`${singleAnswer.country}-col3-record`}>
              {singleAnswer.timeSpent}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default AnswerRecord