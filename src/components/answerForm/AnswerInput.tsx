import type { ChangeEvent, RefObject } from 'react';

import styles from 'src/styles/components/answerForm/AnswerInput.module.css'

const AnswerInput = (
  props:
    {
      inputEle: RefObject<HTMLInputElement>,
      checkAnswer: (e: ChangeEvent<HTMLInputElement>) => void
    }) => {
  return (
    <div className={`${styles.inputLyt}`}>
      <input className={`${styles.capitalInput} ${styles.capitalInputLyt}`}
        ref={props.inputEle} autoComplete='off'
        placeholder='WAIT FOR GAME START' id='capitalInput'
        disabled
        onChange={props.checkAnswer}
        data-testid='answer-input' />
    </div>
  )
}

export default AnswerInput