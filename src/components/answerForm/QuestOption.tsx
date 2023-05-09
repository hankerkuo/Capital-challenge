import { Dispatch, SetStateAction } from 'react';
import { z } from 'zod';

import styles from 'src/styles/components/answerForm/QuestOption.module.css'

const MIN_QUEST_AMOUNT = 1;
const MAX_QUEST_AMOUNT = 100;

const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, 
    setTargetQuestAmount: Dispatch<SetStateAction<number>>) => {
  const targetQuestAmount = z.number().min(MIN_QUEST_AMOUNT).max(MAX_QUEST_AMOUNT);
  if (targetQuestAmount.safeParse(Number(e.target.value)).success) {
    setTargetQuestAmount(Number(e.target.value));
  } else{
    e.target.value = '';
    setTargetQuestAmount(1);
  }
}

const QuestOption = (props: {
  setTargetQuestAmount: Dispatch<SetStateAction<number>>
}) => {
  return (
    <div className={styles.questOptionLyt}>
      <input type="text"
        placeholder={`min: ${MIN_QUEST_AMOUNT} max: ${MAX_QUEST_AMOUNT}`}
        onChange={(e) => inputHandler(e, props.setTargetQuestAmount)}
        data-testid={`quest-option-target-quest-amount`}
        className={`${styles.questOptionInputLyt} ${styles.questOptionInput}`} />
    </div>
  )
}

export default QuestOption;
