import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import type { TQuestState } from 'src/reducer/QuestState.reducer';

import styles from 'src/styles/components/answerForm/StartButton.module.css'

const StartButton = (
  props:
    {
      questState: TQuestState,
      startNewGame: (e: React.MouseEvent<HTMLButtonElement>) => void
      timer: number
      pending: boolean
    }) => {
  let buttonCss = `${styles.newGameButtonLyt} ${styles.newGameButton}`;
  let spinnerCss = `${styles.spinnerAdjust}`;
  props.pending ? buttonCss = `${buttonCss} ${styles.buttonDisabled}` : buttonCss;
  props.pending ? spinnerCss = `${spinnerCss} ${styles.spinnerShow}` : spinnerCss;
  return (
    <div className={`${styles.buttonContainerLyt}`}>
      <FontAwesomeIcon className={spinnerCss}
        icon={faCircleNotch} spin={true} />
      <button data-testid='start-btn-and-timer'
        disabled={props.pending}
        className={buttonCss}
        onClick={props.startNewGame}>
        {props.questState.gameOngoing ? props.timer : 'Start Game'}
      </button>
    </div>

  )
}

export default StartButton