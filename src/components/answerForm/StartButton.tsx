import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";

import type { TQuestState } from 'src/reducer/QuestStateReducer';

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
  props.pending ? buttonCss = `${buttonCss} ${styles.buttonDisabled}` : buttonCss;
  return (
    <div className={`${styles.buttonContainerLyt}`}>
      {/* TODO: let spinning apears only when data is loading */}
      <FontAwesomeIcon className={`${styles.spinnerAdjust}`}
        icon={faCircleNotch} spin={true} />
      <button data-testid='start-btn-and-timer'
        className={buttonCss}
        onClick={props.startNewGame}>
        {props.questState.gameOngoing ? props.timer : 'Start Game'}
      </button>
    </div>

  )
}

export default StartButton