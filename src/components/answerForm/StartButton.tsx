import type { TQuestState } from 'src/reducer/QuestStateReducer';

import styles from 'src/styles/components/answerForm/StartButton.module.css'

const StartButton = (
  props:
    {
      questState: TQuestState,
      startNewGame: (e: React.MouseEvent<HTMLButtonElement>) => void
      timer: number
    }) => {
  return (
    <button data-testid='start-btn-and-timer'
      className={`${styles.newGameButtonLyt} ${styles.newGameButton}`}
      onClick={props.startNewGame}>
      {props.questState.gameOngoing ? props.timer : 'Start Game'}
    </button>
  )
}

export default StartButton